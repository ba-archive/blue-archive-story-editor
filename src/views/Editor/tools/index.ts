import useStoryStore from "@/views/Editor/tools/store";
import { InternalStoryUnit, StoryRawUnit, StoryUnitType } from "@/views/Editor/tools/types";

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

export function inspectFormData(
  deps: Parameters<typeof watch>[0],
  storyBuilder: () => PromiseLike<StoryRawUnit>,
  internalStoryBuilder: () => PromiseLike<InternalStoryUnit>,
  index: number,
) {
  const store = useStoryStore();
  watch(deps, () => {
    storyBuilder().then((data) => {
      store.updateStoryUnit(data, index);
    });
    internalStoryBuilder().then((data) => {
      store.updateInternalStoryUnit(data, index);
    });
  });
}
