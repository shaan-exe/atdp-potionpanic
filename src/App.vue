<script>
import GameTracker from './main-components/GameTracker.vue'
import FeedbackPanel from './main-components/FeedbackPanel.vue'
import IngredientInventory from './main-components/IngredientInventory.vue'
import RequestDisplay from './main-components/RequestDisplay.vue'
import PotionMixer from './main-components/PotionMixer.vue'
import PotionRequests from './json/potionrequests.json'
import Ingredients from './json/ingredients.json'
import store from './shared-data/store.js'
import { reactive } from 'vue'
let storeData = reactive(store)

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
      gameData: storeData.gameData,
      PotionRequests: PotionRequests,
      Ingredients: Ingredients,
 
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
      this.gameData.triesLeft = 8 
      this.gameData.feedback = 'Ah, a new day! Time to brew some potions!'
      this.gameData.currentRequest = {} // reset current request
    
    },
    gameInit() {
      this.gameData.dayProgress = 0
      this.gameData.triesLeft = 8 
      this.gameData.totalPotionsMade = 0
      this.gameData.currentFeedback = store.gameData.feedbackArray[store.gameData.feedbackIndex]
    },
    
    
    newRequest() {
      this.generateRequest()
      
    },
    generateRequest() {

      const dayObj = this.PotionRequests.find(
        (d) => d.day === this.gameData.dayProgress + 1
      )
      if (!dayObj || !dayObj.requests.length) {
        this.gameData.currentRequest = {}
        return
      }
    
      const randomIndex = Math.floor(Math.random() * dayObj.requests.length)
      const request = dayObj.requests[randomIndex]
      this.gameData.currentRequest = {
        name: request.name,
        description: request.description,
        ingredients: request.ingredients,
        rarity: request.rarity,
      }
      console.log('Current request:', this.gameData.currentRequest)
    }
  },
  computed: {
    //these will be "checks" of the current game state, like whether the player has won or lost, or if the game is still ongoing.
  },
  beforeMount() {
    this.generateRequest()
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
     
      :feedback="gameData.currentFeedback"
    ></FeedbackPanel>
    <IngredientInventory :inventoryData="gameData.inventory"></IngredientInventory>
    <RequestDisplay :key="requestKey"></RequestDisplay>
    <PotionMixer @newRequest="newRequest"
      
      :request="gameData.currentRequest"
      :inventory="gameData.inventory"
    ></PotionMixer>
  </main>
</template>

<style scoped></style>
