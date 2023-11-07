import React, { useState, useImperativeHandle, Dispatch, SetStateAction } from "react";
import { Autocomplete, Box, Button, CircularProgress, TextField } from "@mui/material";
import useDebounce from "@hooks/useDebounce";
import useDidUpdate from "@hooks/useDidUpdate";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ModalAutocompleteComponentProps } from ".";

export type AutocompleteCustomFilterProps<T> = {
  label: string;
  placeholder?: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  renderOption: any;
  handleFuncRef?: any;
  onChange?: (value: string) => void;
  onScrollEnd?: () => void;
  loading?: boolean;
  ModalAutocompleteComponent?: React.FC<ModalAutocompleteComponentProps<T[]>>;
  limitTags?: number;
};

export function AutocompleteCustomFilter<T>({
  label,
  placeholder,
  options: optionsExternal = [],
  getOptionLabel,
  renderOption,
  handleFuncRef,
  loading,
  onChange,
  onScrollEnd,
  ModalAutocompleteComponent,
  limitTags,
}: AutocompleteCustomFilterProps<T>) {
  const [autoCompValue, setAutoCompValue] = useState<T[]>([]);

  const [valueSearch, setValueSearch] = useState("");
  const valueSearchDebounce = useDebounce(valueSearch, 400);
  const [openModal, setOpenModal] = useState(false);

  useImperativeHandle(handleFuncRef, () => ({
    setValue: (newValue: T[]) => {
      setAutoCompValue(newValue);
    },
    getValue: () => {
      return autoCompValue;
    },
  }));

  useDidUpdate(() => {
    if (onChange) onChange(valueSearchDebounce);
  }, [valueSearchDebounce]);

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight) {
      if (onScrollEnd) onScrollEnd();
    }
  };

  return (
    <>
      <Autocomplete
        sx={{
          "& .MuiOutlinedInput-root": {
            py: "5px",
          },

          "& .MuiChip-root": {
            height: 25,
          },
        }}
        ListboxProps={{
          onScroll: handleScroll,
        }}
        loading={loading}
        loadingText={"Đang tải..."}
        noOptionsText={"Không tìm thấy"}
        // open={ModalAutocompleteComponent ? false : undefined}
        multiple
        limitTags={limitTags || 2}
        disableCloseOnSelect
        options={ModalAutocompleteComponent ? autoCompValue : optionsExternal}
        // readOnly={!!ModalAutocompleteComponent}
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
        value={autoCompValue}
        onOpen={(e) => {
          if (ModalAutocompleteComponent) setOpenModal(true);
        }}
        onChange={(event, newValue) => {
          setAutoCompValue(newValue);
        }}
        popupIcon={ModalAutocompleteComponent && <OpenInNewIcon />}
        renderInput={(params) => (
          <Box
            sx={{
              color: "#121818",
              paddingTop: "5px",
              paddingBottom: "0px",
              borderRadius: "6px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",

              width: "100%",
              "& .MuiTextField-root": {
                width: "100%",
              },
              "& .MuiInputBase-input": {
                fontSize: "14px",
                fontWeight: "500",
                padding: "13.5px 16px 11.5px",
                width: "100%",
              },
              "& .MuiOutlinedInput-root": {
                width: "100%",
              },

              "& .MuiOutlinedInput-notchedOutline": {
                background: "transparent",
                border: "1px solid #dee2e6 !important",
                borderRadius: "4px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px",
                fontWeight: "500",
                transform: "translate(14px, 10px) scale(1)",
                color: "#5B5656 !important",
                "&.Mui-focused": {
                  fontWeight: "600",
                  transform: "translate(14px, -11px) scale(0.95)",
                  background: "white",
                },
              },
            }}
          >
            <TextField
              {...params}
              focused
              label={label}
              placeholder={autoCompValue.length ? "" : placeholder}
              onChange={(e) => {
                if (onChange) setValueSearch(e.target.value);
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={16} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          </Box>
        )}
      />
      {ModalAutocompleteComponent && (
        <ModalAutocompleteComponent
          openModal={openModal}
          setOpenModal={setOpenModal}
          autoCompValue={autoCompValue}
          setAutoCompValue={setAutoCompValue}
        />
      )}
    </>
  );
}
