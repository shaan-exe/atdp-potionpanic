<script>
import store from '../shared-data/store.js'
import { reactive } from 'vue'
let storeData = reactive(store)
export default {
  props: {
    feedback: String,
  },
  components: {},
  data() {
    return {
      gameData: storeData.gameData,
    }
  },
  methods: {
    nextFeedback() {
      this.gameData.feedbackIndex += 1
      this.gameData.currentFeedback = store.gameData.feedbackArray[store.gameData.feedbackIndex]
      
    },
    lastFeedback() {
      if (this.gameData.feedbackIndex > 0) {
        this.gameData.feedbackIndex -= 1
        this.gameData.currentFeedback = store.gameData.feedbackArray[store.gameData.feedbackIndex]
        
      }
    },
  },
  computed: {},
  mounted() {},
}
</script>

<template>
  <!-- this component will serve to compute the nessecary feedback from the submission, getting the details of the users submission passed as props. -->
  <section>
    <button @click="lastFeedback">Back...</button>
    <!--add improved structure for this component -->
    <p v-if="feedback">{{ feedback }}</p>
    <p v-else>Keep at it wizard! You've nearly earned your freedom...</p>

    <button @click="nextFeedback">Next...</button>
  </section>
</template>

<style scoped></style>
