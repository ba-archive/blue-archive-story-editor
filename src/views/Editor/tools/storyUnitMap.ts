import { defineAsyncComponent } from "vue";
import { InternalTitleStoryUnit, StoryRawUnit, StoryUnitType } from "@/views/Editor/tools/types";

type IStoryUnitComponentMap = {
  [key in StoryUnitType]: {
    component: ReturnType<typeof defineAsyncComponent>;
    type: key;
    icon: string;
    title: string;
    description: string;
  };
};

export const StoryUnitComponentMap: IStoryUnitComponentMap = {
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

type StoryRawUnitOmitType = Omit<StoryRawUnit, "type">;

type BaseGeneralFunction = {
  [type in StoryUnitType]: (...args: never[]) => BaseInternalStoryUnit<type, unknown>;
};

type BaseInternalStoryUnit<Key extends StoryUnitType, Other> = {
  type: Key;
} & Other;

interface ActualGeneralFunction extends BaseGeneralFunction {
  title: (
    title: string,
    sub?: string,
  ) => {
    type: "title";
    title: string;
    subTitle: string;
  };
}

type BaseGeneralFunctionIncludeList = {
  [key in StoryUnitType]: (keyof StoryRawUnitOmitType)[];
};

interface ActualGeneralFunctionIncludeList extends BaseGeneralFunctionIncludeList {
  title: ["ScriptKr", "TextCn"];
}

type BuildFunctionFromType<type extends StoryUnitType, key extends keyof StoryRawUnitOmitType> = (
  ...args: Parameters<ActualGeneralFunction[type]>
) => StoryRawUnitOmitType[key];

type IStoryUnitGenerator = {
  [type in StoryUnitType]: {
    raw: Partial<{
      [key in ActualGeneralFunctionIncludeList[type]]: (
        ...args: Parameters<ActualGeneralFunction[type]>
      ) => StoryRawUnitOmitType[key];
    }>;
    internal: ActualGeneralFunction[type];
  };
};

const StoryUnitGenerator: IStoryUnitGenerator = {
  title: {
    raw: {
      ScriptKr(title: string, subTitle?: string) {
        return `#title;${this.TextCn(title, subTitle)}`;
      },
      TextCn(title: string, subTitle?: string): string {
        const base = `${title}`;
        if (subTitle) {
          return `${base};${subTitle}`;
        }
        return base;
      },
    },
    internal(title: string) {
      return "";
    },
  },
};

type IStoryRawUnitGenerator = {
  [type in StoryUnitType]: Partial<{
    [key in keyof StoryRawUnitOmitType]: (...args: never[]) => StoryRawUnitOmitType[key];
  }>;
};

type TitleStoryRawUnitGeneratorFn<T> = (title: string, subTitle?: string) => T;

type IInternalStoryUnitGenerator = {
  [key in StoryUnitType]: key extends "title"
    ? TitleStoryRawUnitGeneratorFn<InternalTitleStoryUnit>
    : key extends "place"
    ? (text: string) => string
    : never;
};

interface StoryRawUnitGenerator extends IStoryRawUnitGenerator {
  title: {
    ScriptKr: TitleStoryRawUnitGeneratorFn<string>;
    TextCn: TitleStoryRawUnitGeneratorFn<string>;
  };
}

export const StoryRawUnitGeneratorMap: StoryRawUnitGenerator = {
  title: {
    ScriptKr(title: string, subTitle?: string) {
      return `#title;${this.TextCn(title, subTitle)}`;
    },
    TextCn(title: string, subTitle?: string): string {
      const base = `${title}`;
      if (subTitle) {
        return `${base};${subTitle}`;
      }
      return base;
    },
  },
  // @ts-ignore
  place: undefined,
  // @ts-ignore
  text: undefined,
  // @ts-ignore
  option: undefined,
  // @ts-ignore
  st: undefined,
  // @ts-ignore
  effectOnly: undefined,
  // @ts-ignore
  continue: undefined,
  // @ts-ignore
  nextEpisode: undefined,
};

export const InternalStoryUnitGenerator: IInternalStoryUnitGenerator = {
  // @ts-ignore
  continue: undefined,
  // @ts-ignore
  effectOnly: undefined,
  // @ts-ignore
  nextEpisode: undefined,
  // @ts-ignore
  option: undefined,
  place(text: string): string {
    return text;
  },
  // @ts-ignore
  st: undefined,
  // @ts-ignore
  text: undefined,
  title(title: string, subTitle?: string) {
    return { type: "title", title, subTitle };
  },
};
