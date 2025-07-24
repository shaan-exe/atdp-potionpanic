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
        let feedbackObject = {
          message: 'You must select at least one ingredient!',
          correct_ingredients: [],
          incorrect_ingredients: [],
          is_correct: false,
        }
        this.$emit('feedback', feedbackObject)
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
        let feedbackObject = {
          message: `You have all the right ingredients, but the order is wrong! You tried: ${selectedNames.join(', ')}`,
          correct_ingredients: selectedNames,
          incorrect_ingredients: selectedNames.filter(name => !orderMatch.ingredients.includes(name)),
          is_correct: false,

        }
        this.$emit('feedback', feedbackObject)
        this.gameData.triesLeft -= 1
        this.clearMixer()
        return
      }


      if (!match) {
        let feedbackMsg = ''
        if (possiblePotions.length > 0) {
          var recipe = (this.request && this.request.ingredients) ? this.request.ingredients : possiblePotions[0].ingredients
          var correct = selectedNames.filter(name => recipe.includes(name))
          var incorrect = selectedNames.filter(name => !recipe.includes(name))
          feedbackMsg = `Incorrect mix. ${correct.length > 0 ? 'Correct ingredient(s): ' + correct.join(', ') + '. ' : ''}${incorrect.length > 0 ? 'Not needed: ' + incorrect.join(', ') + '.' : ''} You tried: ${selectedNames.join(', ')}`
        } else {
          feedbackMsg = `No potion uses this number of ingredients. You tried: ${selectedNames.join(', ')}`
        }
        let feedbackObject = {
          message: feedbackMsg,
          correct_ingredients: correct || [],
          incorrect_ingredients: selectedNames.filter(name => !correct || !correct.includes(name)),
          is_correct: false,
        }
        this.$emit('feedback', feedbackObject)
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

      let feedbackObject = {
        message: `Successfully crafted ${match.name}! You used: ${selectedNames.join(', ')}`,
        correct_ingredients: match.ingredients,
        incorrect_ingredients: [],
        is_correct: true,
      }
      this.$emit('feedback', feedbackObject)
      this.clearMixer()

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
  mounted() {
    this.selectedSlots = [null, null, null]

    }
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
