<script>
import store from '../shared-data/store.js'
import { reactive } from 'vue'
let storeData = reactive(store)
export default {
  props: {
    feedback: {
      type: Object,
      default: () => ({
        message: '',
        correct_ingredients: [],
        incorrect_ingredients: [],
        is_correct: false,
      }),
    }
  },
  data() {
    return {
      gameData: storeData.gameData,
      open: true
    }
  },
  methods: {
    nextFeedback() {
      this.gameData.feedbackIndex += 1
      this.gameData.currentFeedback = store.gameData.feedbackArray[store.gameData.feedbackIndex]
    },
    lastFeedback() {
      if (this.gameData.feedbackIndex > 0) {
        this.gameData.feedbackIndex -= 1
        this.gameData.currentFeedback = store.gameData.feedbackArray[store.gameData.feedbackIndex]
      }
    },
    togglePanel() {
      this.open = !this.open

    }
  },
  computed: {
    isFeedback() {
      return this.gameData.feedbackIndex >= store.gameData.feedbackArray.length - 1
    }
  },
}
</script>

<template>
  <!--landmark block aside-->
  <aside :class="['feedback-aside', { open }]">
    <button
      class="toggle-btn"
      :class="{ 'btn-open': open }"
      @click="togglePanel"
    >
      {{ open ? 'Close' : 'Feedback' }}
    </button>
    <div v-if="open" class="feedback-content">
      <button @click="lastFeedback">Back...</button>
      <strong>

        <h4 v-if="feedback">{{ feedback.message}}</h4>
        <h4 v-else>Keep at it wizard! You've nearly earned your freedom...</h4>
        <div v-if="feedback.correct_ingredients.length > 0" id="correct_ingredients">
          <h3>Correct Ingredients: </h3>
          <ul>
            <li v-for="correct_ingredient in feedback.correct_ingredients"  :key="correct_ingredient" >
              {{ correct_ingredient }}

            </li>
          </ul>

        </div>
        <div v-if="feedback.incorrect_ingredients.length > 0" id="incorrect_ingredients">
          <h3>Incorrect Ingredients: </h3>
          <ul>
            <li v-for="incorrect_ingredient in feedback.incorrect_ingredients"  :key="incorrect_ingredient" >
              {{ incorrect_ingredient }}

            </li>
          </ul>

        </div>
        <!-- if no feedback is next- disable the button-->

      </strong>
      <button :disabled="isFeedback" @click="nextFeedback">Next...</button>
    </div>
  </aside>
</template>

<style scoped>
.feedback-aside {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 340px;
  max-width: 90vw;
  background: rgba(24, 24, 32, 0.98);
  box-shadow: -2px 0 24px 4px #18181b;
  border-left: 2px solid #444;
  transition: transform 0.3s cubic-bezier(.77,0,.175,1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transform: translateX(0);
}
.feedback-aside:not(.open) {
  transform: translateX(100%);
}
.toggle-btn {
  position: absolute;
  top: 20px;
  left: -30.5%;
  background: #23232b;
  color: #c7b77f;
  border: 3px solid white;
  border-radius: 8px 0 0 8px;
  padding: 10px 18px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px #23232b;
  transition: background 0.2s, color 0.2s;
}
.toggle-btn.btn-open {
    left: -21.5%;
}
.toggle-btn:hover {
  background: #c7b77f;
  color: #23232b;
}
.feedback-content {
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  height: 100%;
  overflow-y: auto;
}
h4 {
  color: #ffffff;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.1rem;
  text-align: center;
  margin: 0 0 12px 0;
}
button {
  margin: 4px 0;
}
@media (max-width: 600px) {
  .feedback-aside {
    width: 98vw;
    max-width: 98vw;
  }
  .toggle-btn {
    left: -50px;
    top: 10px;
    padding: 8px 12px;
    font-size: 0.9rem;
  }
}
button:disabled {
  background: #444;
  color: #888;
  cursor: not-allowed;
}

</style>
