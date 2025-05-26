import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface AutoCompleteProps {
  list: string[];
  onSelect?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  list,
  onSelect,
  placeholder = 'Type to search...',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFiltered(
      list.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    );
    setShowDropdown(true);
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    setShowDropdown(false);
    onSelect?.(value);
  };

  return (
    <div
      className={twMerge(clsx('relative w-full', className))}
      ref={wrapperRef}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showDropdown && filtered.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {filtered.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
