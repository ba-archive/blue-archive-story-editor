import { Ref } from "vue";
import useStoryStore from "@/views/Editor/tools/store";
import { InternalStoryUnit, StoryRawUnit, StoryUnitType } from "@/views/Editor/tools/types";
import { StoryRawUnitGeneratorMap } from "@/views/Editor/tools/storyUnitMap";

export function buildDefaultStoryRawUnit(
  override: Partial<Omit<StoryRawUnit, "type">> & Required<Pick<StoryRawUnit, "type">>,
): StoryRawUnit {
  return {
    BGEffect: 0,
    BGMId: 0,
    BGName: 0,
    GroupId: 0,
    PopupFileName: "",
    ScriptKr: "",
    SelectionGroup: 0,
    Sound: "",
    TextJp: "",
    Transition: 0,
    VoiceJp: "",
    ...override,
  };
}

export function deleteStoryUnit(index: number) {
  const store = useStoryStore();
  store.deleteStoryUnit(index);
}

export function inspectFormData<K extends StoryUnitType>(
  type: K,
  deps: Parameters<typeof StoryRawUnitGeneratorMap[K]["internal"]>,
  index: Ref<number>,
  customStoryBuilder?: () => PromiseLike<StoryRawUnit>,
  customInternalStoryBuilder?: () => PromiseLike<InternalStoryUnit>,
) {
  const store = useStoryStore();
  const defaultStoryBuilder = StoryRawUnitGeneratorMap[type].raw;
  const defaultInternalStoryBuilder = StoryRawUnitGeneratorMap[type].internal;
  watch(
    deps,
    () => {
      if (customStoryBuilder) {
        customStoryBuilder().then((data) => {
          store.updateStoryUnit(data, index.value);
        });
      } else {
        // @ts-ignore
        const override: Partial<Omit<StoryRawUnit, "type">> & Required<Pick<StoryRawUnit, "type">> = {};
        Object.keys(defaultStoryBuilder).forEach((key) => {
          const fn = Reflect.get(defaultStoryBuilder, key);
          Reflect.set(override, key, fn.apply(defaultStoryBuilder, deps));
        });
        store.updateStoryUnit(
          buildDefaultStoryRawUnit({
            ...override,
            type,
          }),
          index.value,
        );
      }
      if (customInternalStoryBuilder) {
        customInternalStoryBuilder().then((data) => {
          store.updateInternalStoryUnit(data, index.value);
        });
      } else {
        // @ts-ignore
        const data = defaultInternalStoryBuilder(...deps) as InternalStoryUnit;
        store.updateInternalStoryUnit(data, index.value);
      }
    },
    { deep: true },
  );
}
