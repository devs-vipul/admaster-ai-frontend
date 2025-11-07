// Fix for Leaflet marker icons in Next.js
// This file should only be imported in client components

if (typeof window !== "undefined") {
  // Dynamic import to avoid SSR issues
  import("leaflet").then((L) => {
    // Default icon configuration
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  });
}

export {};
