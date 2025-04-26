import { Box } from "@chakra-ui/react";
import { ToroidProps } from "@/app/helpers/types";

interface PrintModeProps {
  rings: ToroidProps[];
}

export const PrintMode = ({ rings }: PrintModeProps) => {
  console.log(rings);
  return <Box></Box>;
};
