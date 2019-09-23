const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

/*

    "/search/multi?api_key=:apiKey&query=:id": "/films/:id",
    "/movie/:id?api_key=:apiKey": "/films/:id",
    "/tv/:id?api_key=:apiKey": "/films/:id"

*/

const readFile = () => JSON.parse(fs.readFileSync(`${__dirname}/db.json`));

app.use(cors())

app.get('/search/multi', (req, res) => {
    if (req.query.api_key && req.query.query) {
        const topic = req.query.query;
        const json = readFile();
        const results = json.films.filter(film => film.title ? film.title.toLowerCase().includes(topic) : film.name.toLowerCase().includes(topic));
        const total_results = results.length;
        res.send(JSON.stringify({ total_results, results }));
    }
    res.status(404).send();
});


app.get('/movie/:id', (req, res) => {
    if (req.query.api_key) {
        const json = readFile();
        const result = json.films.find(film => film.id.toString() === req.params.id && film.media_type === 'movie');
        res.send(JSON.stringify(result));
    }
    res.status(404).send();
});

app.get('/tv/:id', (req, res) => {
    if (req.query.api_key) {
        const json = readFile();
        const result = json.films.find(film => film.id.toString() === req.params.id && film.media_type === 'tv');
        res.send(JSON.stringify(result));
    }
    res.status(404).send();

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
