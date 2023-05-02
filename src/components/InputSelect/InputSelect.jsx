import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"
import React from "react"
import { Controller } from "react-hook-form"

export const InputSelect = ({
  name,
  control,
  errorMes,
  label,
  children,
  size = "small",
  ...selectProps
}) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <FormControl error={!!errorMes}>
          {/* <InputLabel id='demo-simple-select-label'>{label}</InputLabel> */}
          <Select
            size={size}
            {...field}
            value={field.value || ""}
            {...selectProps}
          >
            {children}
          </Select>
          <FormHelperText>{errorMes}</FormHelperText>
        </FormControl>
      )}
      control={control}
    />
  )
}
