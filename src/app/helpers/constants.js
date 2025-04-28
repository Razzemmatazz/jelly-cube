export const toroid = {
  color: "#aaaaaa",
  outerDiameter: 4.6,
  innerDiameter: 2.6,
  tubeDiameter: 1,
};

export const printModeZoomLevels = {
  2: 12,
  3: 9,
  4: 4.25,
  5: 2.5,
};

const designLayerModifier = {
  minimal: -1,
  offset: 0,
  symmetrical: 1,
};

export const designStyleLayerModifiers = {
  minimal: 1,
  offset: 1,
  symmetrical: 0,
};

export const getLayerCount = (count, designStyle) => {
  return count * 2 + designLayerModifier[designStyle];
};

export const getLayerBounds = (count) => {
  return [0, count * 2 + 1];
};
