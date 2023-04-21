<template>
  <el-row :gutter="16" class="fill">
    <el-col :span="12" class="fill" style="display: flex; flex-direction: column">
      <CardContainer title="实时预览" class="fill">
        <div ref="StoryPlayerContainerEl" style="width: 100%; height: 100%">
          <story-player
            :story="story"
            :width="playerWidth"
            :height="playerHeight"
            :change-index="targetIndex"
            :story-summary="{ chapterName: '', summary: '' }"
            language="cn"
            data-url="https://yuuka.cdn.diyigemt.com/image/ba-all-data"
          />
        </div>
      </CardContainer>
      <CardContainer title="资源列表" class="fill">
        <h1>这是资源列表</h1>
      </CardContainer>
    </el-col>
    <el-col :span="12" class="fill">
      <CardContainer title="剧情脚本" class="fill">
        <h1>这是脚本列表</h1>
      </CardContainer>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import StoryPlayer from "ba-story-player";
import { StoryUnit } from "ba-story-player/dist/types/common";
import { onMounted } from "vue";

const StoryPlayerContainerEl = ref<HTMLElement>();
const playerWidth = ref(0);
const playerHeight = ref(0);
onMounted(() => {
  // 无法理解
  const style = getComputedStyle(StoryPlayerContainerEl.value!);
  playerWidth.value = Number(style.width.replace("px", ""));
  playerHeight.value = Number(style.height.replace("px", ""));
});

const story = ref<StoryUnit[]>([]);
const targetIndex = ref(0);
</script>

<style scoped lang="scss">
.fill {
  flex: 1;
}
</style>
