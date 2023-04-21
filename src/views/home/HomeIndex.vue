<template>
  <div class="home">
    <h1>Home</h1>
    <div>
      <img src="/favicon.svg" alt="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

// eslint-disable-next-line @typescript-eslint/no-empty-function
onMounted(() => {});
</script>

<style lang="scss" scoped>
.home {
  width: 100dvw;
  height: 100dvh;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  img {
    width: 300px;
  }
  div {
    display: flex;
    justify-content: center;
  }
}
</style>
