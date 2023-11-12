import { useState, useCallback, useEffect } from "react";
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, useGridApiRef } from "@mui/x-data-grid";
import type { GridCellParams, GridColDef, GridScrollParams } from "@mui/x-data-grid";

import { Box, CircularProgress, Radio, Stack, Typography } from "@mui/material";
import { ColorPallet } from "@config/theme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { MenuOption, MenuOptionItemProps } from "../MenuOption";
import { PaginationCustom, PaginationCustomProps } from "./PaginationCustom";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { formatDate } from "@utils/DateFormat";
import useDidUpdate from "@hooks/useDidUpdate";
import { DataGridEmpty } from "./DataGridEmpty";

type ColumnProps<T = any> = {
  headerName: string;
  field?: string;
  size?: number;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  type: "date" | "text" | "number" | "object" | "boolean";
  headerAlign?: "center" | "left" | "right";
  align?: "center" | "left" | "right";
  sortable?: boolean;
  renderCell?: (params: GridCellParams) => any;
  valueGetter?: (params: GridCellParams) => any;
  sortComparator?: (a: any, b: any, aCell: T, bCell: T) => number;
};

type RowProps<T = any> = {
  [key: string]: any;
};

type GridDataTableProps<T> = {
  loading?: boolean;
  sx?: any;
  rowsData: T[];
  columnsData: ColumnProps<T>[];
  isLongOption?: boolean;
  options?: MenuOptionItemProps<T>[] | ((row: T) => MenuOptionItemProps<T>[]);
  pagination?: PaginationCustomProps;
  showSelection?: {
    type: "checkbox" | "radio";
    selected: string[];
    onSelect: (values: string[]) => void;
  };
  onRowClick?: (row: any) => void;
  onScroll?: (event: GridScrollParams) => void;
};

export function DataGridCustom<T>({
  columnsData,
  rowsData,
  isLongOption,
  options,
  showSelection,
  pagination,
  loading: loadingExternal,
  onScroll,
  onRowClick,
  sx,
}: GridDataTableProps<T>) {
  const [rows, setRows] = useState<any[]>(rowsData.map((row, index) => ({ index, ...row })));

  const [loading, setLoading] = useState(false);
  useDidUpdate(() => {
    let timer;

    if (!loadingExternal) setLoading(false);
    timer = setTimeout(() => {
      setLoading(loadingExternal || false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loadingExternal]);

  const apiRef = useGridApiRef();

  useDidUpdate(() => {
    setRows(rowsData.map((row, index) => ({ index, ...row })));
  }, [rowsData]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (onScroll) onScroll(event);
    };
    // The `subscribeEvent` method will automatically unsubscribe in the cleanup function of the `useEffect`.
    return apiRef.current.subscribeEvent("scrollPositionChange", handleScroll);
  }, [apiRef]);

  const renderColumns = () => {
    const columnPerField: GridColDef[] = columnsData.map((column: ColumnProps) => {
      switch (column.type) {
        case "date": {
          column.valueGetter = (params) => formatDate(params.value);
        }
      }

      return {
        headerName: column.headerName,
        field: column.field || "",
        flex: column.size || 1,
        width: column.width,
        maxWidth: column.maxWidth,
        minWidth: column.minWidth || 150,
        headerAlign: column.headerAlign || "center",
        align: column.align || "center",
        renderCell: column.renderCell,
        valueGetter: column.valueGetter,
        headerClassName: "super-app-theme--header",
        cellClassName: "cell-class-name",
        sortable: column.sortable ?? true,
        sortComparator: column.sortComparator,
      };
    });

    columnPerField.unshift({
      field: "#",
      headerName: "#",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
      cellClassName: "cell-class-name",
      sortable: false,
      renderCell: (params) => params.row.index + 1,
    });

    if (showSelection?.type === "checkbox") {
      columnPerField.unshift({
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 55,
        renderHeader: () => "Chọn",
        headerClassName: "super-app-theme--header",
        cellClassName: "cell-class-name",
      });
    } else if (showSelection?.type === "radio") {
      columnPerField.unshift({
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 55,
        renderHeader: () => "Chọn",
        renderCell: (params) => {
          const id = params.id as any;
          const isChecked = showSelection.selected.includes(id);
          return (
            <Radio
              checked={isChecked}
              onChange={() => {
                if (isChecked) showSelection.onSelect([]);
                else showSelection.onSelect([id]);
              }}
              value={id}
              name="radio-buttons"
            />
          );
        },
        headerClassName: "super-app-theme--header",
        cellClassName: "cell-class-name",
      });
    }

    if (options)
      columnPerField.push({
        field: "action",
        headerName: "Thao tác",
        width: 120,
        headerAlign: "center",
        align: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: "cell-class-name",
        sortable: false,
        renderCell: (params) => {
          if (typeof options === "function")
            return (
              <MenuOption
                value={params.row}
                options={options(params.row)}
                isLongOption={isLongOption}
              />
            );

          return <MenuOption value={params.row} options={options} isLongOption={isLongOption} />;
        },
      });

    return columnPerField;
  };

  const handleRowSelectionForCheckBox = useCallback(
    (values) => {
      if (showSelection?.type === "checkbox") showSelection?.onSelect(values);
    },
    [showSelection?.onSelect]
  );

  const handleSortModeChange = (model) => {
    if (!model.length) return setRows(rowsData.map((row, index) => ({ index, ...row })));

    const field = model[0].field;
    const col = columnsData.find((col) => col.field === field);

    setRows((prev) => {
      return [...prev]
        .sort((a, b) => {
          if (model[0].sort === "asc") {
            if (col?.sortComparator) return col.sortComparator(a[field], b[field], a, b);
            if (col?.type === "text") return a[field].localeCompare(b[field]);
            if (col?.type === "date" || col?.type === "number") return a[field] - b[field];
            if (col?.type === "boolean") {
              const n1 = a[field] ? 1 : 2;
              const n2 = b[field] ? 1 : 2;
              return n1 - n2;
            }
          }

          if (col?.sortComparator) return -col.sortComparator(a[field], b[field], a, b);
          if (col?.type === "text") return b[field].localeCompare(a[field]);
          if (col?.type === "date" || col?.type === "number") return b[field] - a[field];
          if (col?.type === "boolean") {
            const n1 = a[field] ? 1 : 2;
            const n2 = b[field] ? 1 : 2;
            return n2 - n1;
          }
        })
        .map((row, index) => ({ ...row, index }));
    });
  };

  const handleRowClick = (row) => {
    if (onRowClick) onRowClick(row);
  };

  return (
    <Box
      sx={{
        overflowX: { xs: "scroll", md: "hidden" },
        borderRadius: "8px",
        bgcolor: "#fff",
        boxShadow: ColorPallet.mainColor.boxShadow,
      }}
    >
      <Box
        sx={{
          width: { xs: "1000px", md: "100%" },
          "& .super-app-theme--header": {
            color: "#fff",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: ColorPallet.mainColor.tableHead,

            "& .MuiDataGrid-sortIcon": {
              color: "#fff",
              fontSize: "25px",
            },
          },

          "& .MuiDataGrid-columnsContainer, & .MuiDataGrid-cell": {
            borderBottom: "1px dashed #333 !important",
          },

          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
      >
        <DataGrid
          apiRef={apiRef}
          loading={loading}
          checkboxSelection={!!showSelection}
          onRowClick={(param) => handleRowClick(param.row)}
          onRowSelectionModelChange={handleRowSelectionForCheckBox}
          rowSelectionModel={showSelection?.selected}
          disableColumnMenu
          rows={rows}
          rowHeight={rows.length ? 48 : undefined}
          columnHeaderHeight={48}
          sx={{ height: rows.length ? "auto" : 250, ...sx }}
          showCellVerticalBorder={false}
          sortingMode="server"
          columns={renderColumns()}
          onSortModelChange={handleSortModeChange}
          slots={{
            columnSortedAscendingIcon: ArrowDropUpIcon,
            columnSortedDescendingIcon: ArrowDropDownIcon,
            columnUnsortedIcon: () => <UnfoldMoreIcon sx={{ fontSize: 20, color: "#fff" }} />,
            noRowsOverlay: DataGridEmpty,
            noResultsOverlay: DataGridEmpty,
            loadingOverlay: () => (
              <Stack
                sx={{ bgcolor: "rgba(255,255,255,0.5)", width: "100%", height: "100%" }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <CircularProgress size={35} />
              </Stack>
            ),
            footer: () => {
              return <>{!!rows.length && pagination && <PaginationCustom {...pagination} />}</>;
            },
          }}
        />
      </Box>
    </Box>
  );
}
