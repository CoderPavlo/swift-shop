import React from 'react';
import { ToggleButtonGroup } from "@mui/material";

interface StyledToggleButtonGroupProps {
    value: any,
    onChange: (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => void,
    children: React.ReactNode,
  }
  
  const StyledToggleButtonGroup = ({ value, onChange, children }: StyledToggleButtonGroupProps) => {
    return (
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={onChange}
        aria-label="Platform"
        sx={{ width: "100%", marginTop: "5px", marginBottom: "5px" }}
      >
        {children}
      </ToggleButtonGroup>
    );
  };

export default StyledToggleButtonGroup;