<script>
import GameTracker from './main-components/GameTracker.vue'
import FeedbackPanel from './main-components/FeedbackPanel.vue'
import IngredientInventory from './main-components/IngredientInventory.vue'
import RequestDisplay from './main-components/RequestDisplay.vue'
import PotionMixer from './main-components/PotionMixer.vue'
export default {
  components: {
    GameTracker,
    FeedbackPanel,
    IngredientInventory,
    RequestDisplay,
    PotionMixer,

    // each of the components will be initilized here.
  },

  data() {
    return {
      // the major game state variables will be stored here, like the current potion request, the player's inventory, and the current mixer state.
      gameData: {
        currentRequest: null,
        inventory: [],
        mixerState: [],
        feedback: '',
        dayProgress: 0,
        triesLeft: 3,
        totalPotionsMade: 0,
        gameState: 'ongoing',
      },
    }
  },
  methods: {
    //  checkWinOrLose() Evaluates win/lose state after every submission
    checkWinOrLose() {
      if (this.triesLeft <= 0) {
        this.gameState = 'lost'
      } else if (this.totalPotionsMade >= 10) {
        this.gameState = 'won'
      }
    },
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
    <GameTracker :gameData="gameData"></GameTracker>
    <FeedbackPanel :feedback="gameData.feedback"></FeedbackPanel>
    <IngredientInventory :inventoryData="gameData.inventory"></IngredientInventory>
  </main>
</template>

<style scoped></style>
