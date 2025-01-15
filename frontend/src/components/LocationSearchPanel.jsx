import { MapPin } from "lucide-react";

const LocationSearchPanel = ({ suggestions, onLocationSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-2 space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-3 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!suggestions?.predictions || suggestions.status !== 'OK') {
    return (
      <div className="mt-2 p-3 text-gray-500 text-center">
        No locations found
      </div>
    );
  }

  return (
    <div className="mt-2 divide-y divide-gray-100">
      {suggestions.predictions.map((location) => (
        <button
          key={location.place_id}
          onClick={() => onLocationSelect(location)}
          className="w-full text-left p-3 hover:bg-gray-50 flex items-center gap-3 transition-colors"
        >
          <MapPin size={20} className="text-gray-500 flex-shrink-0" />
          <div>
            <p className="font-medium line-clamp-1">
              {location.structured_formatting.main_text}
            </p>
            <p className="text-sm text-gray-500 line-clamp-1">
              {location.structured_formatting.secondary_text}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default LocationSearchPanel;