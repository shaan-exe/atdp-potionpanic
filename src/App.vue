<script>
import GameTracker from './main-components/GameTracker.vue'
import FeedbackPanel from './main-components/FeedbackPanel.vue'
import IngredientInventory from './main-components/IngredientInventory.vue'
import RequestDisplay from './main-components/RequestDisplay.vue'
import PotionMixer from './main-components/PotionMixer.vue'
import PotionRequests from './json/potionrequests.json'
import Ingredients from './json/ingredients.json'
import store from './shared-data/store.js'
import UserNameInput from './main-components/UserNameInput.vue'
import { reactive } from 'vue'
let storeData = reactive(store)

export default {
  components: {
    GameTracker,
    FeedbackPanel,
    IngredientInventory,
    RequestDisplay,
    PotionMixer,
    UserNameInput

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
      let gameContainer = document.getElementById('game-container');
      gameContainer.style.visibility = 'visible';
      console.log(store.gameData)
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
      //if the new request needs a potion from a previous day that the user hasnmt made yet- alert them of this in the form of feedback
      if (this.gameData.currentRequest.ingredients.some(ing => !this.gameData.inventory.some(item => item.name === ing))) {

        const missingIngredient = this.gameData.currentRequest.ingredients.filter(ing => !this.gameData.inventory.some(item => item.name === ing))
        let feedbackObject = {


          message: `You need to make the following before you can craft your current potion request: ${missingIngredient} `,
          correct_ingredients: [],
          incorrect_ingredients: [],
          is_correct: false,
        }
        this.handleFeedback(feedbackObject)
      }
      console.log('Current request:', this.gameData.currentRequest)
    },
    handleFeedback(feedbackMsg) {
      this.gameData.feedbackArray.push(feedbackMsg)
      this.gameData.feedbackIndex = this.gameData.feedbackArray.length - 1
      this.gameData.currentFeedback = feedbackMsg

    },
  },
  computed: {
    //these will be "checks" of the current game state, like whether the player has won or lost, or if the game is still ongoing.
  },
  beforeMount() {
    this.generateRequest()
  },
  mounted() {



  },
}
</script>

<template>

<UserNameInput @username-submitted="gameInit"></UserNameInput>
  <main id="game-container">

    <a href="/src/json/potionrequests.json">Answers (Cheats for alpha testing...)</a>
    <div class="top-row"> <!--container for data- each component apart of this div is marked with a heading, see notes in component for more info-->
      <GameTracker :gameData="gameData" />
      <FeedbackPanel :feedback="gameData.currentFeedback" />
    </div>
    <IngredientInventory :inventoryData="gameData.inventory" />
    <RequestDisplay />
    <PotionMixer
      @newRequest="newRequest"
      @feedback="handleFeedback"
      :request="gameData.currentRequest"
      :inventory="gameData.inventory"
    />
  </main>
</template>

<style scoped>

</style>
