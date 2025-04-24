import type { UseFetchOptions } from "#app";

// Helper function for API fetch
export function useApiFetch<T>(path: string, options?: UseFetchOptions<T>) {
    const headers = useRequestHeaders(["cookie"]);
    const baseURL = useRuntimeConfig().public.apiBase;
    // return useFetch(path, { ...options, headers, baseURL });
    return useFetch(path, { ...options, headers, baseURL })
        .catch((error) => {
            console.error(`API fetch error at ${path}:`, error);
            return null;
        });
}

// Users
export function useGetUsers(query?: Record<string, string | number>) {
    return useApiFetch("/users", { query });
}

export function useGetUser(id: string | number) {
    return useApiFetch(`/users/${id}`);
}

// Locations
export function useGetLocations(query?: Record<string, string>) {
    return useApiFetch("/locations", { query });
}

export function useGetLocation(id: string | number) {
    return useApiFetch(`/locations/${id}`);
}

// Categories
export function useGetCategories(query?: Record<string, string>) {
    return useApiFetch("/categories", { query });
}

export function useGetCategory(id: string | number) {
    return useApiFetch(`/categories/${id}`);
}

// Packages
export function useGetPackages(query?: Record<string, string>) {
    return useApiFetch("/packages", { query });
}

export function useGetPackage(id: string | number) {
    return useApiFetch(`/packages/${id}`);
}

// Amenities
export function useGetAmenities(query?: Record<string, string>) {
    return useApiFetch("/amenities", { query });
}

export function useGetAmenity(id: string | number) {
    return useApiFetch(`/amenities/${id}`);
}

// Rooms
export function useGetRooms(query?: Record<string, string>) {
    return useApiFetch("/rooms", { query });
}

export function useGetRoom(id: string | number) {
    return useApiFetch(`/rooms/${id}`);
}

// Activities
export function useGetActivities(query?: Record<string, string>) {
    return useApiFetch("/activities", { query });
}

export function useGetActivity(id: string | number) {
    return useApiFetch(`/activities/${id}`);
}

// Features
export function useGetFeatures(query?: Record<string, string>) {
    return useApiFetch("/features", { query });
}

export function useGetFeature(id: string | number) {
    return useApiFetch(`/features/${id}`);
}

// Ping API
export function usePingAPI() {
    return useApiFetch("/ping");
}

// Combined fetch function with additional query parameters
export function useGetResourceWithRelations(
    resource: string,
    query?: Record<string, string>,
    relations?: string[]
) {
    const relationQuery = relations ?
        { ...query, with: relations.join(',') } :
        query;

    return useApiFetch(`/${resource}`, { query: relationQuery });
}

export const usePackages = () => {
    return useGetResourceWithRelations("packages", {}, [
        "category",
        "location",
        "amenities",
        "rooms",
        "activities",
        "features"
    ]);
}

export const useLocations = () => {
    return useGetResourceWithRelations("locations", {}, [
        "category",
        "rooms",
        "amenities",
        "activities",
    ])
}

export const useRooms = () => {
    return useGetResourceWithRelations("rooms", {}, [
        "category",
        "location",
        "amenities",
        "activities",
    ])
}