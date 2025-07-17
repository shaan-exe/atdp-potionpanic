<script>
import Ingredients from '../json/ingredients.json'
import PotionRequests from '../json/potionrequests.json'

export default {
  components: {},
  data() {
    return {
      PotionRequests: PotionRequests,
      Ingredients: Ingredients,
      currentRequest: null,
    }
  },
  methods: {
    generateRequest() {
      let randomIndex = Math.floor(Math.random() * this.PotionRequests.length)
      let request = this.PotionRequests[randomIndex]

      // Make an array of the ingredients in the request
      let ingredients = request.ingredients

      this.currentRequest = {
        name: request.name,
        description: request.description,
        ingredients: this.Ingredients.filter((ingredient) => ingredients.includes(ingredient.name)),
      }
      this.$emit('update-request', this.currentRequest)
    },
  },
  computed: {
    //will most likely be used to check the current request against the player's inventory to see if they can fulfill it.
  },
  mounted() {
    this.generateRequest()
  },
}
</script>

<template>
  <section>
    <h2>Current Potion Request</h2>
    <div v-if="currentRequest">
      <h3>{{ currentRequest.name }}</h3>
      <p>{{ currentRequest.description }}</p>
    </div>
    <p v-else>No current request.</p>
  </section>
</template>

<style scoped></style>
