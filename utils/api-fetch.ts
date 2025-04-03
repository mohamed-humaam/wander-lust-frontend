import type { NitroFetchOptions } from "nitropack";

export function apiFetch<T>(path: string, options?: NitroFetchOptions<string>) {
    const cookie = useRequestHeader("cookie");
    const baseURL = useRuntimeConfig().public.apiBase;
    const headers: Record<string, string> = {};

    if (cookie) {
        headers["cookie"] = cookie;
    }

    return $fetch<T>(path, { ...options, headers, baseURL });
}

// Users mutations
export function createUser(body: {
    name: string,
    email: string,
    password: string
}) {
    return apiFetch("/users", { method: "POST", body });
}

export function updateUser(id: string | number, body: {
    name?: string,
    email?: string,
    password?: string
}) {
    return apiFetch(`/users/${id}`, { method: "PUT", body });
}

export function deleteUser(id: string | number) {
    return apiFetch(`/users/${id}`, { method: "DELETE" });
}

export function getUserHead(id: string | number) {
    return apiFetch(`/users/${id}`, { method: "HEAD" });
}

// Locations

export function createLocation(body: any) {
    return apiFetch("/locations", { method: "POST", body });
}


export function updateLocation(id: string | number, body: any) {
    return apiFetch(`/locations/${id}`, { method: "PUT", body });
}

export function deleteLocation(id: string | number) {
    return apiFetch(`/locations/${id}`, { method: "DELETE" });
}

export function getLocationHead(id: string | number) {
    return apiFetch(`/locations/${id}`, { method: "HEAD" });
}

// Categories

export function createCategory(body: any) {
    return apiFetch("/categories", { method: "POST", body });
}

export function updateCategory(id: string | number, body: any) {
    return apiFetch(`/categories/${id}`, { method: "PUT", body });
}

export function deleteCategory(id: string | number) {
    return apiFetch(`/categories/${id}`, { method: "DELETE" });
}

export function getCategoryHead(id: string | number) {
    return apiFetch(`/categories/${id}`, { method: "HEAD" });
}

// Packages

export function createPackage(body: any) {
    return apiFetch("/packages", { method: "POST", body });
}

export function updatePackage(id: string | number, body: any) {
    return apiFetch(`/packages/${id}`, { method: "PUT", body });
}

export function deletePackage(id: string | number) {
    return apiFetch(`/packages/${id}`, { method: "DELETE" });
}

export function getPackageHead(id: string | number) {
    return apiFetch(`/packages/${id}`, { method: "HEAD" });
}

// Amenities

export function createAmenity(body: any) {
    return apiFetch("/amenities", { method: "POST", body });
}


export function updateAmenity(id: string | number, body: any) {
    return apiFetch(`/amenities/${id}`, { method: "PUT", body });
}

export function deleteAmenity(id: string | number) {
    return apiFetch(`/amenities/${id}`, { method: "DELETE" });
}

export function getAmenityHead(id: string | number) {
    return apiFetch(`/amenities/${id}`, { method: "HEAD" });
}

// Rooms

export function createRoom(body: any) {
    return apiFetch("/rooms", { method: "POST", body });
}

export function getRoomById(id: string | number) {
    return apiFetch(`/rooms/${id}`, { method: "GET" });
}

export function updateRoom(id: string | number, body: any) {
    return apiFetch(`/rooms/${id}`, { method: "PUT", body });
}

export function deleteRoom(id: string | number) {
    return apiFetch(`/rooms/${id}`, { method: "DELETE" });
}

export function getRoomHead(id: string | number) {
    return apiFetch(`/rooms/${id}`, { method: "HEAD" });
}

// Activities

export function createActivity(body: any) {
    return apiFetch("/activities", { method: "POST", body });
}


export function updateActivity(id: string | number, body: any) {
    return apiFetch(`/activities/${id}`, { method: "PUT", body });
}

export function deleteActivity(id: string | number) {
    return apiFetch(`/activities/${id}`, { method: "DELETE" });
}

export function getActivityHead(id: string | number) {
    return apiFetch(`/activities/${id}`, { method: "HEAD" });
}

// Features

export function createFeature(body: any) {
    return apiFetch("/features", { method: "POST", body });
}

export function updateFeature(id: string | number, body: any) {
    return apiFetch(`/features/${id}`, { method: "PUT", body });
}

export function deleteFeature(id: string | number) {
    return apiFetch(`/features/${id}`, { method: "DELETE" });
}

export function getFeatureHead(id: string | number) {
    return apiFetch(`/features/${id}`, { method: "HEAD" });
}

// Utility: Ping API
// export function pingAPI() {
//     return apiFetch("/ping", { method: "GET" });
// }
