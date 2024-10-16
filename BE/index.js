const express = require('express');

const { runActiveDB } = require('./config/dbConnections');
const mahasiswaRouters = require('./routers/mahasiswaRouters');
const controlDbRouters = require('./routers/controlDbRouters');

const app = express();


app.use(express.json());
app.set('activeDB', 'mongodb');
// connect to database
runActiveDB();


//mahasiswa routers
app.use('/api', mahasiswaRouters);

// switch database
app.use('/api', controlDbRouters);




app.listen(3567, () => {
    console.log('Server running on port 3567');
});
