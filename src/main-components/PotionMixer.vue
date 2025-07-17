<script>
import MixerSlot from './sub-components/MixerSlot.vue'
import store from '../shared-data/store.js'
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
      gameData: store.gameData,
    }
  },
  methods: {
    updateGameTrackerEmit() {
      this.$emit('updateGameTracker')
    },
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
      const selectedNames = this.selectedSlots.map((ing) => ing.name)
      const requestNames = this.request.ingredients.map((ing) => ing.name)
      if (selectedNames.length !== requestNames.length) {
        console.log('Potion mix is incorrect, try again.')
        this.selectedSlots = [null, null, null]

        store.gameData.triesLeft -= 1
        this.updateGameTrackerEmit()
        return
      }
      const isMatch = selectedNames.every((name, index) => name === requestNames[index])
      if (isMatch) {
        console.log('Potion mix is correct!')
        store.gameData.totalPotionsMade += 1
        store.gameData.dayProgress += 1
        store.gameData.triesLeft = 3
        this.selectedSlots = [null, null, null]
        this.updateGameTrackerEmit()
      } else {
        console.log('Potion mix is incorrect, try again.')
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
