import { Chip, Stack, Tooltip } from "@mui/material";
import { Dispatch, SetStateAction, useMemo } from "react";
import { FormFieldSelectionProps } from "./form-field-selection.component";

type ChipsSelectionProps<T extends string | number, Multiple extends boolean = false> = Pick<FormFieldSelectionProps<T, Multiple>, "disabled" | "items" | "direction" | "multiple" | "slotProps"> & {
  value: Multiple extends true ? T[] : T;
  setValue: Dispatch<SetStateAction<Multiple extends true ? T[] : T>>;
  setTouched: (is?: boolean) => void;
};

export function ChipsSelection<T extends string | number, Multiple extends boolean = false>(props: ChipsSelectionProps<T, Multiple>) {

  const { disabled, items, direction, multiple = false as Multiple, slotProps = {}, value, setValue, setTouched } = props;

  const activeList = useMemo(() => {
    return (Array.isArray(value) ? value : [value]) as (string | number)[];
  }, [value]);

  return (
    <Stack gap={1.5} direction={direction} alignItems="flex-start" flexWrap="wrap" {...slotProps.stackChips}>
      {items.map((e) => {
        const isActive = activeList.includes(e.id);
        return (
          <Tooltip arrow key={e.id} title={e.tooltip} placement={direction === "row" ? "top" : "right"} {...slotProps.tooltip}>
            <Chip
              color="primary"
              variant={isActive ? "filled" : "outlined"}
              label={e.label}
              disabled={disabled || e.disabled}
              clickable
              onClick={() => {
                setTouched();
                if (multiple) {
                  setValue((list) => {
                    if (!Array.isArray(list)) return list;
                    if (list.includes(e.id)) {
                      return list.filter((l) => l !== e.id) as Multiple extends true ? T[] : T;
                    } else {
                      return [...list, e.id] as Multiple extends true ? T[] : T;
                    }
                  });
                } else {
                  setValue(e.id as Multiple extends true ? T[] : T);
                }
              }}
              {...slotProps.chip}
            />
          </Tooltip>
        );
      })}
    </Stack>
  );
}
