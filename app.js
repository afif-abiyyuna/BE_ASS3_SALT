const express = require ('express');
const mongooseConnection = require ('./Configuration/mongoose.config');
const router = require ('./Routes/index');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
mongooseConnection();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);



app.listen(port, ()=>{
    console.log(`app run on http://localhost:${port}`);
});