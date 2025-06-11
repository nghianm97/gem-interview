import React, { useEffect, useState } from "react";
import Tooltip from "./tooltip";
import clsx from "clsx";
import { parseInput } from "../../utils/parseInput";

type Props = {
  value: string;
  onChange: (val: string) => void;
  min: number;
  max: number;
  displayTooltip?: boolean;
  className?: string
  floatNumber?: number
  resetValue?: boolean
  setResetValue?: (value: boolean) => void
};

export default function InputNumber({ value, onChange, className, max, min, displayTooltip = false, floatNumber = 1, resetValue = false, setResetValue }: Props) {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState("center")
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [hoveringInput, setHoveringInput] = useState(false);
  const [hoveringButton, setHoveringButton] = useState("");

  useEffect(() => {
    if (resetValue) {
      setInputValue(value.toString());
      setResetValue?.(false);
      return;
    }

    parseInputData(value);
    setInputValue(value.toString());
  }, [value, resetValue]);

  const parseInputData = (val: string) => {
    const finalValue = parseInput(val);
    if (finalValue <= min) {
      setTooltipMessage(`Value must be greater than ${min}`);
      setTooltipPosition("left");
      setShowTooltip(true);
    } else if (finalValue >= max) {
      setTooltipMessage(`Value must be smaller than ${max}`);
      setTooltipPosition("right");
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
    return finalValue;
  };

  const handleBlur = () => {
    const parsed = parseInputData(inputValue) ?? min;
    onChange(parsed.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  function toFloatByPower(n: number): number {
    return Math.pow(0.1, n);
  }

  const increment = () => {
    const newVal = parseFloat(Number(value).toFixed(floatNumber)) + toFloatByPower(floatNumber);
    const rounded = parseFloat(Number(newVal).toFixed(floatNumber));

    if (Number(newVal) >= max) {
      setTooltipMessage(`Value must be smaller than ${max}`);
      setTooltipPosition("right");
      setShowTooltip(true)
      if (Number(newVal) === max) {
        onChange(rounded.toString());
      }
      return
    }
    setShowTooltip(false)
    onChange(rounded.toString());
  };

  const decrement = () => {
    const newVal = parseFloat(Number(value).toFixed(floatNumber)) - toFloatByPower(floatNumber);
    const rounded = parseFloat(newVal.toFixed(floatNumber));

    if (newVal <= min) {
      setTooltipMessage(`Value must be greater than ${min}`);
      setTooltipPosition("left");
      setShowTooltip(true)
      if (newVal === min) {
        onChange(rounded.toString());
      }
      return
    }
    setShowTooltip(false)
    onChange(rounded.toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className={clsx(` flex items-center rounded-md h-[44px]`, hoveringInput ? "bg-hover-button" : "bg-secondary")}>
      <Tooltip
        visible={displayTooltip && showTooltip && tooltipPosition === "left" && hoveringButton === "decrement"}
        message={tooltipMessage}
        className="w-fit"
      >
        <button
          className={`relative px-4 py-3 hover:bg-hover-button hover:rounded-tl-md rounded-bl-md ${Number(value) <= min ? "opacity-50" : "cursor-pointer"}`}
          onClick={decrement}
          onMouseEnter={() => setHoveringButton("decrement")}
          onMouseLeave={() => setHoveringButton("")}
        >
          –
        </button>
      </Tooltip>
      <span className="px-[10px] group-hover:bg-red-100">
        <input
          className={clsx(`text-center bg-transparent outline-none`, className)}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          maxLength={max.toString().length + floatNumber + 1}
          onMouseEnter={() => setHoveringInput(true)}
          onMouseLeave={() => setHoveringInput(false)}
        />
      </span>
      <Tooltip
        visible={displayTooltip && showTooltip && tooltipPosition === "right" && hoveringButton === "increment"}
        message={tooltipMessage}
      >
        <button
          className={`relative px-4 py-3 hover:bg-hover-button hover:rounded-tr-md rounded-br-md ${Number(value) >= max ? "opacity-50" : "cursor-pointer"}`}
          onClick={increment}
          onMouseEnter={() => setHoveringButton("increment")}
          onMouseLeave={() => setHoveringButton("")}
        >
          +
        </button>
      </Tooltip>
    </div>
  );
}
