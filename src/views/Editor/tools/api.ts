import { BGNameExcelTableItem } from "ba-story-player/dist/types/excels";
import service from "@/api/http";

const StoryApi = {
  fetchBackgroundNameExcelTable() {
    return service.excel("background").then((data) => {
      const map = new Map<number, BGNameExcelTableItem>();
      data.DataList.filter((it) => it.BGType === "Image")
        .filter((it) => it.BGFileName)
        .forEach((it) => {
          map.set(it.Name, it);
        });
      return map;
    });
  },
};

export default StoryApi;
