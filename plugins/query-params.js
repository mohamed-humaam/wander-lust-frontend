export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:finish", () => {
        const route = useRoute();
        const router = useRouter();

        const requiredParams = ["team", "table", "team_id"];
        const currentParams = Object.fromEntries(
            requiredParams.map((param) => [param, route.query[param]])
        );

        if (Object.values(currentParams).some(Boolean)) {
            router.push({ query: { ...route.query, ...currentParams } });
        }
    });
});
