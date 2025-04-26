import update from "immutability-helper";
import { toroid } from "@/app/helpers/constants";
import { Limits, ToroidProps } from "@/app/helpers/types";
import { FileUploadFileAcceptDetails } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

export const changeColor = (
  color: string,
  index: number,
  rings: ToroidProps[],
  setRings: Dispatch<SetStateAction<ToroidProps[]>>
) => {
  const newRingsArr = update(rings, {
    [index]: {
      color: {
        $set: color,
      },
    },
  });
  setRings(newRingsArr);
};

export const toggleRingVisibility = (
  limits: Limits,
  rings: ToroidProps[],
  setRings: Dispatch<SetStateAction<ToroidProps[]>>
) => {
  const [xLimits, yLimits, zLimits] = limits;
  const newRingsArr = [...rings];
  newRingsArr.forEach((ring) => {
    if (
      ring.coords.x < xLimits[0] - 1 ||
      ring.coords.x > xLimits[1] - 1 ||
      ring.coords.y < yLimits[0] - 1 ||
      ring.coords.y > yLimits[1] - 1 ||
      ring.coords.z < zLimits[0] - 1 ||
      ring.coords.z > zLimits[1] - 1
    ) {
      ring.visible = false;
    } else {
      ring.visible = true;
    }
  });
  setRings(newRingsArr);
};

export const resetColors = (
  rings: ToroidProps[],
  setRings: Dispatch<SetStateAction<ToroidProps[]>>
) => {
  const newRingsArr = [...rings];
  newRingsArr.forEach((ring) => {
    ring.color = toroid.color;
  });
  setRings(newRingsArr);
};

export const resetVisibility = (
  rings: ToroidProps[],
  setRings: Dispatch<SetStateAction<ToroidProps[]>>
) => {
  const newRingsArr = [...rings];
  newRingsArr.forEach((ring) => {
    ring.visible = true;
  });
  setRings(newRingsArr);
};

export const importJSONToObjects = async (
  event: FileUploadFileAcceptDetails,
  setRings: Dispatch<SetStateAction<ToroidProps[]>>
) => {
  return new Promise<void>(async (res) => {
    const uploadFile = event.files[0];
    const text = await new Response(uploadFile).text();
    const data = JSON.parse(text);
    setRings(data);
    res();
  });
};

export const exportRingsToJSON = (rings: ToroidProps[]) => {
  const json = JSON.stringify(rings);
  const blob = new Blob([json], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = `jelly-cube-${new Date().getTime()}.json`;
  link.href = url;
  link.click();
};
