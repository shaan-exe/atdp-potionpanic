<script>
import store from '../shared-data/store.js'
export default {
  props: {},
  components: {},
  data() {
    return {
      gameData: store.gameData,
    }
  },
  methods: {
    // updateTracker()  Updates the visual tracker (day progress, current tries in the day + tries left, and other misc stats like total potions made, etc.)
  },
  computed: {},
  mounted() {},
}
</script>

<template>
  <section>
    <div>
      <p><ins>Day:</ins> {{ gameData.dayProgress }}</p>
      <p><ins>Tries Left:</ins> {{ gameData.triesLeft }}</p>
    </div>
    <div>
      <p><ins>Potions Made:</ins> {{ gameData.totalPotionsMade }}</p>
    </div>
  </section>
</template>

<style scoped></style>
