import { Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps } from "@mui/material";
import { FormController, FormControllerProps } from "../form-controller/form-controller.component";

type FormFieldCheckboxProps = FormControllerProps<any> & {
  labelCheckbox?: FormControlLabelProps["label"];
  slotProps?: {
    formControlLabel?: Partial<FormControlLabelProps>;
    switch?: Partial<CheckboxProps>;
  };
} & Partial<CheckboxProps>;

export function FormFieldCheckbox(props: FormFieldCheckboxProps) {
  const { name, control, disabled, label, description, tooltip, helperText, helperTextPadding, required, labelCheckbox, slotProps = {}, onChange, onEffect, forceError } = props;

  return (
    <FormController<boolean> name={name} control={control} disabled={disabled} label={label} description={description} tooltip={tooltip} helperText={helperText} helperTextPadding={helperTextPadding} required={required} onChange={onChange} onEffect={onEffect} forceError={forceError}>
      {({ setTouched, setValue, value }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={(_e, chk) => {
                setTouched();
                setValue(chk);
              }}
              onBlur={() => setTouched()}
              disabled={disabled}
              {...slotProps.switch}
            />
          }
          label={labelCheckbox}
          {...slotProps.formControlLabel}
        />
      )}
    </FormController>
  );
}
