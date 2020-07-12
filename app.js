const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(expressLayouts);
app.set('view engine', 'ejs')

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`))