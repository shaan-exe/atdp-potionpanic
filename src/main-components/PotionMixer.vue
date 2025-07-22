<script>
import MixerSlot from './sub-components/MixerSlot.vue'
import store from '../shared-data/store.js'
import PotionRequests from '../json/potionrequests.json'
import { reactive } from 'vue'
let storeData = reactive(store)

export default {
  components: { MixerSlot },
  props: {
    inventory: Array,
    request: Object, 
  },
  data() {
    return {
      selectedSlots: [null, null, null],
      gameData: storeData.gameData,
      allPotions: PotionRequests.flatMap(day => day.requests),
    }
  },
  methods: {
    updateSlot(index, ingredient) {
      this.selectedSlots[index] = ingredient
    },
    clearMixer() {
      this.selectedSlots = [null, null, null]
    },
    submitMix() {
      const selectedNames = this.selectedSlots.filter(ing => ing && ing.name).map(ing => ing.name)
      if (selectedNames.length === 0) {
        console.log('Select at least one ingredient!')
        return
      }
      const match = this.allPotions.find(potion => {
        const req = potion.ingredients
        return (
          selectedNames.length === req.length &&
          selectedNames.every(name => req.includes(name)) &&
          req.every(name => selectedNames.includes(name))
        )
      })
      if (!match) {
        console.log('No matching potion recipe found!')
        this.gameData.triesLeft -= 1
        this.clearMixer() 
        return
      } 
      
      let canMake = true
      let used = {}
      selectedNames.forEach(name => {
        used[name] = (used[name] || 0) + 1
      })
      for (const name in used) {
        const invItem = this.gameData.inventory.find(item => item.name === name)
        if (!invItem || invItem.quantity < used[name]) {
          canMake = false
        }
      }
      if (!canMake) {
        console.log('Not enough quantity for one or more ingredients!')
        this.clearMixer() 
        return
      }
      for (const name in used) {
        const invItem = this.gameData.inventory.find(item => item.name === name)
        if (invItem) invItem.quantity -= used[name]
      }
      let existingPotion = this.gameData.inventory.find(item => item.name === match.name)
      if (existingPotion) {
        existingPotion.quantity += 1
      } else {
        this.gameData.inventory.push({
          name: match.name,
          type: 'potion',
          description: match.description,
          rarity: match.rarity,
          quantity: 1
        })
      }
      this.gameData.totalPotionsMade += 1
      this.clearMixer()
      console.log('Potion crafted:', match.name)

      if (
        this.request &&
        this.request.name &&
        match.name === this.request.name
      ) {
        this.gameData.dayProgress += 1
        this.$emit('newRequest')
      }
    },
  },
  computed: {
    usedIngredientNames() {
      return this.selectedSlots.filter((item) => item !== null).map((item) => item.name)
    },
  },
}
</script>

<template>
  <section>
    <h2>Potion Mixer</h2>
    <div>
      <MixerSlot
        v-for="(slot, index) in 3"
        :key="index"
        :inventory="inventory"
        :selected="selectedSlots[index]"
        :usedIngredients="usedIngredientNames"
        @update:ingredient="(ingredient) => updateSlot(index, ingredient)"
      />
      <button @click="submitMix">Submit Potion Mix</button>
      <button @click="clearMixer" type="button">Clear Mixer</button>
    </div>
  </section>
</template>

<style scoped></style>
