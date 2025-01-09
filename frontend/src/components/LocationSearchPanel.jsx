import { MapPin } from "lucide-react";

const LocationSearchPanel = ({ suggestions, onLocationSelect }) => {
  return (
    <div className="mt-2">
      {suggestions.map((location, index) => (
        <button
          key={index}
          onClick={() => onLocationSelect(location)}
          className="w-full text-left p-3 hover:bg-gray-50 flex items-center gap-3"
        >
          <MapPin size={20} className="text-gray-500 flex-shrink-0" />
          <div>
            <p className="font-medium">{location}</p>
            <p className="text-sm text-gray-500">Location details</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
