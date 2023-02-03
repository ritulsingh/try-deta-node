const fastify = require('fastify')({ logger: true })
const { Deta } = require('deta');

const PORT = process.env.PORT || 3000;

const deta = Deta('d07ituoq_jxynmVrMockamon1DigraQFBdb9E7t1i');


// set the database name
const db = deta.Base('simpleDB');

// Declare a route
fastify.get('/', async (request, res) => {
    res.send("Ritul Singh");
})
// Get all Data from database
fastify.get('/getdata', async (req, res) => {
    const item = await db.fetch();
    res.send(item)
})

fastify.post('/send', async (req, res) => {
    try {
        const { name, mobileNumber, email } = req.body;
        const result = await db.put({
            name: name,
            mobileNumber: mobileNumber,
            email: email
        });
        res.status(200).send({
            "msg": "Successful Data Inserted",
            "data": result
        });

    } catch (err) {
        res.status(500).send(err);
    }

})

// Start Local server listening for requests
fastify.listen({ port: PORT, host: '127.0.0.1' }, function (err, address) {
    if (err) {
        fastify.log.error(`Error while starting fastify server: ${err.message}`, err)
        process.exit(1)
    }
    fastify.log.info(`Server is now listening on ${address}`)
})

module.exports = fastify;