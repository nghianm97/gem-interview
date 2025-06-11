import { useEffect, useState } from "react";
import InputNumber from "../components/ui/input"
import { MIN_INPUT_NUMBER, MAX_INPUT_NUMBER_PERCENT, MAX_INPUT_NUMBER_PX } from "../constants/constants"

type unitType = "%" | "px"

export default function Calculator() {
  const [unit, setUnit] = useState<unitType>("%");
  const [value, setValue] = useState("1");
  const [resetValue, setResetValue] = useState(false);

  const toggleUnit = (newUnit: unitType) => {
    setUnit(newUnit);
  }

  const onChange = (val: string) => {
    let numericVal = Number(val);

    if (numericVal < MIN_INPUT_NUMBER) {
      numericVal = MIN_INPUT_NUMBER;
    }

    if (unit === "%") {
      if (numericVal <= MAX_INPUT_NUMBER_PERCENT) {
        const newVal = numericVal.toString();
        if (newVal === value) {
          setResetValue(true);
        } else {
          setValue(newVal);
          setResetValue(false);
        }
      } else {
        setResetValue(true);
      }
    } else if (unit === "px") {
      const clampedVal = Number(val) > MAX_INPUT_NUMBER_PX ? MAX_INPUT_NUMBER_PX.toString() : numericVal
      if(clampedVal.toString() === value) {
        setResetValue(true);
        return
      }
      setValue(clampedVal.toString());
    } else {
      setValue(numericVal.toString());
    }
  };

  useEffect(() => {
    const valueUnit = unit === "%" && Number(value) > MAX_INPUT_NUMBER_PERCENT ? 100 : value
    onChange(valueUnit.toString())
  }, [unit])

  return (
    <div className="bg-primary p-4 rounded-md text-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-color-primary">Unit</span>
        <div className="bg-secondary rounded-md">
          <div className="p-1 flex gap-1">
            <button
              className={`px-7 py-2 ${unit === "%" ? "bg-focus-button color-white" : "text-color-primary"} cursor-pointer hover:bg-hover-button rounded-md`}
              onClick={() => toggleUnit("%")}
            >
              %
            </button>
            <button
              className={`px-7 py-2 ${unit === "px" ? "bg-focus-button color-white" : "text-color-primary"} cursor-pointer hover:bg-hover-button rounded-md`}
              onClick={() => toggleUnit("px")}
            >
              px
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-color-primary">Value</span>
        <InputNumber
          value={value}
          onChange={onChange}
          max={unit === "%" ? MAX_INPUT_NUMBER_PERCENT : MAX_INPUT_NUMBER_PX}
          min={MIN_INPUT_NUMBER}
          displayTooltip={true}
          className="w-12"
          floatNumber={1}
          resetValue={resetValue}
          setResetValue={setResetValue}
        />
      </div>
    </div>
  );
}
