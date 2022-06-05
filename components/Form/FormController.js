import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function FormController({ handleChange, label, name, type, value }) {
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={label}
        onChange={handleChange}
      />
    </FormControl>
  );
}

export default FormController;
