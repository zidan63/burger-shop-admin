import React, { useState, useImperativeHandle, Dispatch, SetStateAction } from "react";
import { Autocomplete, Box, Button, CircularProgress, TextField } from "@mui/material";
import useDebounce from "@hooks/useDebounce";
import useDidUpdate from "@hooks/useDidUpdate";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ModalAutocompleteComponentProps } from ".";
import { setLazyProp } from "next/dist/server/api-utils";

export type AutocompleteCustomFormProps<T = any> = {
  initState?: T;
  label: string;
  placeholder?: string;
  getOptionLabel: (option: T) => string;
  handleFuncRef?: any;
  ModalAutocompleteComponent?: React.FC<ModalAutocompleteComponentProps<T[]>>;
  limitTags?: number;
  error?: string;
  onChange?: (option: T | null) => void;
};

export function AutocompleteCustomForm<T>({
  initState,
  label,
  placeholder,
  getOptionLabel,
  ModalAutocompleteComponent,
  limitTags,
  error,
  onChange,
}: AutocompleteCustomFormProps<T>) {
  const [autoCompValue, setAutoCompValue] = useState<T | null>(initState || null);
  const [openModal, setOpenModal] = useState(false);

  useDidUpdate(() => {
    if (onChange) onChange(autoCompValue);
  }, [autoCompValue]);

  return (
    <>
      <Autocomplete
        open={false}
        limitTags={limitTags || 2}
        options={[autoCompValue]}
        getOptionLabel={getOptionLabel}
        value={autoCompValue}
        onOpen={(e) => {
          if (ModalAutocompleteComponent) setOpenModal(true);
        }}
        onChange={(event, newValue) => {
          setAutoCompValue(newValue);
        }}
        popupIcon={ModalAutocompleteComponent && <OpenInNewIcon />}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            required
            placeholder={placeholder}
            error={!!error}
            helperText={error}
          />
        )}
      />
      {ModalAutocompleteComponent && (
        <ModalAutocompleteComponent
          openModal={openModal}
          setOpenModal={setOpenModal}
          autoCompValue={autoCompValue ? [autoCompValue] : []}
          setAutoCompValue={(values) => {
            if (typeof values === "function") {
              const org = values([]).pop();
              setAutoCompValue(org || null);
            } else setAutoCompValue(values[0] || null);

            setOpenModal(false);
          }}
        />
      )}
    </>
  );
}
