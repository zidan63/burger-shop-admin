import { ButtonCustom } from "@components/_common/ButtonCustom";
import { DateTimePickerCustom } from "@components/_common/DateTimePickerCustom";
import { TextFieldCustom } from "@components/_common/TextFieldCustom";
import { CardCustom } from "@components/_common/CardCustom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Checkbox, Grid, Stack } from "@mui/material";
import { useRef, useState } from "react";
import { AutocompleteCustomFilter, AutocompleteCustomFilterProps } from "../AutocompleteCustom";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportFile, ExportFileProps } from "../ExportFile";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type FilterAdvanceSearchItemOptions<T> = Omit<
  AutocompleteCustomFilterProps<T>,
  "handleFuncRef" | "renderOption" | "placeholder" | "label"
> & {
  formatValueWhenSubmit?: (option: T) => string | string[] | number;
};

type FilterAdvanceSearchItem<T> = {
  type: "text" | "date" | "options";
  field: string;
  label: string;
  placeholder?: string;
  size?: number;
  options?: FilterAdvanceSearchItemOptions<T>;
};

type Props = {
  showExportFile?: boolean;
  exportFileProps?: Omit<ExportFileProps, "open" | "setOpen">;
  searchItem: { label: string; placeholder?: string };
  searchItemAdvances: FilterAdvanceSearchItem<unknown>[];
  onSearch?: (value: string) => void;
  onSearchAdvance?: (values: Record<string, string | string[] | number>) => void;
  onReset?: () => void;
};

export function FilterAdvance({
  showExportFile,
  exportFileProps,
  searchItem,
  searchItemAdvances,
  onSearch,
  onSearchAdvance,
  onReset,
}: Props) {
  const handleFuncRefs = useRef<any>({});
  const dateHandler = useRef<any>((field: string) => {
    const ref = {
      current: undefined,
    };
    handleFuncRefs.current[field] = ref;
    return ref;
  });

  const [isAdvance, setIsAdvance] = useState(false);
  const [openModalExportFile, setOpenModalExportFile] = useState(false);

  const handleOpenModalExportFile = (value: boolean) => {
    setOpenModalExportFile(value);
  };

  const handleOpen = () => {
    setIsAdvance((prev) => !prev);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAdvance) return onSearch && onSearch(e.target.search.value);

    const values = searchItemAdvances.reduce((prev, cur: FilterAdvanceSearchItem<unknown>) => {
      if (cur.type === "text") prev[cur.field] = e.target[cur.field]?.value;
      if (cur.type === "date") {
        prev[cur.field] = handleFuncRefs.current[cur.field]?.current?.getValue()?.getTime();
      }

      if (cur.type === "options" && cur.options) {
        prev[cur.field] = handleFuncRefs.current[cur.field]?.current?.getValue().map((item) => {
          if (cur.options?.formatValueWhenSubmit) return cur.options?.formatValueWhenSubmit(item);
          return item;
        });
      }

      return prev;
    }, {} as Record<string, string | string[] | number>);

    if (onSearchAdvance) onSearchAdvance(values);
  }

  function handleReset(e: any) {
    e.preventDefault();
    e.stopPropagation();
    searchItemAdvances.forEach((cur: any) => {
      if (cur.type === "date") handleFuncRefs.current[cur.field]?.current?.setValue(null);
      if (cur.type === "options" && cur.options) {
        handleFuncRefs.current[cur.field]?.current?.setValue([]);
      }
    });
    if (onReset) onReset();
  }

  return (
    <CardCustom>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        onReset={handleReset}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          pt: "5px",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            maxHeight: !isAdvance ? "400px" : "0px",
            overflow: "hidden",
            transition: "max-height .3s ease",
          }}
        >
          <Grid item md={12} xs={12}>
            <TextFieldCustom
              id={"search"}
              name={"search"}
              label={searchItem.label}
              focused
              placeholder={searchItem.placeholder}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            maxHeight: isAdvance ? "400px" : "0px",
            overflow: "hidden",
            transition: "max-height .3s ease",
          }}
        >
          {searchItemAdvances.map((item) => {
            if (item.type === "options" && item.options) {
              return (
                <Grid item md={item?.size || 4} xs={12} key={item.field}>
                  <AutocompleteCustomFilter
                    handleFuncRef={dateHandler.current(item.field)}
                    label={item.label}
                    placeholder={item.placeholder}
                    options={item.options.options}
                    loading={item.options.loading}
                    limitTags={item.options.limitTags}
                    onChange={item.options.onChange}
                    onScrollEnd={item.options.onScrollEnd}
                    getOptionLabel={item.options.getOptionLabel}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {item.options?.getOptionLabel(option)}
                      </li>
                    )}
                    ModalAutocompleteComponent={
                      isAdvance ? item.options.ModalAutocompleteComponent : undefined
                    }
                  />
                </Grid>
              );
            }

            if (item.type === "date")
              return (
                <Grid item md={item?.size || 4} xs={12} key={item.field}>
                  <DateTimePickerCustom
                    label={item.label}
                    handleFuncRef={dateHandler.current(item.field)}
                  />
                </Grid>
              );

            return (
              <Grid item md={item?.size || 4} xs={12} key={item.field}>
                <TextFieldCustom
                  id={item.field}
                  name={item.field}
                  label={item.label}
                  focused
                  placeholder={item.placeholder}
                />
              </Grid>
            );
          })}
        </Grid>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack gap={2} flexDirection={"row"}>
            <ButtonCustom
              variant="outlined"
              title={isAdvance ? "Tìm kiếm nâng cao" : "Tìm kiếm nâng cao"}
              endIcon={<ArrowIcon isAdvance={isAdvance} />}
              onClick={handleOpen}
            />
            {showExportFile && (
              <ButtonCustom
                variant="outlined"
                title={"Xuất file"}
                startIcon={<FileDownloadIcon />}
                onClick={() => handleOpenModalExportFile(true)}
              />
            )}
          </Stack>

          <Stack gap={2} flexDirection={"row"}>
            <ButtonCustom
              type="reset"
              variant="outlined"
              title={"Đặt lại"}
              startIcon={<ReplayIcon />}
            />
            <ButtonCustom type="submit" title={"Tìm kiếm"} startIcon={<SearchIcon />} />
          </Stack>
        </Box>
      </Box>
      {showExportFile && exportFileProps && (
        <ExportFile
          open={openModalExportFile}
          setOpen={setOpenModalExportFile}
          {...exportFileProps}
        />
      )}
    </CardCustom>
  );
}

const ArrowIcon = ({ isAdvance }) => {
  if (!isAdvance) return <ArrowDropDownIcon />;
  return (
    <ArrowDropDownIcon
      sx={{
        transform: "rotate(-180deg)",
        transition: "transform 0.15s ease",
        position: "relative",
      }}
    />
  );
};
