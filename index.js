const mqtt = require('mqtt')

const express = require('express')
const app = express()
const port_server = 3000

// serve files from the templates directory
app.use(express.static('templates'));

const host = '192.168.0.110'
const port = '1883'
const clientId = `node_mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'mastche',
    password: '123456789',
    reconnectPeriod: 1000,
})

const topic_con = '/nodejs/mqtt'

client.on('connect', () => {
    console.log('Connected')

    client.subscribe([topic_con], () => {
        console.log(`Subscribe to topic '${topic_con}'`)
        client.publish(topic_con, 'Broker conectado', { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    })
})

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
})

app.post('/clicked', (req, res) => {
    const click = { clickTime: new Date() };
    console.log(click);
    
    client.subscribe([topic_con], () => {
        console.log(`Subscribe to topic '${topic_con}'`)
        client.publish(topic_con, 'irrigar', { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(port_server, () => {
    console.log(`App rodando na porta:${port}`)
});
