<template>
  <div class="story-unit-container flex flex-row">
    <div class="index">{{ index }}</div>
    <div class="component flex-1">
      <Component :is="StoryUnit.component" :index="index" />
    </div>
    <div class="action">
      <el-button type="danger" text @click="deleteSelf">删除</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StoryUnitType } from "@/views/Editor/tools/types";
import { StoryUnitComponentMap } from "@/views/Editor/tools/storyUnitMap";
import { deleteStoryUnit } from "@/views/Editor/tools";
import useStoryStore from "@/views/Editor/tools/store";

const storyStore = useStoryStore();
const props = withDefaults(defineProps<IProp>(), {
  index: 0,
  type: "text",
});

provide("index", props.index);
provide("storyUnit", storyStore.internalStory[props.index]);

const StoryUnit = computed(() => StoryUnitComponentMap[props.type]);

function deleteSelf() {
  deleteStoryUnit(props.index);
}

type IProp = {
  index: number; // 标识其在脚本array中的index
  type: StoryUnitType;
};
</script>

<style lang="scss" scoped>
.story-unit-container {
  .index {
    width: 30px;
  }
  .action {
    width: 100px;
  }
}
</style>
