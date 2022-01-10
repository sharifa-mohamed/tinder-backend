import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

// app config
const app = express();
const port = process.env.PORT || 8001
const connectionUrl = "mongodb+srv://admin:adminpw@cluster0.qb3di.mongodb.net/tinderDB?retryWrites=true&w=majority"
//mongodb+srv://admin:<password>@cluster0.qb3di.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//middleware
app.use(express.json());
app.use(Cors());

//dbConfig
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
})
// api endpoints

app.get('/', (req, res) => {
    res.status(200).send('helloo....')
})

app.post('/tinder/card', (req, res) => {

    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})


app.get('/tinder/cards', (re, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

// listener

app.listen(port, () => console.log(`listening to port ${port}`));
