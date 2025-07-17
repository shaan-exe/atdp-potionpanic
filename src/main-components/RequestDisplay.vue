<script>
import Ingredients from '../json/ingredients.json'
import PotionRequests from '../json/potionrequests.json'
import store from '../shared-data/store.js'
export default {
  components: {},
  data() {
    return {
      PotionRequests: PotionRequests,
      Ingredients: Ingredients,
      gameData: store.gameData, // Initialize with current request from store
    }
  },
  methods: {
    generateRequest() {
      let randomIndex = Math.floor(Math.random() * this.PotionRequests.length)
      let request = this.PotionRequests[randomIndex]

      // Make an array of the ingredients in the request
      let ingredients = request.ingredients

      let curRequest = {
        name: request.name,
        description: request.description,
        ingredients: this.Ingredients.filter((ingredient) => ingredients.includes(ingredient.name)),
      }
      store.gameData.currentRequest = curRequest
      console.log(store.gameData.currentRequest)
      console.log(this.currentRequest, 's')
    },
  },
  computed: {
    //will most likely be used to check the current request against the player's inventory to see if they can fulfill it.
  },
  beforeMount() {
    this.generateRequest()
  },
}
</script>

<template>
  <section>
    <h2>Current Potion Request</h2>
    <div v-if="gameData">
      <h3>{{ gameData.currentRequest.name }}</h3>

      <p>{{ gameData.currentRequest.description }}</p>
    </div>
    <p v-else>No current request.{{ console.log(gameData) }}</p>
  </section>
</template>

<style scoped></style>
