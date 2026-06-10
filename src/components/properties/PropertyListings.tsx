"use client";

import { useState, useMemo } from "react";
import { FiSearch, FiSliders } from "react-icons/fi";
import PropertyCard from "./PropertyCard";
import { PRICE_RANGES, LOCATIONS } from "@/lib/constants";
import { loadProperties } from "@/lib/properties";

export default function PropertyListings() {
  const [allProperties] = useState(() => loadProperties());
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.location.toLowerCase().includes(q)
        )
          return false;
      }
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (locationFilter !== "all" && p.location !== locationFilter)
        return false;
      if (priceFilter !== "all") {
        const [min, max] = priceFilter.split("-").map(Number);
        if (p.price < min || p.price > max) return false;
      }
      return true;
    });
  }, [search, typeFilter, priceFilter, locationFilter, allProperties]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
            Our Properties
          </h1>
          <p className="text-gray-400">
            Discover luxury properties across Dubai&apos;s most prestigious
            locations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-card border border-card-border rounded-sm pl-12 pr-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </form>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-3.5 bg-card border border-card-border rounded-sm text-gray-300 hover:text-gold hover:border-gold/30 transition-all"
          >
            <FiSliders className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-5 bg-card border border-card-border rounded-sm">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
              >
                <option value="all">All Types</option>
                <option value="buy">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                Price Range
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
              >
                {PRICE_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                Location
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
              >
                {LOCATIONS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No properties found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSearchInput("");
                setTypeFilter("all");
                setPriceFilter("all");
                setLocationFilter("all");
              }}
              className="mt-4 text-gold hover:underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
