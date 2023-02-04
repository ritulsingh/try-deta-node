const fastify = require('fastify')({ logger: true })
const { Deta } = require('deta');

const PORT = process.env.PORT || 3000;

const deta = Deta('d07ituoq_jxynmVrMockamon1DigraQFBdb9E7t1i');

// set the database name
const db = deta.Base('simpleDB');

// Get all Data from database
fastify.get('/', async (request, res) => {
    try {
        const item = await db.fetch();
        res.send(item)
    } catch (error) {
        res.send(error)
    }
})

// Get Data by email
fastify.get('/email/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const items = await db.fetch({ 'email': email });
        res.send(items);
    } catch (error) {
        res.send(error);
    }
})

// Add data to database
fastify.post('/send', async (req, res) => {
    try {
        const { name, mobileNumber, email } = req.body;
        const result = await db.put({
            name: name,
            mobileNumber: mobileNumber,
            email: email
        });
        console.log("Successful Data Inserted");
        res.status(200).send({
            "msg": "Successful Data Inserted",
            "data": result
        });
    } catch (err) {
        res.status(500).send(err);
    }
})

// Delete by id
fastify.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.delete(id);
        res.send({ "message": "deleted" })
    } catch (error) {
        res.send(error);
    }
});

// Start Local server listening for requests
fastify.listen({ port: PORT, host: '127.0.0.1' }, function (err, address) {
    if (err) {
        fastify.log.error(`Error while starting fastify server: ${err.message}`, err)
        process.exit(1)
    }
    fastify.log.info(`Server is now listening on ${address}`)
})

module.exports = fastify;