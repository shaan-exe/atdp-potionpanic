<script>
export default {
  props: {
    item: {},
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  mounted() {},
}
</script>

<template>
  <!-- this is a single item in the users inventory, along with its relevant details and images. -->
  <li>
    <span v-if="item">{{ item.name }} ({{ item.quantity }})</span>
  </li>
</template>

<style scoped></style>
