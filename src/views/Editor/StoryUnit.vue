<template>
  <div class="story-unit-container">
    <div class="index">{{ index }}</div>
    <div class="component">
      <Component :is="StoryUnit.component" />
    </div>
    <div class="action">
      <el-button type="danger" text>删除</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StoryUnitType } from "@/views/Editor/tools/types";
import StoryUnitComponentMap from "@/views/Editor/tools/storyUnitMap";

const props = withDefaults(defineProps<IProp>(), {
  index: 0,
  type: "text",
});

const StoryUnit = computed(() => StoryUnitComponentMap[props.type]);

type IProp = {
  index: number; // 标识其在脚本array中的index
  type: StoryUnitType;
};
</script>

<style lang="scss" scoped>
.story-unit-container {
  display: flex;
  flex-direction: row;
  .index {
    width: 30px;
  }
  .component {
    flex: 1;
  }
  .action {
    width: 100px;
  }
}
</style>
