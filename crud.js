const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) =>{
  res.send("PROBANDO...");
});

app.get('/datos', (req, res) => {
  connection.get('datos').then(
    result => {res.status(result.status).send(result.data);}
  ).catch(err=>{
     res.status(err.status).send(err.data);
  });
});


app.listen(3001, ()=> console.log("Corrriendo en puerto 3001"));
