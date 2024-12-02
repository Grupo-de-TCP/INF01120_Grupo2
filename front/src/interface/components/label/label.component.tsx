import { forwardRef } from "react";

import Box from "@mui/material/Box";

import { StyledLabel } from "./label.styles";
import { LabelProps } from "./label.types";

// ----------------------------------------------------------------------

export const Label = forwardRef<HTMLSpanElement, LabelProps>(
  ({ children, color = "default", variant = "soft", startIcon, customColor, endIcon, sx, ...other }, ref) => {

    const iconStyles = {
      width: 16,
      height: 'auto',
      "& svg, img": { width: 1, height: 1, objectFit: "cover" },
    };

    return (
      <StyledLabel
        ref={ref}
        ownerState={{ color, customColor, variant }}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        {...other}
      >
        {startIcon && (
          <Box className="NmLabel-start-icon" sx={{ mr: 0.75, ...iconStyles }}>
            {" "}
            {startIcon}{" "}
          </Box>
        )}

        {children}

        {endIcon && (
          <Box className="NmLabel-end-icon" sx={{ ml: 0.75, ...iconStyles }}>
            {" "}
            {endIcon}{" "}
          </Box>
        )}
      </StyledLabel>
    );
  },
);
