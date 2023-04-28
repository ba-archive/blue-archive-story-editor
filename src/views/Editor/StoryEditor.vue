<template>
  <el-row :gutter="16" class="flex-1">
    <el-col :span="12" class="flex-1 flex-col" style="display: flex">
      <CardContainer title="实时预览" class="flex-1">
        <div ref="StoryPlayerContainerEl" class="h-full w-full">
          <story-player
            :story="story"
            :width="playerContainerWidth - 24"
            :height="playerContainerHeight - 24"
            :change-index="targetIndex"
            :story-summary="{ chapterName: '', summary: '' }"
            language="Cn"
            data-url="https://yuuka.cdn.diyigemt.com/image/ba-all-data"
          />
        </div>
      </CardContainer>
      <CardContainer title="资源列表" class="flex-1">
        <h1>这是资源列表</h1>
      </CardContainer>
    </el-col>
    <el-col :span="12" class="flex-1 h-full">
      <CardContainer title="剧情脚本" class="flex-1 h-full">
        <div class="h-full flex flex-col">
          <el-row class="mb-16px">
            <el-button type="primary" class="w-full" @click="createStoryUnit">新增</el-button>
          </el-row>
          <el-row class="flex-1">
            <el-scrollbar class="w-full">
              <StoryUnit
                v-for="(e, index) in story"
                :key="index"
                class="mb-16px"
                :type="e.type"
                :index="Number(index)"
              />
            </el-scrollbar>
          </el-row>
        </div>
      </CardContainer>
    </el-col>
  </el-row>
  <el-dialog v-model="createDialogVisible" align-center>
    <CreateStoryUnitDialog @choose="onConfirmStoryUnitType" />
  </el-dialog>
</template>

<script setup lang="ts">
import StoryPlayer from "ba-story-player";
import { StoryType } from "ba-story-player/dist/types/common";
import "ba-story-player/dist/style.css";
import StoryUnit from "@/views/Editor/StoryUnit.vue";
import CreateStoryUnitDialog from "@/views/Editor/CreateStoryUnitDialog.vue";
import useStoryStore from "@/views/Editor/tools/store";
import { buildDefaultStoryRawUnit } from "@/views/Editor/tools";
import StoryApi from "@/views/Editor/tools/api";

const StoryPlayerContainerEl = ref<HTMLElement>();
const storyStore = useStoryStore();
const { width: playerContainerWidth, height: playerContainerHeight } = useElementSize(StoryPlayerContainerEl);
const story = computed(() => storyStore.story);
const targetIndex = ref(0);
const createDialogVisible = ref(false);

function createStoryUnit() {
  createDialogVisible.value = true;
}
function onConfirmStoryUnitType(type: StoryType) {
  storyStore.insertStoryUnit(buildDefaultStoryRawUnit({ type }));
  createDialogVisible.value = false;
}
</script>

<style scoped lang="scss"></style>
