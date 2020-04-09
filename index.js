const express = require("express")
const bodyParser = require("body-parser")
const KDTree = require("./service/kdtree")

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


app.get('/', (req, res)=>{
    console.log('My new endpoint')

    res.send('Hello World')
})

app.post('/get-nearby', (req, res) => {
    const points = req.body.locations

    // Create a KDTree
    const kdtree = new KDTree(points)

    // Search for Nearest Location
    const nearestLocation = kdtree.getNearestNeighbour({
        x: req.body.currentLocation.latitude,
        y: req.body.currentLocation.longitude
    })

    res.status(200).send({
        latitude: nearestLocation.x,
        longitude: nearestLocation.y
    })

})

app.listen(port, () => {
    console.log(`Server is up at ${port}.`);
})