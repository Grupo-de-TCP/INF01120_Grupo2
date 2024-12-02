import { CheckboxProps, ChipProps, FormControlLabelProps, RadioGroupProps, RadioProps, StackProps, TooltipProps } from "@mui/material";
import { FormController, FormControllerProps } from "../../form-controller/form-controller.component";
import { CheckBoxRadioSelection } from "./checkbox-radio-selection.component";
import { ChipsSelection } from "./chips-selection.component";

export interface ItemsSelectionI<T extends string | number> {
  id: T;
  label: string;
  disabled?: boolean;
  tooltip?: string;
}

export type FormFieldSelectionProps<T extends string | number, Multiple extends boolean = false> = FormControllerProps<Multiple extends true ? T[] : T> & {
  items: ItemsSelectionI<T>[];
  multiple?: Multiple;
  direction?: "row" | "column";
  chips?: boolean;
  slotProps?: {
    formControlLabel?: Partial<FormControlLabelProps>;
    radio?: Partial<RadioProps>;
    checkbox?: Partial<CheckboxProps>;
    chip?: Partial<ChipProps>;
    tooltip?: Partial<TooltipProps>;
    stackChips?: Partial<StackProps>;
    radioGroup?: Partial<RadioGroupProps>;
  };
};

export function FormFieldSelection<T extends string | number, Multiple extends boolean = false>(props: FormFieldSelectionProps<T, Multiple>) {
  const { name, control, disabled, label, description, tooltip, helperText, helperTextPadding, required, items, direction, multiple = false as Multiple, chips = false, onChange, onEffect, forceError, slotProps = {} } = props;

  return (
    <FormController<Multiple extends true ? T[] : T> name={name} control={control} disabled={disabled} label={label} description={description} tooltip={tooltip} helperText={helperText} helperTextPadding={helperTextPadding} required={required} onChange={onChange} onEffect={onEffect} forceError={forceError}>
      {({ setTouched, setValue, value }) =>
        chips ? (
          <ChipsSelection items={items} value={value} setTouched={setTouched} setValue={setValue} direction={direction} multiple={multiple} disabled={disabled} slotProps={slotProps} />
        ) : (
          <CheckBoxRadioSelection items={items} value={value} setTouched={setTouched} setValue={setValue} direction={direction} multiple={multiple} disabled={disabled} slotProps={slotProps} />
        )
      }
    </FormController>
  );
}
