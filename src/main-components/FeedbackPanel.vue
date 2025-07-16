<script>
export default {
  props: {
    feedback: String,
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
  <!-- this component will serve to compute the nessecary feedback from the submission, getting the details of the users submission passed as props. -->
  <section>
    <!--add improved structure for this component -->
    <p v-if="feedback">{{ feedback }}</p>
    <p v-else>Keep at it wizard! You've nearly earned your freedom...</p>
  </section>
</template>

<style scoped></style>
