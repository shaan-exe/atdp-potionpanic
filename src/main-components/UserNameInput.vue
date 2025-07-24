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
    handleSubmit() {
      if (this.username.trim() !== '') {
        let container = document.getElementById('username-input-container')
        container.style.display = 'none'
        store.gameData.userName = this.username.trim()
        this.$emit('username-submitted')


      } else {
        return
      }
    }
  },
  computed: {},
  mounted() {
  },
}
</script>

<template>

 <div id="username-input-container">
  <header>
    <h1>POTION PANIC</h1>
  </header>
   <input v-model="username" placeholder="Username..." />
  <button @click="handleSubmit">Submit</button>
 </div>



</template>

<style scoped>
  input {
    width: 200px;
    padding: 10px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 15%;
  }
</style>
