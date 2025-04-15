import { useRef, useState } from "react";
import { toroid } from "@/app/helpers/constants";
import { changeColor } from "@/app/helpers/mutateRings";

interface Object {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  visible: boolean;
}
interface ToroidProps {
  props: Object;
}

const Toroid = ({ props, updateColor }: ToroidProps) => {
  const ref = useRef(null);
  const [hovered, hover] = useState(false);

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => {
        if (!props.visible) {
          return;
        }
        event.stopPropagation();
        updateColor(props.index);
      }}
      onPointerOver={(event) => {
        if (!props.visible) {
          return;
        }
        event.stopPropagation();
        hover(true);
      }}
      onPointerOut={(event) => hover(false)}
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

const Cube = ({ activeColor, rings, setRings }) => {
  const updateColor = (index) => {
    changeColor(activeColor, index, rings, setRings);
  };
  return (
    <>
      {rings.map((props) => {
        return (
          <Toroid
            key={props.position.toString()}
            props={props}
            {...{ updateColor }}
          />
        );
      })}
    </>
  );
};

export default Cube;
