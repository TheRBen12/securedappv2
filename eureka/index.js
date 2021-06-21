const Eureka = require('eureka-js-client').Eureka;


module.exports = function (){

    return new Eureka({
        instance: {
            app: 'gatewayservice',
            hostName: 'localhost',
            ipAddr: '127.0.0.1',
            statusPageUrl: 'http://localhost:8081',
            port: {
                '$': 8082,
                '@enabled': 'true',
            },
            vipAddress: 'localhost',
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
        },
        eureka: {
            host: 'localhost',
            port: 8761,
            servicePath: '/eureka/apps',

        },
    });
}

