import update from "immutability-helper";
import { toroid } from "@/app/helpers/constants";

export const changeColor = (color, index, rings, setRings) => {
  const newRingsArr = update(rings, {
    [index]: {
      color: {
        $set: color,
      },
    },
  });
  setRings(newRingsArr);
};

export const toggleRingVisibility = (limits, rings, setRings) => {
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

export const resetColors = (rings, setRings) => {
  const newRingsArr = [...rings];
  newRingsArr.forEach((ring) => {
    ring.color = toroid.color;
  });
  setRings(newRingsArr);
};

export const resetVisibility = (rings, setRings) => {
  const newRingsArr = [...rings];
  newRingsArr.forEach((ring) => {
    ring.visible = true;
  });
  setRings(newRingsArr);
};

export const importJSONToObjects = async (event, setRings) => {
  return new Promise<void>(async (res) => {
    const uploadFile = event.files[0];
    const text = await new Response(uploadFile).text();
    const data = JSON.parse(text);
    setRings(data);
    res();
  });
};

export const exportRingsToJSON = (rings) => {
  const json = JSON.stringify(rings);
  const blob = new Blob([json], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = `jelly-cube-${new Date().getTime()}.json`;
  link.href = url;
  link.click();
};
