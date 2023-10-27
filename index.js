const mqtt = require('mqtt')

const express = require('express')
const app = express()
const PORT_SERVER = 80
const HOST_SERVER = "0.0.0.0"

app.use(express.static('templates'));

const host = 'irrigacao.jgtche.com.br'
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
const topic_ligar = 'servidor/resposta'
const topic_desligar = 'servidor/resposta'

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

app.post('/ligar_motor', (req, res) => {
    const click = { clickTime: new Date() };
    console.log(click);

    let msg = {
        "Id": 1,
        "Msg": "ligar"
    }

    client.subscribe([topic_ligar], () => {
        console.log(`Subscribe to topic '${topic_ligar}'`)
        client.publish(topic_ligar, JSON.stringify(msg), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    })
});


app.post('/desligar_motor', (req, res) => {
    const click = { clickTime: new Date() };
    console.log(click);
    
    let msg = {
        "Id": 1,
        "Msg": "desligar"
    }

    client.subscribe([topic_desligar], () => {
        console.log(`Subscribe to topic '${topic_desligar}'`)
        client.publish(topic_desligar, JSON.stringify(msg), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(PORT_SERVER, HOST_SERVER, () => {
    console.log(`Server running at http://${HOST_SERVER}:${PORT_SERVER}/`);
});
