"use client";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls, PivotControls } from "@react-three/drei";
import Cube from "@/components/ui/Cube";
import { Overlay } from "@/components/ui/Overlay";
import { getLayerCount, toroid } from "@/app/helpers/constants";
import { mapObjects } from "@/app/cube";
import { toggleRingVisibility } from "@/app/helpers/mutateRings";
import { Color, DesignStyle, Limit, ToroidProps } from "@/app/helpers/types";

const Scene = () => {
  const [ringCount, setRingCount] = useState(3);
  const [designStyle, setDesignStyle] = useState<DesignStyle>("offset");

  const [activeColor, setActiveColor] = useState<Color>("#ffffff");
  const [colorSwatches, setColorSwatches] = useState<Color[]>([]);

  const [xLimits, setXLimits] = useState<Limit>([1, 1]);
  const [yLimits, setYLimits] = useState<Limit>([1, 1]);
  const [zLimits, setZLimits] = useState<Limit>([1, 1]);

  const [rings, setRings] = useState<ToroidProps[]>(
    mapObjects(ringCount, designStyle)
  );

  useEffect(() => {
    setRings(mapObjects(ringCount, designStyle));
  }, [ringCount, designStyle]);

  useEffect(() => {
    const maxLayers = getLayerCount(ringCount, designStyle);
    setXLimits([1, maxLayers]);
    setYLimits([1, maxLayers]);
    setZLimits([1, maxLayers]);
  }, [ringCount, designStyle]);

  useEffect(() => {
    toggleRingVisibility([xLimits, yLimits, zLimits], rings, setRings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xLimits, yLimits, zLimits]);

  return (
    <>
      <Overlay
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
        }}
      />
      <Canvas
        camera={{
          position: [
            -toroid.cubeSize - 20,
            toroid.cubeSize + 20,
            -toroid.cubeSize - 10,
          ],
          near: 1,
          far: 1000,
          zoom: 1.5,
        }}
      >
        <PivotControls anchor={[-1.1, -1.1, -1.1]} scale={3} lineWidth={3.5}>
          <Cube {...{ activeColor, rings, setRings }} />
        </PivotControls>
        <CameraControls />
        <ambientLight intensity={0.6} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <directionalLight color="white" position={[0, 0, -5]} />
      </Canvas>
    </>
  );
};

export default Scene;
