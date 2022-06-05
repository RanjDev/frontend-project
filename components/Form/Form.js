import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import FormController from "./FormController";

function Form({
  title,
  description,
  formData,
  handleChange,
  submitBtn,
  onSubmit,
}) {
  return (
    <Box>
      <Text fontSize={"24"} fontWeight={"semibold"}>
        {title}
      </Text>
      <Text fontSize={"12"}>{description}</Text>
      {formData.map((data, i) => {
        return (
          <FormController
            handleChange={handleChange}
            key={i}
            label={data.label}
            name={data.name}
            type={data.type}
            value={data.value}
          />
        );
      })}

      <Button
        onClick={onSubmit}
        w={"100%"}
        my={"4"}
        color={"#FFF"}
        bg={"#667080"}
        _hover={{ bg: "#4f5763" }}
      >
        {submitBtn}
      </Button>
    </Box>
  );
}

export default Form;
