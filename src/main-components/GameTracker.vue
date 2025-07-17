<script>
import store from '../shared-data/store.js'
export default {
  props: {
    gameData: {},
  },
  components: {},
  data() {
    return {}
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
      <p>{{ gameData.dayProgress }}</p>
      <p>{{ gameData.triesLeft }}</p>
    </div>
    <div>
      <p>{{ gameData.totalPotionsMade }}</p>
    </div>
  </section>
</template>

<style scoped></style>
