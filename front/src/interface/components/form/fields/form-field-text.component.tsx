import { InputAdornment, TextField, TextFieldProps, Typography } from "@mui/material";
import { FormController, FormControllerProps } from "../form-controller/form-controller.component";

type FormFieldTextProps = FormControllerProps<string> &
  TextFieldProps & {
    maxLength?: number;
    slotProps?: {
      TextFieldProps?: TextFieldProps;
      NumberProps?: NumberProps;
    };
  };

type NumberProps = {
  useGrouping?: boolean;
  min?: number;
  max?: number;
  acceptNegative?: boolean;
  acceptDecimal?: boolean;
  decimalPlaces?: number;
  disableClamp?: boolean;
  allowNull?: boolean;
  defaultValue?: string;
};

const useNumberParser =
  ({ min, max, acceptNegative = false, acceptDecimal = false, disableClamp = false, allowNull = false, defaultValue = "" }: NumberProps) =>
  (value: string | null) => {
    if (allowNull && value === null) {
      return "";
    } else if (value === null) {
      value = "";
    }

    // Replace commas with periods for consistency
    value = value.replace(",", ".");

    // Remove unwanted characters
    value = value.replace(/[^0-9.]/g, "");

    // Handle negative numbers
    if (!acceptNegative) {
      value = value.replace(/-/g, "");
    } else {
      // Ensure only one '-' at the beginning
      value = value.replace(/(?!^)-/g, "");
    }

    // Handle decimal numbers
    if (!acceptDecimal) {
      value = value.replace(/\.(?=.*\.)/g, "");
    }

    // Remove leading zeros unless it's just '0' or '0.x'
    value = value.replace(/^0+(?=\d)/, "");

    // Convert value to a number for validation
    let numericValue = parseFloat(value);

    // Allow null or empty value
    if (allowNull && value === "") {
      return "";
    }

    if (!isNaN(numericValue)) {
      // Apply min and max, if not disabled
      if (!disableClamp) {
        if (min !== undefined && numericValue < min) numericValue = min;
        if (max !== undefined && numericValue > max) numericValue = max;
      }

      const result = numericValue.toString();

      if (acceptDecimal) {
        if (value.endsWith(".")) {
          return result + ".";
        } else if (value.endsWith(".0")) {
          return result + ".0";
        } else if (value.endsWith(".00")) {
          return result + ".00";
        } else if (value.endsWith(".000")) {
          return result + ".00";
        }
      }

      return result;
    } else {
      return defaultValue;
    }
  };

export function FormFieldText(props: FormFieldTextProps) {
  const { name, control, disabled, label, description, tooltip, helperText, helperTextPadding, required, children, onChange, onEffect, forceError, slotProps = {}, maxLength, ...textfield } = props;

  const parseNumber = useNumberParser({
    min: slotProps.NumberProps?.min,
    max: slotProps.NumberProps?.max,
    acceptNegative: slotProps.NumberProps?.acceptNegative,
    acceptDecimal: slotProps.NumberProps?.acceptDecimal,
    decimalPlaces: slotProps.NumberProps?.decimalPlaces,
    disableClamp: slotProps.NumberProps?.disableClamp,
    allowNull: slotProps.NumberProps?.allowNull,
    defaultValue: slotProps.NumberProps?.defaultValue,
  });

  const isNumberInput = textfield.type === "number" || slotProps.TextFieldProps?.type === "number";

  return (
    <FormController<string> name={name} control={control} disabled={disabled} label={label} description={description} tooltip={tooltip} helperText={helperText} helperTextPadding={helperTextPadding} required={required} onChange={onChange} onEffect={onEffect} forceError={forceError}>
      {({ error, isTouched, setTouched, setValue, value }) => (
        <TextField
          name={name}
          value={value}
          onBlur={() => setTouched()}
          {...((isTouched && error) || forceError
            ? {
                error: true,
              }
            : {})}
          disabled={disabled}
          {...textfield}
          {...(slotProps.TextFieldProps || {})}
          {...(isNumberInput
            ? {
                type: "text",
                onChange: (e) => setValue(parseNumber(e.target.value)),
              }
            : {
                onChange: (e) => setValue(e.target.value),
              })}
          {...(typeof maxLength === "number" && {
            inputProps: {
              maxLength: maxLength,
              ...textfield.inputProps,
            },
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="caption">{`${value?.length || 0}/${maxLength}`}</Typography>
                </InputAdornment>
              ),
              ...textfield.InputProps,
            },
          })}
        >
          {children}
        </TextField>
      )}
    </FormController>
  );
}
