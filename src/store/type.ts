import { NetworkAdapterType } from "@/interface/http";

export interface BaseStoreState {
  adapter: NetworkAdapterType;
  theme: {
    themeType: string;
    themeColor: string | number;
  };
}
