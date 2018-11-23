const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')

const app = express()
const port = 3000;

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