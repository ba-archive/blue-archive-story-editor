<template>
  <el-form class="el-form-mb-0" inline>
    <el-form-item label="主标题" required>
      <el-input v-model="title" />
    </el-form-item>
    <el-form-item label="次标题(可选)" class="mb-0">
      <el-input v-model="subTitle" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { buildDefaultStoryRawUnit, inspectFormData } from "@/views/Editor/tools";
import { InternalStoryUnitGenerator, StoryRawUnitGeneratorMap } from "@/views/Editor/tools/storyUnitMap";
import { InternalTitleStoryUnit } from "@/views/Editor/tools/types";

const index = inject("index", -1);
const storyUnit = inject<InternalTitleStoryUnit>("storyUnit", { title: "", subTitle: "", type: "title" });

const title = ref(storyUnit.title);
const subTitle = ref(storyUnit.subTitle);

inspectFormData(
  [title, subTitle],
  () =>
    Promise.resolve(
      buildDefaultStoryRawUnit({
        type: "title",
        ScriptKr: StoryRawUnitGeneratorMap.title.ScriptKr(title.value, subTitle.value),
        TextCn: StoryRawUnitGeneratorMap.title.TextCn(title.value, subTitle.value),
      }),
    ),
  () => Promise.resolve(InternalStoryUnitGenerator.title(title.value, subTitle.value)),
  index,
);
</script>

<style lang="scss" scoped></style>
