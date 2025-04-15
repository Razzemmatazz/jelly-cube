import update from "immutability-helper";

const resetLimits = () => {};

export const limitMutations = () => ({
  resetLimits: resetLimits(),
});
