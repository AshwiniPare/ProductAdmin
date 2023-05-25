const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const seller = require('./models/seller');
const cors = require('cors');

const app = express();

app.use(cors());

//app.set('views', 'views');

const sellerRoutes = require('./routes/seller');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/seller', sellerRoutes);

app.use(errorController.get404);

sequelize.sync().then(result => {
    console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});

