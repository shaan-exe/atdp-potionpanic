<script>
import IngredientItem from './sub-components/IngredientItem.vue'

export default {
  props: {
    inventoryData: [],
  },
  components: {
    IngredientItem,
  },
  data() {
    return {}
  },
  methods: {
    //addToInventory()  Adds crafted potions back to usable inventory for future rounds
  },
  computed: {
    //compute out basic inventory stats, like total number of ingredients, number of potions, etc.
  },
  mounted() {},
}
</script>

<template>
  <section>
    <div>
      <h2>Ingredient Inventory</h2>
      <ul>
        <IngredientItem v-for="item in inventoryData" :key="item.id" :item="item"></IngredientItem>
      </ul>
    </div>
  </section>
</template>

<style scoped></style>
