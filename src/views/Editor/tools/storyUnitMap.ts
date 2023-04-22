import { defineAsyncComponent } from "vue";
import { StoryUnitType } from "@/views/Editor/tools/types";

type IStoryUnitComponentMap = {
  [key in StoryUnitType]: {
    component: ReturnType<typeof defineAsyncComponent>;
    type: key;
    icon: string;
    title: string;
    description: string;
  };
};

const StoryUnitComponentMap: IStoryUnitComponentMap = {
  title: {
    component: defineAsyncComponent(() => import("../StoryItems/TitleUnit.vue")),
    type: "title",
    icon: "",
    title: "章节名",
    description: "显示在最开头的章节名称",
  },
  place: {
    component: defineAsyncComponent(() => import("../StoryItems/TitleUnit.vue")),
    type: "place",
    icon: "",
    title: "地点名称",
    description: "左上角那个",
  },
  text: {
    component: defineAsyncComponent(() => import("../StoryItems/TitleUnit.vue")),
    type: "text",
    icon: "",
    title: "",
    description: "",
  },
  option: {
    component: defineAsyncComponent(() => import("../StoryItems/TitleUnit.vue")),
    type: "option",
    icon: "",
    title: "",
    description: "",
  },
  st: {
    component: defineAsyncComponent(() => import("../StoryItems/TitleUnit.vue")),
    type: "st",
    icon: "",
    title: "",
    description: "",
  },
  effectOnly: {
    component: defineAsyncComponent(() => import("../StoryItems/TitleUnit.vue")),
    type: "effectOnly",
    icon: "",
    title: "",
    description: "",
  },
  continue: {
    component: defineAsyncComponent(() => import("../StoryItems/TitleUnit.vue")),
    type: "continue",
    icon: "",
    title: "",
    description: "",
  },
  nextEpisode: {
    component: defineAsyncComponent(() => import("../StoryItems/TitleUnit.vue")),
    type: "nextEpisode",
    icon: "",
    title: "",
    description: "",
  },
};

export default StoryUnitComponentMap;
