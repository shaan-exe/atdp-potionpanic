<script>
import MixerSlot from './sub-components/MixerSlot.vue'
import store from '../shared-data/store.js'
import { reactive } from 'vue'
let storeData = reactive(store)
export default {
  components: {
    MixerSlot,
  },
  props: {
    inventory: Array,
    request: store.gameData.currentRequest, // Use the current request from the store
  },
  data() {
    return {
      selectedSlots: [null, null, null], // track 3 selected ingredients
      gameData: storeData.gameData,
    }
  },
  methods: {

    updateSlot(index, ingredient) {
      this.selectedSlots[index] = ingredient
    },
    submitMix() {
      if (!this.request || !Array.isArray(this.request.ingredients)) {
        console.log('No valid recipe request available.')
        return
      }
      if (this.selectedSlots.some((ing) => !ing || !ing.name)) {
        console.log('Please select an ingredient for every slot!')
        return
      }
      const selectedNames = this.selectedSlots.filter(ing => ing && ing.name).map(ing => ing.name)
      const requestNames = Array.isArray(this.request.ingredients)
        ? this.request.ingredients
        : []
      if (selectedNames.length !== requestNames.length) {
        console.log('Please select the correct number of ingredients for this potion!')
        return
      }
      const isMatch =
        selectedNames.length === requestNames.length &&
        selectedNames.every((name) => requestNames.includes(name)) &&
        requestNames.every((name) => selectedNames.includes(name))
      if (isMatch) {
       
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
          return
        }

       
        for (const name in used) {
          const invItem = this.gameData.inventory.find(item => item.name === name)
          if (invItem) invItem.quantity -= used[name]
        }

        this.gameData.totalPotionsMade += 1
        this.gameData.dayProgress += 1
        this.gameData.triesLeft = 3
        this.selectedSlots = [null, null, null]

       
        let existingPotion = this.gameData.inventory.find(item => item.name === this.request.name)
        if (existingPotion) {
          existingPotion.quantity += 1
        } else {
          this.gameData.inventory.push({
            name: this.request.name,
            type: 'potion',
            description: this.request.description,
            rarity: this.request.rarity,
            quantity: 1
          })
        }

        this.gameData.currentRequest = {}
        this.$emit('newRequest')
      } else {
        console.log('Potion mix is incorrect, try again.')
        this.gameData.triesLeft -= 1
      }
    },
  },

  computed: {
    usedIngredientNames() {
      return this.selectedSlots.filter((item) => item !== null).map((item) => item.name)
    },
  },
  mounted() {},
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
    </div>
    <button @click="submitMix">Submit Potion Mix</button>
  </section>
</template>

<style scoped></style>
