/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

export const PlacesAutocomplete = ({ setPosition, setSubmittedLocation, placeholder }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced search
  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            value
          )}&limit=5&addressdetails=1`
        );
        const data = await response.json();
        setSuggestions(data);
        setIsOpen(data.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = async (suggestion) => {
    const { display_name, lat, lon } = suggestion;
    setValue(display_name);
    setIsOpen(false);
    
    const newPosition = [parseFloat(lat), parseFloat(lon)];
    setPosition(newPosition);
    setSubmittedLocation(newPosition);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div ref={wrapperRef} className="relative w-[260px]">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          className="w-full py-2 px-2 text-sm outline-none"
          placeholder={placeholder || "Search on OpenStreetMap"}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-[#1FA85C] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[10000] max-h-[300px] overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.place_id}-${index}`}
              onClick={() => handleSelect(suggestion)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-green-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="font-medium text-gray-800 truncate">
                {suggestion.display_name}
              </div>
              {suggestion.address && (
                <div className="text-xs text-gray-500 mt-0.5 truncate">
                  {[
                    suggestion.address.city,
                    suggestion.address.state,
                    suggestion.address.country
                  ].filter(Boolean).join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
