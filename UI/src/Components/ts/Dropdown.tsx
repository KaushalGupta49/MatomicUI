'use client';
import React from 'react';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
  ReactElement,
  cloneElement,
  isValidElement,
} from 'react';

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown.* components must be used within <Dropdown />');
  }
  return context;
}

interface DropdownProps {
  children: ReactNode;
  className?: string;
}

export default function Dropdown({ children, className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={ref} className={`relative inline-block ${className}`}>
        {React.Children.map(children, (child) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<any>, {})
            : child
        )}
      </div>
    </DropdownContext.Provider>
  );
}

// ------------------
// DropdownTrigger Component
// ------------------

interface DropdownTriggerProps {
  children: ReactNode;
}

export const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  const { toggle } = useDropdownContext();

  return (
    <button onClick={toggle} className="bg-gray-100 hover:bg-gray-200">
      {children}
    </button>
  );
};

// ------------------
// DropdownContent Component
// ------------------

interface DropdownContentProps {
  children: ReactNode;
  className?: string;
}

export const DropdownContent = ({
  children,
  className = '',
}: DropdownContentProps) => {
  const { isOpen } = useDropdownContext();

  if (!isOpen) return null;

  return (
    <div className={`flex flex-col bg-white ${className}`}>{children}</div>
  );
};
