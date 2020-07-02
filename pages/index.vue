<template>
  <div class="container">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const message = ref('Yup')

    return {
      message,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper {
  border: 1px solid yellow;
  width: 400px;
  height: 200px;
}
</style>
