<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
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
  <main>
    <span>{{ item.name }} ({{ item.quantity }})</span>
  </main>
</template>

<style scoped></style>
