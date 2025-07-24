<script>
import store from '../shared-data/store.js'
export default {
  props: {
    result: {},
  },
  components: {},
  data() {
    return {
      gameData: store.gameData,
      wonClass: this.result === 'WON' ? true : false,

    }
  },
  methods: {

  },
  computed: {},
  mounted() {

  },
}
</script>

<template>


  <div>
    <h1>POTION PANIC</h1>
    <h2 :class="{'won':wonClass}" >YOU {{ result }}!</h2>

  </div>








</template>

<style scoped>
div {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h1 {
  font-size: 2.5em;
}
h2 {
  font-size: 2em;
  color:red;
}
.won {
  color: #4CAF50;
}
</style>
