import {
  Box,
  Button,
  ColorPicker,
  HStack,
  Input,
  parseColor,
  Popover,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export const ColorPickerInline = ({
  activeColor,
  resetRingColors,
  setColor,
  ...props
}) => {
  const [showPopover, setPopoverStatus] = useState(false);
  const { colorSwatches, setColorSwatches } = props;
  const addColorToSwatches = () => {
    if (colorSwatches.indexOf(activeColor) > -1) {
      return;
    }
    const newColorSwatches = [...colorSwatches];
    newColorSwatches.unshift(activeColor);
    setColorSwatches(newColorSwatches.slice(0, 5));
  };
  return (
    <Box {...props}>
      <HStack justifyContent="flex-end" paddingBottom={5}>
        <Popover.Root
          open={showPopover}
          onInteractOutside={() => setPopoverStatus(false)}
        >
          <Popover.Trigger asChild>
            <Button
              size="sm"
              color="#962424"
              variant="outline"
              onClick={() => setPopoverStatus(true)}
            >
              Reset All Ring Colors
            </Button>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Arrow />
                <Popover.Body>
                  <Text my="4">
                    Are you sure? This will change all of the rings back to
                    grey.
                  </Text>
                  <Button
                    backgroundColor="#962424"
                    onClick={() => {
                      resetRingColors();
                      setPopoverStatus(false);
                    }}
                  >
                    Reset Them All!
                  </Button>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </HStack>
      <HStack
        alignItems="flex-end"
        backgroundColor="white"
        padding="5px"
        border="2px solid #222"
        borderRadius="10px"
      >
        <ColorPicker.Root
          onValueChange={(e) => {
            setColor(e.valueAsString);
          }}
        >
          <ColorPicker.HiddenInput />
          <ColorPicker.SwatchGroup css={{ padding: "5px 0px 5px 3px" }}>
            <VStack>
              {colorSwatches.map((item) => (
                <ColorPicker.SwatchTrigger key={item} value={item}>
                  <ColorPicker.Swatch value={item}></ColorPicker.Swatch>
                </ColorPicker.SwatchTrigger>
              ))}
              <Button size="xs" onClick={addColorToSwatches}>
                +
              </Button>
            </VStack>
          </ColorPicker.SwatchGroup>
        </ColorPicker.Root>
        <ColorPicker.Root
          open
          format="rgba"
          defaultValue={parseColor("#ffffff")}
          value={parseColor(activeColor)}
          onValueChange={(e) => {
            setColor(e.valueAsString);
          }}
        >
          <ColorPicker.HiddenInput />
          <ColorPicker.Content animation="none" shadow="none" padding="0">
            <ColorPicker.Area />
            <HStack>
              <ColorPicker.EyeDropper size="xs" variant="outline" />
              <ColorPicker.Sliders />
              <ColorPicker.ValueSwatch />
            </HStack>
          </ColorPicker.Content>
        </ColorPicker.Root>
      </HStack>
    </Box>
  );
};
