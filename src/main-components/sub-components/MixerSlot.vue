<script>
export default {
  name: 'MixerSlot',
  props: {
    inventory: {
      type: Array,
      required: true,
    },
    selected: {
      type: Object,
      default: null,
    },
    usedIngredients: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedIngredient: this.selected || null,
    }
  },
  watch: {
    selected(newVal) {
      this.selectedIngredient = newVal
    },
  },
  methods: {
    handleSelection(event) {
      const selectedName = event.target.value
      this.selectedIngredient = this.inventory.find((ing) => ing.name === selectedName)
      this.$emit('update:ingredient', this.selectedIngredient)
    },
  },
}
</script>

<template>
  <div class="mixer-slot">
    <select @change="handleSelection" :value="selectedIngredient?.name || ''">
      <option disabled value="">Select Ingredient</option>
      <option
        v-for="item in inventory"
        :key="item.name"
        :value="item.name"
        :disabled="(usedIngredients.includes(item.name) && item.name !== selectedIngredient?.name) || item.quantity === 0"
      >
        {{ item.name }} <span v-if="item.quantity !== undefined">({{ item.quantity }})</span>
      </option>
    </select>

    <div v-if="selectedIngredient" class="ingredient-preview">
      <p>
        <strong>{{ selectedIngredient.name }}</strong>
      </p>
      <p>{{ selectedIngredient.description }}</p>
    </div>
  </div>
</template>

<style scoped></style>
