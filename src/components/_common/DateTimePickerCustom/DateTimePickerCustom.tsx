import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { memo, useEffect, useImperativeHandle, useRef, useState } from "react";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    borderRadius: "4px",
    "& .MuiInputBase-input": {
      fontSize: "14px",
      fontWeight: "500",
      padding: "13.5px 16px 11.5px",
    },
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
});

interface Props {
  value?: Date;
  name?: string;
  label?: string;
  handleFuncRef?: any;
  sx?: any;
}

export const DateTimePickerCustom: React.FC<Props> = memo(
  ({ value, name, label, handleFuncRef, sx }) => {
    const calendarRef = useRef<HTMLInputElement | null>(null);
    const [calendarValue, setCalendarValue] = useState<Date | null>(value || null);

    useImperativeHandle(handleFuncRef, () => ({
      setValue: (newValue: Date | null) => {
        setCalendarValue(newValue);
      },
      getValue: () => {
        return calendarValue;
      },
    }));

    useEffect(() => {
      if (calendarRef.current) calendarRef.current.placeholder = "dd/mm/yyyy hh:mm";
    }, []);

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100%",
          paddingTop: "5px",
        }}
      >
        <DateTimePicker
          inputRef={calendarRef}
          label={label}
          ampm={false}
          value={calendarValue}
          inputFormat="dd/MM/yyyy HH:mm"
          onChange={(newValue) => {
            setCalendarValue(newValue);
          }}
          renderInput={(props) => {
            return (
              <StyledTextField
                {...props}
                inputProps={{ name, ...props.inputProps }}
                focused={true}
                sx={{
                  flex: 1,
                }}
              />
            );
          }}
        />
      </Box>
    );
  }
);
