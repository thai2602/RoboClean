"use client";

import * as React from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionItem = ({ title, children, isOpen, onToggle }: AccordionItemProps) => {
  return (
    <div className="border-b border-border py-4 transition-all duration-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left py-2 font-medium text-lg text-text-primary hover:text-brand-primary transition-colors focus:outline-none"
      >
        <span>{title}</span>
        <span className={`transform transition-transform duration-300 text-text-secondary ${isOpen ? "rotate-180" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="text-text-secondary leading-relaxed pb-4 pr-6 text-base">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: {
    title: string;
    content: string;
  }[];
}

export const Accordion = ({ items }: AccordionProps) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          isOpen={openIndex === idx}
          onToggle={() => handleToggle(idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
