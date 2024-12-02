import { Box, FormHelperText, FormLabel, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { FAIcon } from "interface/components/fa-icon";
import { Dispatch, ReactElement, SetStateAction, isValidElement, useCallback, useEffect, useMemo } from "react";
import { FormStoreControl } from "../form-store/form-store.store";

// ------------------------------------------------------------------------

export interface FormControllerProps<T> {
  name: string;
  onChange?: (value: T) => void | undefined | T | "custom-validation-failed";
  onEffect?: (value: T) => void;
  control: FormStoreControl<object>;
  disabled?: boolean;
  disableErrors?: boolean;
  label?: string;
  description?: string;
  tooltip?: string;
  forceError?: boolean;
  helperText?: string;
  helperTextPadding?: "fixed" | "out-of-flow";
  required?: boolean;
}

// ------------------------------------------------------------------------

type FormControllerParams<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  error: ReturnType<FormStoreControl<object>["useValidation"]>;
} & ReturnType<FormStoreControl<object>["useTouched"]>;

type FormControllerChildren<T> = {
  (props: FormControllerParams<T>): ReactElement;
};

// ------------------------------------------------------------------------

export function FormController<T = any>(
  props: FormControllerProps<T> & {
    children: FormControllerChildren<T> | ReactElement;
  },
) {
  const { control, name, onChange, onEffect, forceError } = props;

  const value = control.useGetter<T>(name);
  const _setValue = control.useSetter<T>(name);

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      if (onChange && typeof value !== "function") {
        const res = onChange(value);
        if (res === "custom-validation-failed") return;
        if (res !== undefined) value = res;
      }
      _setValue(value);
    },
    [_setValue, onChange],
  );

  useEffect(() => {
    if (onEffect) {
      onEffect(value);
    }
  }, [value, onEffect]);

  const error = control.useValidation(name);

  const { isTouched, setTouched } = control.useTouched(name);

  const helperText = isTouched && error && !props.disableErrors ? error : props.helperText;

  const theme = useTheme();

  const tooltipColor = useMemo(() => {
    if (props.disabled) return theme.palette.text.disabled;
    if ((isTouched && error && !props.disableErrors) || forceError) return theme.palette.error.main;
    return theme.palette.text.secondary;
  }, [forceError, error, isTouched, props.disableErrors, props.disabled, theme.palette.error.main, theme.palette.text.disabled, theme.palette.text.secondary]);

  const descriptionColor = useMemo(() => {
    if (props.disabled) return theme.palette.text.secondary;
    if ((isTouched && error && !props.disableErrors) || forceError) return theme.palette.error.main;
    return theme.palette.text.primary;
  }, [forceError, error, isTouched, props.disableErrors, props.disabled, theme.palette.error.main, theme.palette.text.primary, theme.palette.text.secondary]);

  const helperColor = useMemo(() => {
    if (props.disabled) return theme.palette.text.disabled;
    if ((isTouched && error && !props.disableErrors) || forceError) return theme.palette.error.main;
    return theme.palette.text.secondary;
  }, [forceError, error, isTouched, props.disableErrors, props.disabled, theme.palette.error.main, theme.palette.text.disabled, theme.palette.text.secondary]);

  const helperIcon = useMemo(() => {
    if (props.disabled) return theme.palette.text.disabled;
    if ((isTouched && error && !props.disableErrors) || forceError) return "triangle-exclamation";
    return "circle-exclamation";
  }, [forceError, error, isTouched, props.disableErrors, props.disabled, theme.palette.text.disabled]);

  return (
    <Stack
      data-form-location={name}
      width={1}
      sx={{
        "&:hover .form-controller-helper-text": {
          opacity: 1,
        },
        "&:focus-within .form-controller-helper-text": {
          opacity: 1,
        },
      }}
    >
      {props.label && (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <FormLabel
            required={props.required && !props.disabled}
            disabled={props.disabled}
            error={Boolean((isTouched && error && !props.disableErrors) || forceError)}
            sx={{
              typography: "subtitle2",
              mb: props.description ? 0 : 1,
            }}
          >
            {props.label}
          </FormLabel>
          {props.tooltip && (
            <Tooltip title={props.tooltip} placement="right-end" arrow>
              <FAIcon icon="circle-question" sx={{ color: tooltipColor }} />
            </Tooltip>
          )}
        </Stack>
      )}
      {props.description && (
        <Typography variant="body2" sx={{ mb: 1 }} color={descriptionColor}>
          {props.description}
        </Typography>
      )}
      {isValidElement(props.children)
        ? props.children
        : (props.children as FormControllerChildren<T>)({
            error,
            isTouched,
            setTouched,
            setValue,
            value,
          })}
      <Box
        height={props.helperTextPadding === "fixed" ? 18 : undefined}
        position="relative"
        className="form-controller-helper-text"
        sx={
          (isTouched && error && !props.disableErrors) || forceError
            ? {}
            : {
                opacity: 0,
                transition: "opacity 0.3s ease-in-out",
              }
        }
      >
        {helperText && (
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            pt={props.helperTextPadding === "fixed" || helperText ? 1 : 0}
            {...(props.helperTextPadding === "out-of-flow"
              ? {
                  position: "absolute",
                  top: 0,
                  left: 0,
                }
              : {})}
          >
            <FAIcon icon={helperIcon} sx={{ color: helperColor }} fontSize="small" />
            <FormHelperText disabled={props.disabled} sx={{ color: helperColor, mt: 0 }}>
              {helperText}
            </FormHelperText>
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
