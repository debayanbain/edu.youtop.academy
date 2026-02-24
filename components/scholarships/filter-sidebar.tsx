import React from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
    title: string;
    items: string[];
    selectedItems: string[];
    onToggleItem: (item: string) => void;
    isOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    title,
    items,
    selectedItems,
    onToggleItem,
    isOpen = false
}) => {
    const [open, setOpen] = React.useState(isOpen);

    return (
        <div className="border-b-2 border-brutal-black last:border-b-0">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-nb-bg transition-colors group"
            >
                <span className="font-black uppercase text-xs tracking-wider">{title}</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", open ? "rotate-180" : "")} />
            </button>

            {open && (
                <div className="p-4 pt-0 space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                    {items.map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item)}
                                    onChange={() => onToggleItem(item)}
                                    className="peer appearance-none w-5 h-5 border-2 border-brutal-black rounded-sm checked:bg-brutal-yellow transition-all"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none">
                                    <div className="w-2 h-2 bg-brutal-black" />
                                </div>
                            </div>
                            <span className="text-sm font-bold group-hover:text-brutal-purple transition-colors">{item}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

interface FilterSidebarProps {
    className?: string;
    onClose?: () => void;
    filters: {
        types: string[];
        states: string[];
        classes: string[];
    };
    onFilterChange: (category: "types" | "states" | "classes", item: string) => void;
    onReset: () => void;
}

export const FilterSidebar = ({
    className,
    onClose,
    filters,
    onFilterChange,
    onReset
}: FilterSidebarProps) => {
    return (
        <div className={cn("bg-white border-2 border-brutal-black shadow-[4px_4px_0_0_#000] flex flex-col h-full", className)}>
            <div className="p-4 bg-brutal-black text-white flex justify-between items-center shrink-0">
                <h2 className="font-black uppercase tracking-tighter flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filters
                </h2>
                {onClose && (
                    <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-sm">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto">
                <FilterSection
                    title="Scholarship Type"
                    isOpen
                    items={["State", "National", "Private"]}
                    selectedItems={filters.types}
                    onToggleItem={(item) => onFilterChange("types", item)}
                />
                <FilterSection
                    title="State"
                    isOpen={filters.types.includes("State")}
                    items={["West Bengal", "Other"]}
                    selectedItems={filters.states}
                    onToggleItem={(item) => onFilterChange("states", item)}
                />
                <FilterSection
                    title="Select Class"
                    items={["Upto Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "Graduation", "Post Graduation", "PhD"]}
                    selectedItems={filters.classes}
                    onToggleItem={(item) => onFilterChange("classes", item)}
                />
                {/* Other sections omitted for brevity or added as placeholders */}
                <div className="p-4 bg-nb-bg/30 text-[10px] font-bold text-muted-foreground uppercase italic">
                    More filters coming soon...
                </div>
            </div>

            <div className="p-4 border-t-2 border-brutal-black bg-nb-bg flex gap-2 shrink-0">
                <button
                    onClick={onReset}
                    className="btn-brutal btn-brutal-sm btn-brutal-outline flex-1"
                >
                    Reset
                </button>
                <button
                    onClick={onClose}
                    className="btn-brutal btn-brutal-sm btn-brutal-purple flex-1 lg:hidden"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};
