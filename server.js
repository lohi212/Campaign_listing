const express = require('express');
const fs = require('fs');

const app = express();

app.use('/', express.static('public'));

// app.get('/data', (req, res) => {
//     const data = fs.readFileSync('./public/data.json', 'utf-8');
//     res.json(JSON.parse(data));
// });

app.listen(1234, () => {
    console.log('server started on PORT:', 1234);
})
