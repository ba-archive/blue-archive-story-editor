import { StoryUnit } from "ba-story-player/dist/types/common";

// eslint-disable-next-line import/prefer-default-export
export function buildDefaultStoryUnit(): StoryUnit {
  return {
    GroupId: 0,
    SelectionGroup: 0,
    PopupFileName: "",
    type: "text",
    characters: [],
    textAbout: {
      showText: {
        text: [],
      },
      st: {},
    },
    effect: {
      otherEffect: [],
    },
  };
}
