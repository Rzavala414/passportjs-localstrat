const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`))