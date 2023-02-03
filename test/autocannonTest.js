const autocannon = require('autocannon');

async function test() {
    const instance = autocannon({
        title: "Autocannon Test For API",
        url: 'https://r5ndxf.deta.dev',
        connections: 1000,
        duration: 100,
        requests: [
            {
                method: 'GET'
            },
            {
                method: 'POST',
                path: '/send',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: "Ritul Singh",
                    mobileNumber: 9205732793,
                    email: "ritulsingh00@gmail.com"
                })
            }
        ],
    });
    instance.on('start', () => console.log("Test Started!"));
    instance.on('done', handleResults);

    function handleResults(results) {
        console.log(results);
    }

    // Render results table
    autocannon.track(instance, { renderProgressBar: false });
}

test();
