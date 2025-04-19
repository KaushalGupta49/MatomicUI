"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  ReactElement,
  useId,
} from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type AccordionContextType = {
  openItems: string[];
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("Accordion components must be used within <Accordion />");
  return context;
}

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

export default function Accordion({
  children,
  allowMultiple = false,
  defaultOpenIds = [],
  className = "",
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenIds);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const isOpen = prev.includes(id);
      if (allowMultiple) {
        return isOpen ? prev.filter((i) => i !== id) : [...prev, id];
      } else {
        return isOpen ? [] : [id];
      }
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  children: ReactNode;
  id?: string;
}

export const AccordionItem = ({ children, id }: AccordionItemProps) => {
  const generatedId = useId();
  const itemId = id || generatedId;
  const { openItems, toggleItem } = useAccordionContext();
  const isOpen = openItems.includes(itemId);

  return (
    <div className="border-b border-gray-200">
      {React.Children.map(children, (child) =>
        typeof child === "object" && React.isValidElement(child)
          ? React.cloneElement(child as ReactElement<any>, {
              isOpen,
              toggle: () => toggleItem(itemId),
            })
          : child
      )}
    </div>
  );
};

interface AccordionHeaderProps {
  children: ReactNode;
  isOpen?: boolean;
  toggle?: () => void;
}

export const AccordionHeader = ({
  children,
  isOpen,
  toggle,
}: AccordionHeaderProps) => {
  return (
    <button
      onClick={toggle}
      className="w-full flex justify-between items-center py-4 text-left font-medium text-lg focus:outline-none"
    >
      {children}
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );
};

interface AccordionContentProps {
  children: ReactNode;
  isOpen?: boolean;
}

export const AccordionContent = ({
  children,
  isOpen,
}: AccordionContentProps) => {
  return isOpen ? <div className="pb-4 text-gray-600">{children}</div> : null;
};
