exports.config = {
    runner: 'local',

    specs: ['./test/specs/**/*.js'],
    exclude: [],

    maxInstances: 1,

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--disable-notifications',
                ...(process.env.CI
                    ? [
                        '--headless=new',
                        '--no-sandbox',
                        '--disable-dev-shm-usage',
                        '--window-size=1920,1080',
                        // Headless Chrome advertises "HeadlessChrome" in its UA, which makes
                        // the site serve cached page variants and breaks banner rotation.
                        '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36',
                    ]
                    : []),
            ],
        },
    }],

    logLevel: 'info',
    bail: 0,

    baseUrl: 'https://servisebi.ge',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 600000,
    },
};
