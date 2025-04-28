"use client";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import Cube from "@/components/ui/Cube";
import { Overlay } from "@/components/ui/Overlay";
import {
  designStyleLayerModifiers,
  getLayerCount,
} from "@/app/helpers/constants";
import { mapObjects } from "@/app/cube";
import { toggleRingVisibility } from "@/app/helpers/mutateRings";
import { Color, DesignStyle, Limit, ToroidProps } from "@/app/helpers/types";
import { PrintMode } from "@/components/ui/PrintMode";

const Scene = () => {
  const [ringCount, setRingCount] = useState(3);
  const [designStyle, setDesignStyle] = useState<DesignStyle>("offset");
  const [printMode, setPrintMode] = useState(false);

  const [activeColor, setActiveColor] = useState<Color>("#ffffff");
  const [colorSwatches, setColorSwatches] = useState<Color[]>([]);

  const [xLimits, setXLimits] = useState<Limit>([1, 1]);
  const [yLimits, setYLimits] = useState<Limit>([1, 1]);
  const [zLimits, setZLimits] = useState<Limit>([1, 1]);

  const togglePrintMode = () => setPrintMode(!printMode);

  const [rings, setRings] = useState<ToroidProps[]>(
    mapObjects(ringCount, designStyle, [])
  );

  useEffect(() => {
    setRings(mapObjects(ringCount, designStyle, rings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ringCount, designStyle]);

  useEffect(() => {
    const maxLayers = getLayerCount(ringCount, designStyle);
    setXLimits([1, maxLayers]);
    setYLimits([1, maxLayers]);
    setZLimits([1, maxLayers]);
  }, [ringCount, designStyle]);

  useEffect(() => {
    const layerModifier: number = designStyleLayerModifiers[designStyle];
    const adjustedXLimits = [xLimits[0], xLimits[1] + layerModifier];
    const adjustedYLimits = [yLimits[0], yLimits[1] + layerModifier];
    const adjustedZLimits = [zLimits[0], zLimits[1] + layerModifier];
    toggleRingVisibility(
      [adjustedXLimits, adjustedYLimits, adjustedZLimits],
      rings,
      setRings
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xLimits, yLimits, zLimits]);

  return (
    <>
      <Overlay
        enabled={!printMode}
        {...{
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
        }}
      />
      <Canvas>
        {printMode ? (
          <PrintMode {...{ printMode, rings, ringCount, designStyle }} />
        ) : (
          <Cube
            {...{
              activeColor,
              printMode,
              ringCount,
              designStyle,
              rings,
              setRings,
            }}
          />
        )}
        <CameraControls />
        <ambientLight intensity={0.6} />
        <directionalLight color="white" position={[0, 5, 0]} />
        <directionalLight color="white" position={[0, -5, 0]} />
      </Canvas>
    </>
  );
};

export default Scene;
