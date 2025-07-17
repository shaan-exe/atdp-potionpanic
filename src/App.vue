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
    handleRequestChange(newRequest) {
      this.gameData.currentRequest = newRequest
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
      this.gameData.feedback =
        "Welcome to Potion Panic! Let's start by brewing our first potion- the potion of learning."
      //wait a second then go to next line of dialogue
      setTimeout(() => {
        this.gameData.feedback = 'You can see your current potion request down below.'
      }, 1000)
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
    <GameTracker :gameData="gameData"></GameTracker>
    <FeedbackPanel :feedback="gameData.feedback"></FeedbackPanel>
    <IngredientInventory :inventoryData="gameData.inventory"></IngredientInventory>
    <RequestDisplay :key="requestKey" @update-request="handleRequestChange"></RequestDisplay>
    <PotionMixer :request="gameData.currentRequest" :inventory="gameData.inventory"></PotionMixer>
  </main>
</template>

<style scoped></style>
