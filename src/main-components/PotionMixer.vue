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
        this.$emit('feedback', 'Select at least one ingredient! You tried: (none)')
        return
      }

      const possiblePotions = this.allPotions.filter(potion => potion.ingredients.length === selectedNames.length)
      let match = possiblePotions.find(potion => {
        const req = potion.ingredients
        return (
          selectedNames.length === req.length &&
          selectedNames.every(name => req.includes(name)) &&
          req.every(name => selectedNames.includes(name))
        )
      })


      const orderMatch = possiblePotions.find(potion => {
        const req = potion.ingredients
        return (
          selectedNames.length === req.length &&
          selectedNames.every(name => req.includes(name)) &&
          req.every(name => selectedNames.includes(name)) &&
          !selectedNames.every((name, idx) => name === req[idx])
        )
      })
      if (orderMatch) {
        this.$emit(
          'feedback',
          `You have all the right ingredients, but the order is wrong! You tried: ${selectedNames.join(', ')}`
        )
        this.gameData.triesLeft -= 1
        this.clearMixer()
        return
      }


      if (!match) {
        let feedbackMsg = ''
        if (possiblePotions.length > 0) {
          const recipe = (this.request && this.request.ingredients) ? this.request.ingredients : possiblePotions[0].ingredients
          const correct = selectedNames.filter(name => recipe.includes(name))
          const incorrect = selectedNames.filter(name => !recipe.includes(name))
          feedbackMsg = `Incorrect mix. ${correct.length > 0 ? 'Correct ingredient(s): ' + correct.join(', ') + '. ' : ''}${incorrect.length > 0 ? 'Not needed: ' + incorrect.join(', ') + '.' : ''} You tried: ${selectedNames.join(', ')}`
        } else {
          feedbackMsg = `No potion uses this number of ingredients. You tried: ${selectedNames.join(', ')}`
        }
        this.$emit('feedback', feedbackMsg)
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
      this.$emit('feedback', `Successfully crafted ${match.name}! You used: ${selectedNames.join(', ')}`)

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
      <!--interactive buttons- able to be used on mobile and PC- and also with enter + keyboard-->
      <button @click="submitMix">Submit Potion Mix</button>
      <button @click="clearMixer" type="button">Clear Mixer</button>
    </div>
  </section>
</template>

<style scoped></style>
