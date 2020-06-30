<template>
  <div class="container">
    <h1>{{ loadedData.code }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    loadedData() {
      return this.$store.getters.loadedData
    },
  },
}
</script>

<style lang="scss">
.container {
  background-color: $havelock-blue;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
