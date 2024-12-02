import { Checkbox, FormControlLabel, Radio, RadioGroup, Tooltip } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { FormFieldSelectionProps } from "./form-field-selection.component";

type CheckBoxRadioSelectionProps<T extends string | number, Multiple extends boolean = false> = Pick<FormFieldSelectionProps<T, Multiple>, "disabled" | "items" | "direction" | "multiple" | "slotProps"> & {
  value: Multiple extends true ? T[] : T;
  setValue: Dispatch<SetStateAction<Multiple extends true ? T[] : T>>;
  setTouched: (is?: boolean) => void;
};

export function CheckBoxRadioSelection<T extends string | number, Multiple extends boolean = false>(props: CheckBoxRadioSelectionProps<T, Multiple>) {

  const { disabled, items, direction, multiple = false as Multiple, slotProps = {}, value, setValue, setTouched } = props;

  return (
    <RadioGroup
      value={value}
      onChange={(_, v: unknown) => {
        if (!multiple) {
          setTouched();
          setValue(v as Multiple extends true ? T[] : T);
        }
      }}
      row={direction === "row"}
      {...slotProps.radioGroup}
    >
      {items.map((e) => (
        <Tooltip arrow key={e.id} title={e.tooltip} placement={direction === "row" ? "top" : "right"}>
          <FormControlLabel
            key={e.id}
            onBlur={() => setTouched()}
            control={
              multiple ? (
                <Checkbox
                  value={e.id}
                  checked={(value as T[])?.map(String).includes(String(e.id))}
                  disabled={disabled || e.disabled}
                  onChange={(_, c) => {
                    setTouched();
                    setValue((value ? (c ? (value as T[])?.concat(e.id) : (value as T[])?.filter((a) => String(a) !== String(e.id))) : ([e.id] as T[])) as Multiple extends true ? T[] : T);
                  }}
                  {...slotProps.checkbox}
                />
              ) : (
                <Radio value={e.id} checked={String(value) === String(e.id)} disabled={disabled} {...slotProps.radio} />
              )
            }
            label={e.label}
            sx={{ m: 0 }}
            {...slotProps.formControlLabel}
          />
        </Tooltip>
      ))}
    </RadioGroup>
  );
}
