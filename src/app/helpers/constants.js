export const toroid = {
  color: "#aaaaaa",
  innerDiameter: 2.6,
  tubeDiameter: 1,
  cubeSize: 15.8,
};

const designLayerModifier = {
  minimal: -1,
  offset: 0,
  symmetrical: 1,
};

export const getLayerCount = (count, designStyle) => {
  return count * 2 + designLayerModifier[designStyle];
};
