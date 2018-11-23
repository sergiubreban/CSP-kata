const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')

const app = express()
const port = 3000;
let sources = {
    'default-src': ['\'self\''],
    'script-src': ['\'self\''],
    'img-src': ['\'self\'', "data:"],
    'media-src': ['\'self\''],
    'style-src': ['\'self\'', "'unsafe-inline'"], 
    'font-src': ['\'self\''],
    'report-uri': ['/report-violation']
}

let csp = Object.keys(sources).map(function (key) {
    return `${key} ${sources[key].join(' ')};`
})

const CSPMiddleware =  function (req, res, next) {
    res.setHeader('Content-Security-Policy', csp.join(' '))
    next()
}

app.use(CSPMiddleware);


app.use(bodyParser.json({
    type: ['json', 'application/csp-report']
}))

app.use('/', express.static(path.join(__dirname, '/frontend/dist/frontend')));

app.post('/report-violation', (req, res) => {
    console.log("on report");

    if (req.body) {
        console.log('CSP Violation: ', req.body)
    } else {
        console.log('CSP Violation: No data received!')
    }

    res.status(204).end()
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))