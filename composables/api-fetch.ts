import type { UseFetchOptions } from "#app";

// Helper function for API fetch
export function useApiFetch<T>(path: string, options?: UseFetchOptions<T>) {
    const headers = useRequestHeaders(["cookie"]);
    const baseURL = useRuntimeConfig().public.apiBase;
    return useFetch(path, { ...options, headers, baseURL });
}

// Users
export function useGetUsers(query?: Record<string, string | number>) {
    return useApiFetch("/users", { query }).data;
}

export function useGetUser(id: string | number) {
    return useApiFetch(`/users/${id}`).data;
}

// Locations
export function useGetLocations(query?: Record<string, string>) {
    return useApiFetch("/locations", { query }).data;
}

export function useGetLocation(id: string | number) {
    return useApiFetch(`/locations/${id}`).data;
}

// Categories
export function useGetCategories(query?: Record<string, string>) {
    return useApiFetch("/categories", { query }).data;
}

export function useGetCategory(id: string | number) {
    return useApiFetch(`/categories/${id}`).data;
}

// Packages
export function useGetPackages(query?: Record<string, string>) {
    return useApiFetch("/packages", { query }).data;
}

export function useGetPackage(id: string | number) {
    return useApiFetch(`/packages/${id}`).data;
}

// Amenities
export function useGetAmenities(query?: Record<string, string>) {
    return useApiFetch("/amenities", { query }).data;
}

export function useGetAmenity(id: string | number) {
    return useApiFetch(`/amenities/${id}`).data;
}

// Rooms
export function useGetRooms(query?: Record<string, string>) {
    return useApiFetch("/rooms", { query }).data;
}

export function useGetRoom(id: string | number) {
    return useApiFetch(`/rooms/${id}`).data;
}

// Activities
export function useGetActivities(query?: Record<string, string>) {
    return useApiFetch("/activities", { query }).data;
}

export function useGetActivity(id: string | number) {
    return useApiFetch(`/activities/${id}`).data;
}

// Features
export function useGetFeatures(query?: Record<string, string>) {
    return useApiFetch("/features", { query }).data;
}

export function useGetFeature(id: string | number) {
    return useApiFetch(`/features/${id}`).data;
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

    return useApiFetch(`/${resource}`, { query: relationQuery }).data;
}