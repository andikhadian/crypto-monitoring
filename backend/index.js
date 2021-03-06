const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const routerCrypto = require('./routes/crypto');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/api', routerCrypto);
const port = process.env.PORT || 3005
app.listen(port, () => {
    console.log('Connected to port ' + port)
})