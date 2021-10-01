import React from "react";
import { Box, Text } from "grommet";

export default function SearchParam({ label, options, onClick }) {
  return (
    <Box direction={"row-responsive"} gap={"small"} align={"center"}>
      <Text weight={"600"} size={"medium"}>
        {" "}
        Language{" "}
      </Text>
      <Text size={"small"}> English </Text>
      <Text size={"small"}> Hindi </Text>
      <Text size={"small"}> Indian </Text>
      <Text size={"small"}> Marathi </Text>
      <Text size={"small"}> Tamil </Text>
      <Text size={"small"}> Telugu </Text>
      <Text size={"small"}> Unknown </Text>
    </Box>
  );
}
