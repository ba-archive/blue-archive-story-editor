import { defineStore } from "pinia";
import { StoryStoreState, StoryRawUnit, InternalStoryUnit } from "@/views/Editor/tools/types";
import { buildDefaultStoryRawUnit } from "@/views/Editor/tools/index";

const useStoryStore = defineStore({
  id: "story",
  state: (): StoryStoreState => ({
    story: [],
    internalStory: [],
  }),
  actions: {
    insertStoryUnit(unit: StoryRawUnit) {
      this.story.push(unit);
    },
    updateStoryUnit(unit: StoryRawUnit, index: number) {
      this.story.splice(index, 1, unit);
    },
    deleteStoryUnit(index: number) {
      this.story.splice(index, 1);
      this.normalizeStoryUnit();
    },
    insertInternalStoryUnit(unit: InternalStoryUnit) {
      this.internalStory.push(unit);
    },
    updateInternalStoryUnit(unit: InternalStoryUnit, index: number) {
      this.internalStory.splice(index, 1, unit);
    },
    deleteInternalStoryUnit(index: number) {
      this.internalStory.splice(index, 1);
      this.normalizeStoryUnit();
    },
    normalizeStoryUnit() {
      if (this.story.length === 0) {
        this.insertStoryUnit(buildDefaultStoryRawUnit({ type: "title" }));
        this.insertInternalStoryUnit({ type: "title", title: "", subTitle: "" });
      }
    },
  },
  persist: {
    key: "story",
    afterRestore(ctx) {
      const store = ctx.store as ReturnType<typeof useStoryStore>;
      store.normalizeStoryUnit();
    },
  },
});

export default useStoryStore;
