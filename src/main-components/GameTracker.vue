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
      <p>Day: {{ gameData.dayProgress }}</p>
      <p>Tries Left: {{ gameData.triesLeft }}</p>
    </div>
    <div>
      <p>Potions Made: {{ gameData.totalPotionsMade }}</p>
    </div>
  </section>
</template>

<style scoped></style>
