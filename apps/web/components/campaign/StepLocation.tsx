"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, MapPin, XCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  locationSchema,
  type LocationFormValues,
} from "@/lib/schemas/campaign";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  setLocations,
  removeLocation as removeLocationAction,
  nextStep,
  previousStep,
} from "@/lib/store/slices/campaignFormSlice";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

// Dynamically import map components (client-side only)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Map updater component to smoothly update view without remounting
// This component uses react-leaflet's useMap hook which must be inside MapContainer
const MapUpdater = dynamic(
  () =>
    import("react-leaflet").then((mod) => {
      const { useMap } = mod;

      return function MapUpdaterComponent({
        center,
        zoom,
      }: {
        center: [number, number];
        zoom: number;
      }) {
        const map = useMap();

        useEffect(() => {
          if (map) {
            map.setView(center, zoom, { animate: true });
          }
        }, [center, zoom, map]);

        return null;
      };
    }),
  { ssr: false }
);

interface PhotonResult {
  properties: {
    name?: string;
    city?: string;
    country?: string;
    state?: string;
    street?: string;
    housenumber?: string;
    locality?: string;
    district?: string;
    county?: string;
    postcode?: string;
    osm_id: number;
    osm_type?: string;
    osm_key?: string;
    osm_value?: string;
    type?: string;
    countrycode?: string;
  };
  geometry: {
    coordinates: [number, number]; // [lng, lat]
  };
}

export function StepLocation() {
  const dispatch = useAppDispatch();
  const locations = useAppSelector((state) => state.campaignForm.locations);
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState<PhotonResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Calculate map center and zoom based on locations
  const getMapView = (): { center: [number, number]; zoom: number } => {
    if (locations.length === 0) {
      return { center: [20, 0], zoom: 2 };
    }
    const lastLocation = locations[locations.length - 1];
    if (!lastLocation) {
      return { center: [20, 0], zoom: 2 };
    }
    return {
      center: [lastLocation.lat, lastLocation.lng],
      zoom: locations.length === 1 ? 12 : 8, // Increased zoom: 12 for single location, 8 for multiple
    };
  };

  const { center: mapCenter, zoom: mapZoom } = getMapView();

  // Fix Leaflet marker icons and set mounted state (client-side only)
  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
      });
    }
  }, []);

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      locations,
    },
  });

  // Update form value when locations change
  useEffect(() => {
    form.setValue("locations", locations, { shouldValidate: true });
  }, [locations, form]);

  // Debounce search to avoid rate limiting
  useEffect(() => {
    if (!searchValue.trim()) {
      setPredictions([]);
      setIsSearching(false);
      return;
    }

    // Require at least 3 characters before searching
    if (searchValue.trim().length < 3) {
      setPredictions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timeoutId = setTimeout(async () => {
      try {
        // Use Photon API for geocoding (free, OpenStreetMap-based, no API key needed)
        const response = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(
            searchValue
          )}&limit=5`
        );

        if (response.ok) {
          const data = await response.json();
          const results: PhotonResult[] = data.features || [];
          setPredictions(results);
          setIsSearching(false);
        } else {
          console.error("Photon API error:", response.status);
          setPredictions([]);
          setIsSearching(false);
        }
      } catch (error) {
        console.error("Error searching locations:", error);
        setPredictions([]);
        setIsSearching(false);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => {
      clearTimeout(timeoutId);
      setIsSearching(false);
    };
  }, [searchValue]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setIsSearching(true);
  };

  const handleSelectLocation = (prediction: PhotonResult) => {
    const [lng, lat] = prediction.geometry.coordinates;

    // Build a readable name from the properties
    const props = prediction.properties;
    const nameParts = [
      props.name,
      props.city || props.locality,
      props.state,
      props.country,
    ].filter(Boolean);
    const name =
      nameParts.length > 0 ? nameParts.join(", ") : "Unknown location";

    // Check if location already exists
    const exists = locations.some(
      (loc) =>
        Math.abs(loc.lat - lat) < 0.001 && Math.abs(loc.lng - lng) < 0.001
    );

    if (!exists) {
      dispatch(setLocations([...locations, { name, lat, lng }]));
    }

    setSearchValue("");
    setPredictions([]);
  };

  const handleRemoveLocation = (index: number) => {
    dispatch(removeLocationAction(index));
  };

  function onSubmit(data: LocationFormValues) {
    dispatch(setLocations(data.locations));
    dispatch(nextStep());
  }

  function handleGoBack() {
    dispatch(previousStep());
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Where do you want your ads to show up?
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="locations"
            render={() => (
              <FormItem>
                <FormLabel>Location of your audience</FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    {/* Selected Locations as Badges (Above Input) */}
                    {locations.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-muted/30">
                        {locations.map((location, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-sm pl-3 pr-1 py-1.5 flex items-center gap-1"
                          >
                            <MapPin className="h-3 w-3" />
                            <span>{location.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveLocation(index)}
                              className="ml-1 hover:bg-destructive/20 hover:text-destructive rounded-full p-0.5 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Search Input */}
                    <div className="relative">
                      <Input
                        placeholder={
                          locations.length > 0
                            ? "Add more locations..."
                            : "Search for a location (e.g., Mumbai, India)"
                        }
                        value={searchValue}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pr-10"
                        autoComplete="off"
                      />
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

                      {/* Predictions Dropdown */}
                      {predictions.length > 0 && !isSearching && (
                        <div
                          className="absolute left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-xl max-h-60 overflow-auto"
                          style={{
                            zIndex: 9999,
                            top: "100%",
                          }}
                        >
                          {predictions.map((prediction, index) => {
                            const props = prediction.properties;
                            // Build display name from available properties
                            const nameParts = [
                              props.name,
                              props.city || props.locality,
                              props.state,
                              props.country,
                            ].filter(Boolean);
                            const displayName =
                              nameParts.length > 0
                                ? nameParts.join(", ")
                                : "Unknown location";

                            return (
                              <button
                                key={`${prediction.properties.osm_id}-${index}`}
                                type="button"
                                className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors text-sm border-b last:border-b-0 text-gray-900 dark:text-gray-100"
                                onClick={() => handleSelectLocation(prediction)}
                              >
                                <MapPin className="inline h-4 w-4 mr-2 text-blue-500" />
                                {displayName}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {isSearching && (
                        <div className="absolute z-10 w-full mt-1 bg-popover border rounded-md shadow-lg px-4 py-3 text-sm text-muted-foreground">
                          Searching...
                        </div>
                      )}
                    </div>

                    {/* OpenStreetMap */}
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border bg-muted">
                      {isMounted ? (
                        <MapContainer
                          center={[20, 0]}
                          zoom={2}
                          style={{ height: "100%", width: "100%" }}
                          scrollWheelZoom={true}
                        >
                          <MapUpdater center={mapCenter} zoom={mapZoom} />
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          {locations.map((location, index) => (
                            <Marker
                              key={`${location.lat}-${location.lng}-${index}`}
                              position={[location.lat, location.lng]}
                            >
                              <Popup>{location.name}</Popup>
                            </Marker>
                          ))}
                        </MapContainer>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-muted-foreground text-sm">
                            Loading map...
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Powered by Photon & OpenStreetMap - Free and open source
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={locations.length === 0}
            >
              Next
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={handleGoBack}
            >
              Go back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
