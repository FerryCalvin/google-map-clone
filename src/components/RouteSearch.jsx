import { useState } from "react";
import { PlacesAutocomplete } from "./PlacesAutocomplete";

const RouteSearch = ({ onRouteSearch, onClearRoute, onClose }) => {
  const [origin, setOrigin] = useState(null);
  const [dest, setDest] = useState(null);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between mb-1">
         <div className="font-semibold text-gray-700">Directions</div>
         <button onClick={onClose} className="text-sm font-bold text-gray-500 hover:text-gray-700">✕ Back</button>
      </div>
      <PlacesAutocomplete 
         setPosition={setOrigin} 
         setSubmittedLocation={setOrigin} 
         placeholder="From" 
      />
      <PlacesAutocomplete 
         setPosition={setDest} 
         setSubmittedLocation={setDest} 
         placeholder="To" 
      />
      <div className="flex gap-2 mt-1">
        <button 
          onClick={() => onRouteSearch(origin, dest)}
          className="bg-[#1FA85C] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#009070] transition-colors flex-1"
        >
          Search Route
        </button>
        <button 
          onClick={onClearRoute}
          className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default RouteSearch;
