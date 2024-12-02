import { Autocomplete, AutocompleteProps, AutocompleteRenderInputParams, ChipProps, Stack, TextField, TextFieldProps, createFilterOptions } from "@mui/material";
import { FormController, FormControllerProps } from "../form-controller/form-controller.component";
import { AutocompleteChips } from "./components/autocomplete-chips.component";

// ------------------------------------------------------------------------

export type AutocompleteOption = {
  id: string;
  label: string;
  freeSolo?: boolean;
};

export interface FormFieldAutocompleteProps<Multiple extends boolean | undefined = undefined, FreeSolo extends boolean | undefined = undefined> extends FormControllerProps<Value<Multiple>> {
  items: AutocompleteOption[];
  multiple?: Multiple;
  freeSolo?: FreeSolo;
  hideOptions?: boolean;
  slotProps?: {
    textField?: Partial<TextFieldProps>;
    autocomplete?: Partial<AutocompleteProps<AutocompleteOption, Multiple, false, false>>;
    chips?: Partial<ChipProps>;
  };
}

type Value<Multiple extends boolean | undefined> = Multiple extends true ? Array<AutocompleteOption> : AutocompleteOption | null;

type OnchangeValue<Multiple extends boolean | undefined, FreeSolo extends boolean | undefined> = Multiple extends true ? (FreeSolo extends true ? Array<AutocompleteOption | string> : Array<AutocompleteOption>) : FreeSolo extends true ? AutocompleteOption | string | null : AutocompleteOption | null;

// ------------------------------------------------------------------------

export function FormFieldAutocomplete<Multiple extends boolean = false, FreeSolo extends boolean = false>(props: FormFieldAutocompleteProps<Multiple, FreeSolo>) {

  const { name, control, disabled, label, description, tooltip, helperText, helperTextPadding, required, items, multiple, freeSolo, slotProps = {}, hideOptions = false, onChange, onEffect, forceError } = props;

  return (
    <FormController<Value<Multiple>> name={name} control={control} disabled={disabled} label={label} description={description} tooltip={tooltip} helperText={helperText} helperTextPadding={helperTextPadding} required={required} onChange={onChange} onEffect={onEffect} forceError={forceError}>
      {({ error, isTouched, setTouched, setValue, value }) => (
        <Stack>
          <Autocomplete
            value={(multiple ? [] : value) as Value<Multiple>}
            multiple={multiple}
            freeSolo={freeSolo as any as undefined}
            disabled={disabled}
            onChange={(_, n) => {
              const newValue = n as OnchangeValue<Multiple, FreeSolo>;
              if (Array.isArray(newValue)) {
                const result = [
                  ...(Array.isArray(value) ? value : []),
                  ...newValue
                    .map((e) => {
                      if (typeof e !== "string") return e;

                      const existing = items.find((f) => f.label.toLowerCase() === e.toLowerCase());
                      if (existing) return existing;

                      return { id: e, label: e, freeSolo: true };
                    })
                    .filter((e) => {
                      if (!e.label || !e.label.trim()) return false;
                      if (!e.freeSolo) return true;

                      const hasValue = (value as Array<AutocompleteOption>).find((f) => f.label.toLowerCase() === e.label.toLowerCase());

                      return !hasValue;
                    }),
                ];

                return setValue(result as Value<Multiple>);
              }
              if (typeof newValue === "string") {
                if (!newValue.trim()) return setValue(null as Value<Multiple>);

                const existing = items.find((f) => f.label === newValue);
                if (existing) return setValue(existing as Value<Multiple>);

                return setValue({
                  id: newValue,
                  label: newValue,
                  freeSolo: true,
                } as Value<Multiple>);
              }
              return setValue(n);
            }}
            options={items}
            {...slotProps.autocomplete}
            filterOptions={(_options, state) => {
              const filteredOptions = _options.filter((e) => {
                if (Array.isArray(value)) {
                  return !(value || []).find((f) => f.id === e.id);
                }
                return e.id !== value?.id;
              });

              const options = createFilterOptions<AutocompleteOption>({
                matchFrom: "any",
                ignoreCase: true,
                ignoreAccents: true,
                stringify: (option) => option.label,
              })(filteredOptions, state);

              if (freeSolo) {
                const noMatch = state.inputValue !== "" && !options.find((e) => (e.label || "").toLowerCase() === (state.inputValue || "").toLowerCase());

                const hasValue = multiple ? (value as Array<AutocompleteOption>)?.find((e) => (e.label || "").toLowerCase() === (state.inputValue || "").toLowerCase()) : (value as AutocompleteOption)?.label === state.inputValue;

                if (noMatch && !hasValue && state.inputValue && state.inputValue.trim()) {
                  options.push({
                    id: state.inputValue,
                    label: `Adicione "${state.inputValue}"`,
                    freeSolo: true,
                  } as AutocompleteOption);
                }
              }

              const opt = slotProps.autocomplete?.filterOptions?.(options, state);

              return opt || options;
            }}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField
                {...params}
                error={Boolean(error && isTouched) || forceError}
                onBlur={() => setTouched()}
                {...slotProps.textField}
                InputProps={{
                  placeholder: "Pesquise..." as string,
                  ...(params.InputProps || {}),
                  ...(slotProps.textField?.InputProps || {}),
                }}
              />
            )}
          />
          {multiple && !hideOptions && (
            <AutocompleteChips
              value={value as AutocompleteOption[]}
              chipProps={slotProps.chips}
              handleRemove={(id) => {
                setValue((items) => (Array.isArray(items) ? items.filter((i) => i.id !== id) : items) as Value<Multiple>);
              }}
            />
          )}
        </Stack>
      )}
    </FormController>
  );
}
