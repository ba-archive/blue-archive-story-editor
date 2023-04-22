<template>
  <el-form inline>
    <el-form-item label="主标题" required>
      <el-input v-model="title" />
    </el-form-item>
    <el-form-item label="次标题(可选)">
      <el-input v-model="subTitle" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
const title = ref("");
const subTitle = ref("");
</script>

<style lang="scss" scoped></style>
