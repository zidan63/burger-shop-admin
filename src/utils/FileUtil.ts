import * as XLSX from "xlsx/xlsx.mjs";

export class FileUtil {
  public static exportFileExcel = (data: any, sheetName: string, fileName: string) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };
}
