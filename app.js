const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const db = require('./config/keys').MONGO_URI
const app = express();

//database
mongoose.connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, console.log('connected to db'))
    
   

const PORT = process.env.PORT || 3000;

//view engine ejs
app.use(expressLayouts);
app.set('view engine', 'ejs')

//express body parser
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`))