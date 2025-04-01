export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const placeId = query.placeId;

    if (!placeId) {
        return {
            error: 'Missing place ID'
        };
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,photos&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result) {
            return {
                name: data.result.name,
                rating: data.result.rating,
                reviews: data.result.reviews || [],
                photos: data.result.photos || [],
            };
        }

        return {
            reviews: [],
            status: data.status,
            error: data.error_message
        };
    } catch (error) {
        console.error("Error fetching Google Reviews:", error);
        return {
            reviews: [],
            error: 'Failed to fetch reviews'
        };
    }
});