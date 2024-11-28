import { Theme, alpha, darken, lighten, styled } from "@mui/material";
import Box from "@mui/material/Box";

import { LabelColor, LabelVariant } from "./label.types";
import { BoxTypeMap } from "@mui/system";
import { OverridableComponent } from "@mui/material/OverridableComponent";

// ----------------------------------------------------------------------

export const StyledLabel = styled<OverridableComponent<BoxTypeMap<{
  ownerState: {
    color: LabelColor;
    customColor?: string;
    variant: LabelVariant;
  }
}, 'div', Theme>>>(Box)(
  ({
    theme,
    ownerState,
  }) => {
    const lightMode = theme.palette.mode === "light";

    const filledVariant = ownerState.variant === "filled";

    const outlinedVariant = ownerState.variant === "outlined";

    const softVariant = ownerState.variant === "soft";

    const defaultStyle = {
      ...(ownerState.color === "default" &&
        !ownerState.customColor && {
        // FILLED
        ...(filledVariant && {
          color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
          backgroundColor: theme.palette.text.primary,
        }),
        // OUTLINED
        ...(outlinedVariant && {
          backgroundColor: "transparent",
          color: theme.palette.text.primary,
          border: `2px solid ${theme.palette.text.primary}`,
        }),
        // SOFT
        ...(softVariant && {
          color: theme.palette.text.secondary,
          backgroundColor: alpha(theme.palette.grey[500], 0.16),
        }),
      }),
    };

    const customColorFlavors = ownerState.customColor
      ? {
        contrastText: "white",
        dark: darken(ownerState.customColor, 0.5),
        light: lighten(ownerState.customColor, 0.5),
        main: ownerState.customColor,
      }
      : {};

    const customColorStyle = {
      ...(ownerState.customColor && {
        // FILLED
        ...(filledVariant && {
          color: customColorFlavors.contrastText,
          backgroundColor: customColorFlavors.main,
        }),
        // OUTLINED
        ...(outlinedVariant && {
          backgroundColor: "transparent",
          color: customColorFlavors.main,
          border: `2px solid ${customColorFlavors.main}`,
        }),
        // SOFT
        ...(softVariant && {
          color: customColorFlavors?.[lightMode ? "dark" : "light"],
          backgroundColor: alpha(customColorFlavors.main!, 0.16),
        }),
      }),
    };

    const colorStyle = {
      ...(ownerState.color !== "default" && {
        // FILLED
        ...(filledVariant && {
          color: theme.palette[ownerState.color].contrastText,
          backgroundColor: theme.palette[ownerState.color].main,
        }),
        // OUTLINED
        ...(outlinedVariant && {
          backgroundColor: "transparent",
          color: theme.palette[ownerState.color].main,
          border: `2px solid ${theme.palette[ownerState.color].main}`,
        }),
        // SOFT
        ...(softVariant && {
          color: theme.palette[ownerState.color][lightMode ? "dark" : "light"],
          backgroundColor: alpha(theme.palette[ownerState.color].main, 0.16),
        }),
      }),
    };

    return {
      height: 24,
      lineHeight: 0,
      borderRadius: 6,
      cursor: "default",
      alignItems: "center",
      whiteSpace: "nowrap",
      display: "inline-flex",
      justifyContent: "center",
      // textTransform: 'capitalize',
      padding: theme.spacing(0, 0.75),
      fontSize: theme.typography.pxToRem(12),
      fontWeight: theme.typography.fontWeightBold,
      transition: theme.transitions.create("all", {
        duration: theme.transitions.duration.shorter,
      }),
      ...defaultStyle,
      ...customColorStyle,
      ...colorStyle,
    };
  },
);
