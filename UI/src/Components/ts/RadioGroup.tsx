'use client';
import { useState, createContext, useContext, ReactNode } from 'react';

type RadioGroupContextType = {
  selected: string;
  setSelected: (value: string) => void;
  name: string;
};

interface RadioGroupProps {
  value?: string;
  onChange?: (val: string) => void;
  name: string;
  children: ReactNode;
  className?: string;
}

interface RadioItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
  undefined
);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroup components must be used inside <RadioGroup />');
  }
  return context;
}

export const RadioGroup = ({
  value,
  onChange,
  name,
  children,
  className = '',
}: RadioGroupProps) => {
  const [selected, setSelectedState] = useState(value || '');

  const setSelected = (val: string) => {
    setSelectedState(val);
    onChange?.(val);
  };

  return (
    <RadioGroupContext.Provider value={{ selected, setSelected, name }}>
      <div className={`flex flex-col gap-2 ${className}`}>{children}</div>
    </RadioGroupContext.Provider>
  );
};

export const RadioItem = ({
  value,
  children,
  className = '',
}: RadioItemProps) => {
  const { selected, setSelected, name } = useRadioGroupContext();
  const isChecked = selected === value;

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer p-2 rounded border ${
        isChecked ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
      } ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => setSelected(value)}
        className="accent-blue-600"
      />
      {children}
    </label>
  );
};
