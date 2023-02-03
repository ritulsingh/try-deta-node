const fastify = require('fastify')({ logger: true })
const { Deta } = require('deta');

const PORT = process.env.PORT || 3000;

const deta = Deta('d07ituoq_jxynmVrMockamon1DigraQFBdb9E7t1i');

// set the database name
const db = deta.Base('simpleDB');

// Get all Data from database
fastify.get('/', async (request, res) => {
    const item = await db.fetch();
    res.send(item)
})

// Get Data by mobile number
fastify.get('/email/:email', async (req, res) => {
    const { email } = req.params;
    const items = await db.fetch({ 'email': email });
    res.send(items);
})

const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

fastify.post('/send', async (req, res) => {
    try {
        const { name, mobileNumber, email } = req.body;
        eventEmitter.emit('dataInsert', { name, mobileNumber, email });
        console.log("Data Insertion Event Emitted");
        res.status(200).send({
            "msg": "Data Insertion Event Emitted"
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({
            "msg": "Error emitting data insertion event"
        });
    }
});

eventEmitter.on('dataInsert', (data) => {
    try {
        const result = db.put(data);
        console.log("Successful Data Inserted");
    } catch (err) {
        console.error(err);
    }
});


fastify.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await db.delete(id);
    res.send({"message": "deleted"})
});

fastify.delete('/email/:email', async (req, res) => {
    const { email } = req.params;
    await db.delete(email);
    res.send({"message": "deleted"})
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