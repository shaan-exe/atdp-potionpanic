<script>
import MixerSlot from './sub-components/MixerSlot.vue'

export default {
  components: {
    MixerSlot,
  },
  props: {
    inventory: Array,
    request: {},
  },
  data() {
    return {
      selectedSlots: [null, null, null], // track 3 selected ingredients
    }
  },
  methods: {
    updateSlot(index, ingredient) {
      this.selectedSlots[index] = ingredient
    },
    submitMix() {
      if (this.selectedSlots.some((ing) => !ing || !ing.name)) {
        return
      }
      const selectedNames = this.selectedSlots.map((ing) => ing.name).sort()
      console.log(this.request)
      const requestNames = this.request.ingredients.map((ing) => ing.name).sort()

      const match = JSON.stringify(selectedNames) === JSON.stringify(requestNames)

      if (match) {
        console.log('Potion mix matches the request!')
      } else {
        console.log('Potion mix does not match the request.')
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
