import { Dispatch, SetStateAction } from "react";

export * from "./AutocompleteCustomForm";
export * from "./AutocompleteCustomFilter";
export type ModalAutocompleteComponentProps<S> = {
  initState?: any;
  autoCompValue: S;
  setAutoCompValue: Dispatch<SetStateAction<S>>;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
