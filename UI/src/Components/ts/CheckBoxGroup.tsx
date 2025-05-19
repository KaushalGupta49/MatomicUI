'use client';
import { useState, createContext, useContext, ReactNode } from 'react';

type CheckboxGroupContextType = {
  selectedValues: string[];
  toggleValue: (value: string) => void;
};

interface CheckboxGroupProps {
  defaultValues?: string[];
  onChange?: (values: string[]) => void;
  children: ReactNode;
  className?: string
}

interface CheckboxItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

const CheckboxGroupContext = createContext<
  CheckboxGroupContextType | undefined
>(undefined);

function useCheckboxGroupContext() {
  const context = useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error(
      'CheckboxGroup components must be used inside <CheckboxGroup />'
    );
  }
  return context;
}

export const CheckboxGroup = ({
  defaultValues = [],
  onChange,
  children,
  className = '',
}: CheckboxGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues);

  const toggleValue = (value: string) => {
    setSelectedValues((prev) => {
      const exists = prev.includes(value);
      const next = exists ? prev.filter((v) => v !== value) : [...prev, value];
      onChange?.(next);
      return next;
    });
  };

  return (
    <CheckboxGroupContext.Provider value={{ selectedValues, toggleValue }}>
      <div className={`flex flex-col gap-2 ${className}`}>{children}</div>
    </CheckboxGroupContext.Provider>
  );
};

export const CheckboxItem = ({
  value,
  children,
  className = '',
}: CheckboxItemProps) => {
  const { selectedValues, toggleValue } = useCheckboxGroupContext();
  const isChecked = selectedValues.includes(value);

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer p-2 rounded border 
        ${
          isChecked ? 'border-green-600 bg-green-50' : 'border-gray-300'
        } ${className}`}
    >
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={() => toggleValue(value)}
        className="accent-green-600"
      />
      {children}
    </label>
  );
};
