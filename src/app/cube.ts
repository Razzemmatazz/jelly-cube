import { degToRad } from "three/src/math/MathUtils.js";
import { getLayerCount, toroid } from "@/app/helpers/constants";

interface ToroidProps {
  index: number;
  color: string;
  coords: {
    x: number;
    y: number;
    z: number;
  };
  position: [number, number, number];
  rotation: [number, number, number];
  visible?: boolean;
}

function mapMinimal(props: ToroidProps, x: number, y: number, z: number) {
  const ninetyDegrees = degToRad(90);
  props.visible = true;
  const isFlatRow = y % 2 === 0;
  const xEven = x % 2 === 0;
  const zEven = z % 2 === 0;
  let xRotation = 0,
    yRotation = 0;
  if (isFlatRow) {
    xRotation = xEven ? ninetyDegrees : 0;
    yRotation = zEven ? 0 : ninetyDegrees;
  } else {
    xRotation = !xEven && !zEven ? ninetyDegrees : 0;
    yRotation = !xEven && zEven ? ninetyDegrees : 0;
  }

  props.rotation = [xRotation, yRotation, 0];
  return props;
}

function mapOffset(props: ToroidProps, x: number, y: number, z: number) {
  const ninetyDegrees = degToRad(90);
  props.visible = true;
  const isFlatRow = y % 2 === 0;
  const xEven = x % 2;
  const zEven = z % 2;
  let xRotation = 0,
    yRotation = 0;
  if (isFlatRow) {
    xRotation = xEven ? ninetyDegrees : 0;
    yRotation = zEven ? 0 : ninetyDegrees;
  } else {
    xRotation = xEven && !zEven ? 0 : ninetyDegrees;
    yRotation = !xEven && zEven ? ninetyDegrees : 0;
  }

  props.rotation = [xRotation, yRotation, 0];
  return props;
}

function mapSymmetrical(props: ToroidProps, x: number, y: number, z: number) {
  const ninetyDegrees = degToRad(90);
  props.visible = true;
  const isFlatRow = y % 2 === 0;
  const xEven = x % 2;
  const zEven = z % 2;
  let xRotation = 0,
    yRotation = 0;
  if (isFlatRow) {
    xRotation = xEven ? ninetyDegrees : 0;
    yRotation = zEven ? 0 : ninetyDegrees;
  } else {
    xRotation = xEven && !zEven ? 0 : ninetyDegrees;
    yRotation = !xEven && zEven ? ninetyDegrees : 0;
  }

  props.rotation = [xRotation, yRotation, 0];
  return props;
}

export function mapObjects(
  count: number,
  designStyle: "minimal" | "offset" | "symmetrical"
) {
  const objects = [];
  const layerLimit = getLayerCount(count, designStyle);
  for (let x = 0; x < layerLimit; x++) {
    for (let y = 0; y < layerLimit; y++) {
      for (let z = 0; z < layerLimit; z++) {
        const toroidProps: ToroidProps = {
          index: objects.length,
          color: toroid.color,
          coords: {
            x,
            y,
            z,
          },
          position: [
            x * toroid.innerDiameter,
            y * toroid.innerDiameter,
            z * toroid.innerDiameter,
          ],
          rotation: [0, 0, 0],
        };
        if (designStyle === "minimal") {
          if (
            (y % 2 === 1 && x % 2 === 0 && z % 2 === 0) ||
            (y % 2 === 0 && x % 2 === 1 && z % 2 === 1)
          )
            continue;
          objects.push(mapMinimal(toroidProps, x, y, z));
        } else if (designStyle === "offset") {
          if (
            (y % 2 === 0 && x % 2 === 0 && z % 2 === 0) ||
            (y % 2 === 1 && x % 2 === 1 && z % 2 === 1)
          )
            continue;
          objects.push(mapOffset(toroidProps, x, y, z));
        } else if (designStyle === "symmetrical") {
          if (
            (y % 2 === 0 && x % 2 === 0 && z % 2 === 0) ||
            (y % 2 === 1 && x % 2 === 1 && z % 2 === 1)
          )
            continue;
          objects.push(mapSymmetrical(toroidProps, x, y, z));
        }
      }
    }
  }
  return objects;
}
