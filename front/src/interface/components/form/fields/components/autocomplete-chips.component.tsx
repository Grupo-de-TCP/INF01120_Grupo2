import { Box, Chip, ChipProps, Collapse } from "@mui/material";

// ------------------------------------------------------------------------

interface Item {
  id: string;
  label: string;
}

interface AutocompleteChipsProps {
  value?: Item[];
  handleRemove: (id: string) => void;
  chipProps?: Partial<ChipProps>;
}

// ------------------------------------------------------------------------

export function AutocompleteChips({ value, handleRemove, chipProps }: AutocompleteChipsProps) {
  return (
    <Collapse in={Boolean(value && value.length)}>
      <Box display="flex" flexWrap="wrap" gap={1} pt={2}>
        {(value || []).map((e) => (
          <Chip key={e.id} label={e.label} size="medium" color="primary" variant="outlined" onDelete={() => handleRemove(e.id)} {...chipProps} />
        ))}
      </Box>
    </Collapse>
  );
}
