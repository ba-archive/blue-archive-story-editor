import { BGNameExcelTableItem } from "ba-story-player/dist/types/excels";

export type ExcelTableType = "background";

export type ExcelTable<T> = {
  DataList: T[];
};

type BaseExcelTable = {
  [key in ExcelTableType]: Map<number, unknown>;
};

export interface ActualBaseExcelTable extends BaseExcelTable {
  background: Map<number, BGNameExcelTableItem>;
}

type IExcelTableNameMap = {
  [key in ExcelTableType]: string;
};

export const ExcelTableNameMap: IExcelTableNameMap = {
  background: "ScenarioBGNameExcelTable.json",
};
