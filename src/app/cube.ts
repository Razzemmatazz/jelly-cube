import { degToRad } from "three/src/math/MathUtils.js";
import { getLayerBounds, toroid } from "@/app/helpers/constants";
import { DesignStyle, ToroidProps } from "./helpers/types";

function mapSymmetrical(props: ToroidProps, x: number, y: number, z: number) {
  const ninetyDegrees = degToRad(90);
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
  designStyle: DesignStyle,
  rings: ToroidProps[]
) {
  const objects: ToroidProps[] = [];
  const [lowerBound, upperBound] = getLayerBounds(count);
  for (let x = lowerBound; x < upperBound; x++) {
    for (let y = lowerBound; y < upperBound; y++) {
      for (let z = lowerBound; z < upperBound; z++) {
        const oldRing = rings.length
          ? rings.find(
              (ring) =>
                ring.coords.x === x &&
                ring.coords.y === y &&
                ring.coords.z === z
            )
          : null;
        const toroidProps: ToroidProps = {
          index: objects.length,
          color: oldRing?.color || toroid.color,
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
          visible: true,
        };

        if (
          designStyle === "minimal" &&
          (y === 0 ||
            y === upperBound - 1 ||
            z >= upperBound - 2 ||
            x >= upperBound - 2)
        )
          continue;

        if (
          designStyle === "offset" &&
          (y === 0 || z === upperBound - 1 || x === upperBound - 1)
        )
          continue;

        if (
          (y % 2 === 0 && x % 2 === 0 && z % 2 === 0) ||
          (y % 2 === 1 && x % 2 === 1 && z % 2 === 1)
        )
          continue;

        objects.push(mapSymmetrical(toroidProps, x, y, z));
      }
    }
  }
  return objects;
}
