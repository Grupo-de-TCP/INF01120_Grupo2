import { FormControlLabel, FormControlLabelProps, Switch, SwitchProps } from "@mui/material";
import { FormController, FormControllerProps } from "../form-controller/form-controller.component";

type FormFieldSwitchProps = FormControllerProps<boolean> & {
  labelSwitch?: FormControlLabelProps["label"];
  slotProps?: {
    formControlLabel?: Partial<FormControlLabelProps>;
    switch?: Partial<SwitchProps>;
  };
} & Partial<SwitchProps>;

export function FormFieldSwitch(props: FormFieldSwitchProps) {
  const { name, control, disabled, label, description, tooltip, helperText, helperTextPadding, required, labelSwitch, slotProps = {}, onChange, onEffect, forceError } = props;

  return (
    <FormController<boolean> name={name} control={control} disabled={disabled} label={label} description={description} tooltip={tooltip} helperText={helperText} helperTextPadding={helperTextPadding} required={required} onChange={onChange} onEffect={onEffect} forceError={forceError}>
      {({ setTouched, setValue, value }) => (
        <FormControlLabel
          control={
            <Switch
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
          label={labelSwitch}
          {...slotProps.formControlLabel}
        />
      )}
    </FormController>
  );
}
