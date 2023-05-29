<template>
  <el-form class="el-form-mb-0" inline label-position="left" label-width="100">
    <el-form-item label="谁说的" required>
      <el-select v-model="config.characterName" filterable clearable placeholder="留空默认无立绘">
        <el-option v-for="(e, i) in characterList" :key="i" :label="e.name" :value="e.CharacterName" />
      </el-select>
    </el-form-item>
    <el-form-item label="什么表情" class="mb-0">
      <el-select v-model="config.face" filterable clearable placeholder="留空默认无立绘">
        <el-option v-for="(e, i) in characterFaceList" :key="i" :label="e" :value="e" />
      </el-select>
    </el-form-item>
    <el-form-item label="站哪" class="mb-0">
      <el-select v-model="config.position" filterable clearable placeholder="留空默认无立绘">
        <el-option v-for="(e, i) in characterPositionList" :key="i" :label="e" :value="e" />
      </el-select>
    </el-form-item>
    <el-form-item label="说什么" class="mb-0">
      <!--      <el-input v-model="subTitle" />-->
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { CharacterNameExcelTableItem } from "ba-story-player/dist/lib/types/excels";
import { inspectFormData } from "@/views/Editor/tools";
import { InternalTextStoryUnit } from "@/views/Editor/tools/types";
import { ExcelTable } from "@/views/Editor/tools/store";

// getResourcesUrl("characterSpine", "1111");

const index = inject("index", ref(-1));
const config = inject<Ref<InternalTextStoryUnit>>("storyUnit")!;

const characterList = ref<(CharacterNameExcelTableItem & { name: string })[]>([]);
const characterPositionList = ref([1, 2, 3, 4, 5]);
const characterFaceList = ref(Array.from({ length: 30 }).map((_, idx) => (idx < 10 ? `0${idx}` : String(idx))));
ExcelTable.character.then((data) => {
  characterList.value = [...data.values()].map((it) => {
    const nickName = it.NicknameCN || it.NicknameJP;
    const name = (it.NameCN || it.NameJP) + nickName ? `(${nickName})` : "";
    Reflect.set(it, "name", name);
    return it;
  }) as never[];
  config.value.characterName = characterList.value[0].CharacterName;
});

inspectFormData("text", [config], index);
</script>

<style lang="scss" scoped></style>
