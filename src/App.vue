<script>
import GameTracker from './main-components/GameTracker.vue'
import FeedbackPanel from './main-components/FeedbackPanel.vue'
import IngredientInventory from './main-components/IngredientInventory.vue'
import RequestDisplay from './main-components/RequestDisplay.vue'
import PotionMixer from './main-components/PotionMixer.vue'
import store from './shared-data/store.js'

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
      gameData: store.gameData,
      requestKey: 0,
      feedbackPanelKey: 0,
      gameTrackerKey: 0,
    }
  },
  methods: {
    //  checkWinOrLose() Evaluates win/lose state after every submission
    checkWinOrLose() {
      if (this.triesLeft <= 0) {
        this.gameState = 'lost'
      } else if (this.totalPotionsMade >= 10) {
        this.gameState = 'won'
      } else {
        this.gameState = 'ongoing'
      }
    },
    handleDayChange() {
      this.gameData.dayProgress += 1
      this.gameData.triesLeft = 3
      this.gameData.feedback = 'Ah, a new day! Time to brew some potions!'
      this.gameData.currentRequest = {} // reset current request
      this.requestKey += 1
    },
    gameInit() {
      this.gameData.dayProgress = 0
      this.gameData.triesLeft = 3
      this.gameData.totalPotionsMade = 0
      store.gameData.currentFeedback = store.gameData.feedbackArray[store.gameData.feedbackIndex]
    },
    nextFeedback() {
      store.gameData.feedbackIndex += 1
      store.gameData.currentFeedback = store.gameData.feedbackArray[store.gameData.feedbackIndex]
      this.feedbackPanelKey += 1
    },
    lastFeedback() {
      if (store.gameData.feedbackIndex > 0) {
        store.gameData.feedbackIndex -= 1
        store.gameData.currentFeedback = store.gameData.feedbackArray[store.gameData.feedbackIndex]
        this.feedbackPanelKey += 1
      }
    },
    refreshGameTracker() {
      console.log('Refreshing game tracker...')
      this.gameTrackerKey += 1
    },
  },
  computed: {
    //these will be "checks" of the current game state, like whether the player has won or lost, or if the game is still ongoing.
  },
  mounted() {
    this.gameInit()
  },
}
</script>

<template>
  <main>
    <!-- // each of the main components will be rendered here- and in each of those the subcomponents
    will be rendered as well. // following the wireframe, the components will be rendered in the
    following order: // 1. GameTracker // 2. FeedbackPanel // 3. IngredientInventory // 4.
    RequestDisplay // 5. PotionMixer -->
    <GameTracker :key="gameTrackerKey" :gameData="gameData"></GameTracker>
    <FeedbackPanel
      :key="feedbackPanelKey"
      @next-feedback="nextFeedback"
      @last-feedback="lastFeedback"
      :feedback="gameData.currentFeedback"
    ></FeedbackPanel>
    <IngredientInventory :inventoryData="gameData.inventory"></IngredientInventory>
    <RequestDisplay :key="requestKey"></RequestDisplay>
    <PotionMixer
      @updateGameTracker="refreshGameTracker"
      :request="gameData.currentRequest"
      :inventory="gameData.inventory"
    ></PotionMixer>
  </main>
</template>

<style scoped></style>
