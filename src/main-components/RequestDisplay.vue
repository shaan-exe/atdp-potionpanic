<script>
import store from '../shared-data/store.js'
import { reactive } from 'vue'
export default {
  components: {},
  data() {
    return {
      gameData: reactive(store.gameData),
      
    }
  },
  methods: {
    
  },
  computed: {
    //will most likely be used to check the current request against the player's inventory to see if they can fulfill it.
  },
}
</script>

<template>
  <section>
    <h2>Current Potion Request: </h2>
    <div v-if="gameData">
      <h3>{{ gameData.currentRequest.name }}</h3>

      <p>{{ gameData.currentRequest.description }}</p>
    </div>
    <p v-else>No current request.{{ console.log(gameData) }}</p>
  </section>
</template>

<style scoped></style>
