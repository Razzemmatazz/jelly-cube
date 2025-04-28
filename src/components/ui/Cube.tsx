import { Dispatch, SetStateAction, useRef, useState } from "react";
import { getLayerCount, toroid } from "@/app/helpers/constants";
import { changeColor } from "@/app/helpers/mutateRings";
import { DesignStyle, ToroidProps } from "@/app/helpers/types";
import { PerspectiveCamera } from "@react-three/drei";

const Toroid = ({
  props,
  updateColor,
}: {
  props: ToroidProps;
  updateColor: (arg0: number) => void;
}) => {
  const ref = useRef(null);
  const [hovered, hover] = useState(false);

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => {
        event.stopPropagation();
        updateColor(props.index);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        hover(true);
      }}
      onPointerOut={() => hover(false)}
    >
      <torusGeometry
        args={[
          toroid.innerDiameter / 2 + toroid.tubeDiameter / 2,
          toroid.tubeDiameter / 2,
          40,
          60,
        ]}
      />
      <meshStandardMaterial color={hovered ? "lightblue" : props.color} />
    </mesh>
  );
};

interface CubeProps {
  activeColor: string;
  designStyle: DesignStyle;
  ringCount: number;
  rings: ToroidProps[];
  setRings: Dispatch<SetStateAction<ToroidProps[]>>;
}

const Cube = ({
  activeColor,
  designStyle,
  ringCount,
  rings,
  setRings,
}: CubeProps) => {
  const updateColor = (index: number) => {
    changeColor(activeColor, index, rings, setRings);
  };
  const maxLayers = getLayerCount(ringCount, designStyle);
  const cubeSize =
    (maxLayers / 2) * toroid.outerDiameter +
    (maxLayers / 2) * toroid.tubeDiameter;
  return (
    <>
      <PerspectiveCamera
        near={1}
        far={1000}
        zoom={0.7}
        position={[-cubeSize - 10, cubeSize + 30, -cubeSize]}
        makeDefault
      />
      {rings.map((props) => {
        return props.visible ? (
          <Toroid
            key={props.position.toString()}
            props={props}
            {...{ updateColor }}
          />
        ) : null;
      })}
    </>
  );
};

export default Cube;
