import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import { FaBars, FaDirections } from "react-icons/fa";
import Items from "./Items";
import Menu from "./Menu";
import { PlacesAutocomplete } from "./PlacesAutocomplete";
import RouteSearch from "./RouteSearch";

// Komponen helper untuk menggerakkan peta saat posisi berubah
function MapUpdater({ position }) {
  const map = useMap();
  React.useEffect(() => {
    if (position) map.flyTo(position, map.getZoom());
  }, [position, map]);
  return null;
}

const Map = () => {
  const defaultPosition = [-6.175419010382158, 106.82721258993489];
  const [position, setPosition] = useState(defaultPosition);
  const [submittedLocation, setSubmittedLocation] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [poiMarkers, setPoiMarkers] = useState([]);

  // Routing states
  const [directionsMode, setDirectionsMode] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeOrigin, setRouteOrigin] = useState(null);
  const [routeDest, setRouteDest] = useState(null);

  const handleLocationSubmit = (newPosition) => {
    setPosition(newPosition);
    setSubmittedLocation(newPosition);
  };

  const fetchRoute = async (origin, dest) => {
    if (!origin || !dest) return;
    setRouteOrigin(origin);
    setRouteDest(dest);
    try {
      const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${dest[1]},${dest[0]}?overview=full&geometries=geojson`);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
        setRouteCoords(coords);
        setRouteInfo({
          distance: (route.distance / 1000).toFixed(1),
          duration: Math.round(route.duration / 60)
        });
        setPosition(origin);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const clearRoute = () => {
    setRouteCoords([]);
    setRouteInfo(null);
    setRouteOrigin(null);
    setRouteDest(null);
  };

  const handleCategorySearch = async (category) => {
    const categoryTags = {
      Restaurants: "amenity=restaurant",
      Hotels: "tourism=hotel",
      Museums: "tourism=museum",
      Pharmacies: "amenity=pharmacy",
      ATMs: "amenity=atm",
      Transit: "public_transport=station",
      "Things to do": "tourism=attraction",
    };

    const tag = categoryTags[category];
    if (!tag) return;

    const [lat, lon] = position;
    const query = `
      [out:json][timeout:25];
      (
        node["${tag}"](around:2000,${lat},${lon});
        way["${tag}"](around:2000,${lat},${lon});
      );
      out center;
    `;

    try {
      const response = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          body: query,
        }
      );
      const data = await response.json();

      const markers = data.elements.map((element) => {
        if (element.type === "node") {
          return {
            id: element.id,
            position: [element.lat, element.lon],
            name: element.tags?.name || category,
          };
        } else if (element.type === "way" && element.center) {
          return {
            id: element.id,
            position: [element.center.lat, element.center.lon],
            name: element.tags?.name || category,
          };
        }
        return null;
      }).filter(Boolean);

      setPoiMarkers(markers);
    } catch (error) {
      console.error("Error fetching POI data:", error);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Search Bar Area */}
      <div
        className={`absolute z-[1000] top-3 left-4 md:left-[200px] bg-white shadow-md flex items-center gap-2 ${directionsMode ? 'p-3 rounded-2xl w-[320px] md:w-[360px]' : 'p-2 rounded-full w-[calc(100%-32px)] max-w-[340px]'}`}
        style={{
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          transition: "all 0.3s",
        }}
      >
        {!directionsMode ? (
          <>
            <FaBars
              style={{ cursor: "pointer", marginLeft: 8, flexShrink: 0 }}
              onClick={() => setOpenMenu(true)}
              className="text-gray-600 hover:text-black"
            />
            <div className="flex-1">
              <PlacesAutocomplete
                setPosition={setPosition}
                setSubmittedLocation={setSubmittedLocation}
              />
            </div>
            <button 
              onClick={() => setDirectionsMode(true)}
              className="p-2 text-[#1FA85C] hover:bg-green-50 rounded-full transition-colors flex-shrink-0"
              title="Directions"
            >
              <FaDirections size={20} />
            </button>
          </>
        ) : (
          <RouteSearch 
            onRouteSearch={fetchRoute}
            onClearRoute={clearRoute}
            onClose={() => { setDirectionsMode(false); clearRoute(); }}
          />
        )}
      </div>

      {/* Category Items */}
      <Items onCategorySearch={handleCategorySearch} />

      {/* Sidebar Menu */}
      <Menu
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        onLocationSubmit={handleLocationSubmit}
        onDirectionsClick={() => setDirectionsMode(true)}
      />

      {/* Route Info Panel */}
      {routeInfo && (
        <div className="absolute z-[1000] bottom-8 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border border-green-100 flex gap-4 text-sm font-medium text-gray-800">
           <div><span className="text-[#1FA85C]">Distance:</span> {routeInfo.distance} km</div>
           <div><span className="text-[#1FA85C]">ETA:</span> {routeInfo.duration} mins</div>
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={defaultPosition}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater position={position} />
        {submittedLocation && !directionsMode && (
          <Marker position={submittedLocation}>
            <Popup>Selected Location</Popup>
          </Marker>
        )}
        {poiMarkers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="#1FA85C" weight={5} opacity={0.8} />
        )}
        {directionsMode && routeOrigin && (
          <Marker position={routeOrigin}>
             <Popup>Origin</Popup>
          </Marker>
        )}
        {directionsMode && routeDest && (
          <Marker position={routeDest}>
             <Popup>Destination</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
