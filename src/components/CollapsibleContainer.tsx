import { useState } from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import ExpandableText from "@/components/ExpandableText";
import { Collapse } from "@chakra-ui/transition";


interface Props {
    title: string;
    description: string;
}
const CollapsibleContainer = ({ title,description,}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Flex
        align="center"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        mb={2}
        width={"80%"}
        style={{ backgroundColor: isOpen ? "green" : "lightgray" }}
      >
        <Heading as="h2" size="md">
            {title}
        </Heading>
        {isOpen ? (
          <HiChevronUp size={20} style={{ marginLeft: "8px" }} />
        ) : (
          <HiChevronDown size={20} style={{ marginLeft: "8px" }} />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <ExpandableText>{description}</ExpandableText>
      </Collapse>
    </Box>
  );
};

export default CollapsibleContainer;
