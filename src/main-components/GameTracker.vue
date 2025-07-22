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

  },
  computed: {},
  mounted() {},
}
</script>

<template>
  <section>
    <div>
      <!-- TODO: add stats heading to signify section, maybe remove div to be more clear???-->
      <p><ins>Day:</ins> {{ gameData.dayProgress }}</p>
      <p><ins>Tries Left:</ins> {{ gameData.triesLeft }}</p>
    </div>
    <div>
      <p><ins>Potions Made:</ins> {{ gameData.totalPotionsMade }}</p>
    </div>
  </section>
</template>

<style scoped></style>
