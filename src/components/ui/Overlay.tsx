import {
  Box,
  Button,
  FileUpload,
  HStack,
  Menu,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LayerSlider } from "@/components/ui/LayerSlider";
import { ColorPickerInline } from "@/components/ui/ColorPicker";
import { useColorMode } from "@/components/ui/color-mode";
import { getLayerCount } from "@/app/helpers/constants";
import {
  exportRingsToJSON,
  importJSONToObjects,
  resetColors,
  resetVisibility,
} from "@/app/helpers/mutateRings";
import { DesignStyle, Limit, ToroidProps } from "@/app/helpers/types";
import { Dispatch, SetStateAction } from "react";

interface OverlayProps {
  enabled: boolean;
  rings: ToroidProps[];
  setRings: Dispatch<SetStateAction<ToroidProps[]>>;
  xLimits: Limit;
  setXLimits: Dispatch<SetStateAction<Limit>>;
  yLimits: Limit;
  setYLimits: Dispatch<SetStateAction<Limit>>;
  zLimits: Limit;
  setZLimits: Dispatch<SetStateAction<Limit>>;
  activeColor: string;
  setActiveColor: Dispatch<SetStateAction<string>>;
  colorSwatches: string[];
  setColorSwatches: Dispatch<SetStateAction<string[]>>;
  ringCount: number;
  setRingCount: Dispatch<SetStateAction<number>>;
  designStyle: DesignStyle;
  setDesignStyle: Dispatch<SetStateAction<DesignStyle>>;
  togglePrintMode: () => void;
}

export const Overlay = ({
  enabled,
  rings,
  setRings,
  xLimits,
  setXLimits,
  yLimits,
  setYLimits,
  zLimits,
  setZLimits,
  activeColor,
  setActiveColor,
  colorSwatches,
  setColorSwatches,
  ringCount,
  setRingCount,
  designStyle,
  setDesignStyle,
  togglePrintMode,
}: OverlayProps) => {
  const { toggleColorMode } = useColorMode();
  const maxLayers = getLayerCount(ringCount, designStyle);
  const totalRings = rings.length;
  const resetRingColors = () => resetColors(rings, setRings);

  return (
    <Box zIndex={100}>
      {enabled && (
        <Box position="absolute" top={0} left={0}>
          <HStack>
            <Menu.Root
              size="md"
              onSelect={(event) => {
                setRingCount(Number(event.value));
              }}
            >
              <Menu.Trigger asChild>
                <Button variant="outline">
                  {ringCount}x{ringCount}
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="1">1x1</Menu.Item>
                    <Menu.Item value="2">2x2</Menu.Item>
                    <Menu.Item value="3">3x3</Menu.Item>
                    <Menu.Item value="4">4x4</Menu.Item>
                    <Menu.Item value="5">5x5</Menu.Item>
                    <Menu.Item value="6">6x6</Menu.Item>
                    <Menu.Item value="7">7x7</Menu.Item>
                    <Menu.Item value="8">8x8</Menu.Item>
                    <Menu.Item value="9">9x9</Menu.Item>
                    <Menu.Item value="10">10x10</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Menu.Root
              size="md"
              onSelect={(event) => setDesignStyle(event.value)}
            >
              <Menu.Trigger asChild>
                <Button variant="outline">
                  {designStyle[0].toUpperCase()}
                  {designStyle.slice(1)}
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="minimal">Minimal</Menu.Item>
                    <Menu.Item value="offset">Offset</Menu.Item>
                    <Menu.Item value="symmetrical">Symmetrical</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Text padding="10px">Total Rings: {totalRings}</Text>
          </HStack>
          <FileUpload.Root
            accept={["application/json"]}
            marginTop={5}
            onFileAccept={(event) =>
              importJSONToObjects(
                event,
                setRings,
                setActiveColor,
                setColorSwatches
              )
            }
          >
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <Button size="sm">Import Cube Data</Button>
            </FileUpload.Trigger>
          </FileUpload.Root>
        </Box>
      )}
      {enabled && (
        <VStack position="absolute" top={0} right={0} alignItems="flex-end">
          <Button variant="outline" onClick={toggleColorMode}>
            Toggle Light/Dark Mode
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              resetVisibility(rings, setRings);
              setXLimits([1, maxLayers]);
              setYLimits([1, maxLayers]);
              setZLimits([1, maxLayers]);
            }}
          >
            Show All Rings
          </Button>
        </VStack>
      )}
      {enabled && (
        <Box>
          <LayerSlider
            position="absolute"
            top="15%"
            left={10}
            orientation="vertical"
            label="Z-Axis Layers"
            height="50%"
            max={maxLayers}
            value={xLimits}
            setValue={setXLimits}
          />
          <LayerSlider
            position="absolute"
            top="15%"
            right={10}
            orientation="vertical"
            label="Y-Axis Layers"
            height="50%"
            max={maxLayers}
            value={yLimits}
            setValue={setYLimits}
          />
          <LayerSlider
            position="absolute"
            left="30%"
            bottom={10}
            orientation="horizontal"
            label="X-Axis Layers"
            width="40%"
            max={maxLayers}
            value={zLimits}
            setValue={setZLimits}
          />
          <ColorPickerInline
            position="absolute"
            right={0}
            bottom={0}
            activeColor={activeColor}
            setColor={setActiveColor}
            colorSwatches={colorSwatches}
            resetRingColors={resetRingColors}
            setColorSwatches={setColorSwatches}
          />
        </Box>
      )}
      {!enabled && (
        <Box
          position="absolute"
          marginLeft="auto"
          marginRight="auto"
          left="0"
          right="0"
          textAlign="center"
          top="5px"
        >
          <Text textStyle="4xl">
            {ringCount}x{ringCount} - {designStyle[0].toUpperCase()}
            {designStyle.slice(1)}
          </Text>
        </Box>
      )}
      <HStack position="absolute" bottom={10} left={10}>
        <Button
          onClick={() => exportRingsToJSON(rings, activeColor, colorSwatches)}
        >
          Save Cube Data
        </Button>
        <Button marginLeft={10} onClick={togglePrintMode}>
          {enabled ? "Print Mode" : "Edit Mode"}
        </Button>
      </HStack>
    </Box>
  );
};
