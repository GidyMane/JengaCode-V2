"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventFilters as EventFiltersType, EventCategory } from "@/types/event";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

interface EventFiltersProps {
  filters: EventFiltersType;
  onFiltersChange: (filters: EventFiltersType) => void;
  totalEvents: number;
  filteredCount: number;
}

export function EventFilters({
  filters,
  onFiltersChange,
  totalEvents,
  filteredCount,
}: EventFiltersProps) {
  const categories: { value: EventCategory | "all"; label: string }[] = [
    { value: "all", label: "All Events" },
    { value: "workshop", label: "Workshops" },
    { value: "camp", label: "Camps" },
    { value: "competition", label: "Competitions" },
    { value: "showcase", label: "Showcases" },
    { value: "community", label: "Community Events" },
  ];

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "title", label: "Title" },
    { value: "featured", label: "Featured" },
  ];

  const handleFilterChange = (key: keyof EventFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: "all",
      sortBy: "date",
      sortOrder: "desc",
      searchTerm: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8"
    >
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search events, activities, or descriptions..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          className="pl-10 pr-4 py-3 text-lg border-slate-200 focus:border-jengacode-cyan focus:ring-jengacode-cyan"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 whitespace-nowrap">
              Sort by:
            </span>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleFilterChange(
                "sortOrder",
                filters.sortOrder === "asc" ? "desc" : "asc",
              )
            }
            className="flex items-center gap-2"
          >
            {filters.sortOrder === "asc" ? (
              <SortAsc className="w-4 h-4" />
            ) : (
              <SortDesc className="w-4 h-4" />
            )}
            {filters.sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </div>

        {/* Results Count & Clear Filters */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredCount} of {totalEvents} events
          </span>
          {(filters.searchTerm ||
            filters.category !== "all" ||
            filters.sortBy !== "date" ||
            filters.sortOrder !== "desc") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-jengacode-purple hover:text-jengacode-purple-light"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.category !== "all" || filters.searchTerm) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.category !== "all" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-jengacode-purple/10 text-jengacode-purple px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              Category:{" "}
              {categories.find((c) => c.value === filters.category)?.label}
              <button
                onClick={() => handleFilterChange("category", "all")}
                className="text-jengacode-purple hover:text-jengacode-purple-light"
              >
                ×
              </button>
            </motion.div>
          )}
          {filters.searchTerm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-jengacode-cyan/10 text-jengacode-cyan px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              Search: "{filters.searchTerm}"
              <button
                onClick={() => handleFilterChange("searchTerm", "")}
                className="text-jengacode-cyan hover:text-jengacode-cyan-light"
              >
                ×
              </button>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}
