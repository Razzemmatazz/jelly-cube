import { Dispatch, SetStateAction, useRef, useState } from "react";
import { toroid } from "@/app/helpers/constants";
import { changeColor } from "@/app/helpers/mutateRings";
import { ToroidProps } from "@/app/helpers/types";

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
  rings: ToroidProps[];
  setRings: Dispatch<SetStateAction<ToroidProps[]>>;
}

const Cube = ({ activeColor, rings, setRings }: CubeProps) => {
  const updateColor = (index: number) => {
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
