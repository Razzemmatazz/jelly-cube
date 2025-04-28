import { DesignStyle, ToroidProps } from "@/app/helpers/types";
import {
  getLayerCount,
  printModeZoomLevels,
  toroid,
} from "@/app/helpers/constants";
import { OrthographicCamera, Text3D } from "@react-three/drei";
import { ReactElement } from "react";
import { degToRad } from "three/src/math/MathUtils.js";

const Toroid = ({
  props,
  spacing,
  columns,
  designStyle,
  offset,
}: {
  props: ToroidProps;
  spacing: number;
  columns: number;
  offset: number;
  designStyle: DesignStyle;
}) => {
  const yModifier = designStyle === "symmetrical" ? 0 : -1;
  const xModifier =
    -Math.floor((props.coords.y + yModifier) / columns) * spacing;
  const zModifier = ((props.coords.y + yModifier) % columns) * spacing;
  return (
    <mesh
      {...props}
      position={[
        props.position[0] + xModifier,
        0,
        props.position[2] + zModifier + offset,
      ]}
      onClick={(event) => {
        event.stopPropagation();
        console.log(props.coords);
      }}
    >
      <torusGeometry
        args={[
          toroid.innerDiameter / 2 + toroid.tubeDiameter / 2,
          toroid.tubeDiameter / 2,
          40,
          60,
        ]}
      />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
};

const ThreeText = ({ columns, maxLayers, spacing, textOffset }) => {
  const elements: ReactElement[] = [];
  for (let x = 0; x < maxLayers; x++) {
    const xModifier = -Math.floor(x / columns) * spacing;
    const zModifier = (x % columns) * spacing - (columns / 2) * spacing;
    elements.push(
      <Text3D
        key={`${x}-printlabel`}
        font="/Cal_Sans_Regular.json"
        bevelEnabled
        bevelThickness={0.02}
        scale={5}
        position={[xModifier, 0, zModifier + textOffset]}
        rotation={[degToRad(-90), 0, degToRad(-90)]}
      >
        {x + 1}
        <meshStandardMaterial color={"#888888"} />
      </Text3D>
    );
  }
  return elements;
};
interface PrintModeProps {
  rings: ToroidProps[];
  ringCount: number;
  designStyle: DesignStyle;
}

export const PrintMode = ({
  rings,
  ringCount,
  designStyle,
}: PrintModeProps) => {
  const maxLayers = getLayerCount(ringCount, designStyle);
  const colCount = Math.ceil(Math.sqrt(maxLayers));
  const toroidOD = toroid.innerDiameter + 2 * toroid.tubeDiameter;
  const spacing =
    (maxLayers / 2) * toroidOD +
    (maxLayers / 2) * toroid.tubeDiameter +
    2.5 * toroidOD;

  const offset = (colCount / 2) * -spacing;
  return (
    <>
      <OrthographicCamera
        near={1}
        far={1000}
        zoom={printModeZoomLevels[colCount]}
        position={[-1, 100, 0]}
        makeDefault
      />
      {rings.map((props) => {
        return props.visible ? (
          <Toroid
            key={props.position.toString()}
            props={props}
            spacing={spacing}
            columns={colCount}
            {...{ designStyle, offset }}
          />
        ) : null;
      })}
      <ThreeText
        columns={colCount}
        textOffset={-10 * toroid.tubeDiameter}
        {...{ maxLayers, spacing }}
      />
    </>
  );
};
