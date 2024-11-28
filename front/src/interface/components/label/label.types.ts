import { BoxProps } from "@mui/material/Box";

// ----------------------------------------------------------------------

export type LabelColor = "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";

export type ThemeColor = Exclude<LabelColor, "default" | "default-light">;

export type LabelVariant = "filled" | "outlined" | "soft";

export interface LabelProps extends BoxProps {
  startIcon?: React.ReactElement | null;
  endIcon?: React.ReactElement | null;
  color?: LabelColor;
  /**
   * Should be either rgb, rgba, hsl or hsla color
   */
  customColor?: Exclude<string, LabelColor>;
  variant?: LabelVariant;
}
