import { MIN_INPUT_NUMBER } from "../constants/constants";

export const parseInput = (val: string, min = MIN_INPUT_NUMBER, floatNumber = 1) => {
  const strVal = val.replace(",", ".");
  const match = strVal.match(/-?\d+(\.\d+)?/);
  const data = match ? Number(match[0]) : min;

  const finalValue = parseFloat(data.toFixed(floatNumber));
  return finalValue;
};
