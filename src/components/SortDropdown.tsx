"use client";

import { useState, useRef, useEffect } from "react";

export type SortOption = "duration" | "calories" | "rating";

interface SortDropdownProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

const OPTIONS: { label: string; value: SortOption }[] = [
    { label: "Duration", value: "duration" },
    { label: "Calories", value: "calories" },
    { label: "Rating", value: "rating" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel = OPTIONS.find((opt) => opt.value === value)?.label || "Duration";

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center gap-2" ref={dropdownRef}>
            <span className="text-zinc-400 text-xs sm:text-sm font-medium">
                Sort By
            </span>

            <div className="relative">
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    type="button"
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#12131a] border border-white/10 text-xs sm:text-sm font-semibold text-white hover:border-white/20 transition-all"
                >
                    <span>{selectedLabel}</span>
                    <svg
                        className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-[#12131a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                        {OPTIONS.map((opt) => {
                            const isSelected = value === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => {
                                        onChange(opt.value);
                                        setIsOpen(false);
                                    }}
                                    type="button"
                                    className={`w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors ${isSelected
                                            ? "bg-[#ccff00] text-black font-bold"
                                            : "text-zinc-300 font-medium hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}