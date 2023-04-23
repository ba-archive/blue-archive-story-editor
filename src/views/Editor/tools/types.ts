import { StoryType, StoryRawUnit as PlayerStoryUnit } from "ba-story-player/dist/types/common";

export type StoryUnitType = StoryType;

export type StoryRawUnit = PlayerStoryUnit & {
  type: StoryUnitType;
};

export type StoryStoreState = {
  story: StoryRawUnit[];
  internalStory: InternalStoryUnit[];
};

export type InternalStoryUnit = InternalTitleStoryUnit | InternalPlaceStoryUnit;

type InternalStoryUnit0<key extends StoryUnitType> = {
  type: key;
};

export type InternalTitleStoryUnit = InternalStoryUnit0<"title"> & {
  title: string;
  subTitle?: string;
};

export type InternalPlaceStoryUnit = InternalStoryUnit0<"place"> & {
  place: string;
};
