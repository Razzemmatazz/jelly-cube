import { HStack, Slider, VStack } from "@chakra-ui/react";

interface LayerSliderProps extends Slider.RootProps {
  setValue: () => void;
  label: string;
}

export const LayerSlider = ({
  setValue,
  label,
  ...props
}: LayerSliderProps) => {
  const LabelStack = props.orientation === "horizontal" ? HStack : VStack;
  return (
    <Slider.Root
      size="lg"
      colorPalette="green"
      min={1}
      minStepsBetweenThumbs={0}
      onValueChange={(e) => {
        setValue(e.value);
      }}
      {...props}
    >
      <LabelStack justify="space-between">
        <Slider.Label>{label}</Slider.Label>
        <Slider.ValueText />
      </LabelStack>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.Root>
  );
};
