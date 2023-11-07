import { useState, useEffect, useCallback, useImperativeHandle } from "react";
import { Box, IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useDebounce from "@hooks/useDebounce";
import useDidUpdate from "@hooks/useDidUpdate";
const INPUT_DELAY = 450;

type TextFieldCustomProps = TextFieldProps & {
  password?: boolean;
  onTextChange?: (fieldName: string, fieldValue: any) => void;
  helperText?: any;
  inputRef?: any;
};

export const TextFieldCustom: React.FC<TextFieldCustomProps> = (props) => {
  const { password, onTextChange, inputRef, ...otherProps } = props;
  const [innerValue, setInnerValue] = useState(props.value || "");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const valueDebounce = useDebounce(innerValue, INPUT_DELAY);
  const isFocused = props.focused;

  useImperativeHandle(inputRef, () => ({
    setInnerValue: setInnerValue,
  }));

  useDidUpdate(() => {
    if (!props.value) setInnerValue("");
  }, [props.value]);

  useDidUpdate(() => {
    if (onTextChange && props.name) onTextChange(props.name, valueDebounce.trim());
    setInnerValue(valueDebounce.trim());
  }, [valueDebounce]);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const newValue = event.currentTarget.value;
    setInnerValue(newValue);
    if (props.onChange) props.onChange(event);
  }, []);

  let InputProps = { ...props.InputProps };
  if (password)
    InputProps = {
      ...props.InputProps,
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {!showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      ),
    };

  if (!isFocused)
    return (
      <TextField
        {...otherProps}
        type={props.password ? (!showPassword ? "password" : "text") : "text"}
        value={innerValue}
        onChange={handleOnChange}
        InputProps={{ id: props.id, name: props.name, ...InputProps }}
      />
    );

  return (
    <Box
      sx={{
        color: "#121818",
        paddingTop: "5px",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "6px",
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
      <TextField {...props} inputProps={{ id: props.id, name: props.name }} />
    </Box>
  );
};
