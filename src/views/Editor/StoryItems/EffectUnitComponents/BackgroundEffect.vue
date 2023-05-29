<template>
  <el-form class="el-form-mb-0" inline label-position="left" label-width="100">
    <el-form-item label="类型" required>
      <el-select v-model="config.background" filterable>
        <el-option
          v-for="(e, i) in list"
          :key="i"
          :label="e.BGFileName.slice(e.BGFileName.lastIndexOf('/') + 1)"
          :value="e.Name"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { BGNameExcelTableItem } from "ba-story-player/dist/lib/types/excels";
import { Ref } from "vue";
import { ExcelTable } from "@/views/Editor/tools/store";
import { EffectOnlyConfig } from "@/views/Editor/tools/types";

const list = ref<BGNameExcelTableItem[]>([]);
const config = inject<Ref<EffectOnlyConfig>>("config") as Ref<EffectOnlyConfig>;

ExcelTable.background.then((data) => {
  list.value = [...data.values()].map((it) => {
    it.BGFileName = it.BGFileName.slice(it.BGFileName.lastIndexOf("/") + 1);
    return it;
  });
  config.value.background = list.value[0].Name;
});
</script>

<style scoped lang="scss"></style>
