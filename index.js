const hapi = require('@hapi/hapi')
const { routes } = require('./src/routes/routes')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package.json');

const start = async () => {
    const server = hapi.server({
        port: process.env.PORT || 3333,
        host: '0.0.0.0'
    })

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
        grouping: 'tags'
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.route(routes);
    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();