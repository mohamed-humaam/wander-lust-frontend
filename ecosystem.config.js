export default {
    apps: [
        {
            name: 'my-app',
            script : './.output/server/index.mjs',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
        }
    ]
};
