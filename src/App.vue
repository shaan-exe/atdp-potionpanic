<script>
export default {
  components: {
    // each of the components will be initilized here.
  },
  data() {
    return {
      // the major game state variables will be stored here, like the current potion request, the player's inventory, and the current mixer state.
    }
  },
  methods: {
    //  checkWinOrLose() Evaluates win/lose state after every submission
  },
  computed: {
    //these will be "checks" of the current game state, like whether the player has won or lost, or if the game is still ongoing.
  },
  mounted() {
    // this is where the game will be initialized, like setting up the first potion request, initializing the inventory, etc.
  },
}
</script>

<template>
  <main>
    <!-- // each of the main components will be rendered here- and in each of those the subcomponents
    will be rendered as well. // following the wireframe, the components will be rendered in the
    following order: // 1. GameTracker // 2. FeedbackPanel // 3. IngredientInventory // 4.
    RequestDisplay // 5. PotionMixer -->
  </main>
</template>

<style scoped></style>
