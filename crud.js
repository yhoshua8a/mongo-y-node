const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) =>{
  res.send("PROBANDO...");
});

//GEt por id
app.get('/heros/:userId', (req, res) => {
  connection.getOne('heros', req.params.userId).then(
    result => {res.status(result.status).send(result.data);}
  ).catch(err => {
     res.status(err.status).send(err.data);
  });
});

//GET que trae todos los campos
app.get('/heros', (req, res) => {
  connection.get('heros').then(
    result => {res.status(result.status).send(result.data);}
  ).catch(err => {
    res.status(err.status).send(err.data);
  });
});

//POST para insertar un elemento
app.post('/heros', (req, res) =>{
   connection.post('heros', req.body).then(
     result => {res.status(result.status).send(result.data)}
   ).catch(err =>{
     res.status(err.status).send(err.data);
   });
});

//Actualizar por id
app.put('/heros/:userId', (req, res) => {
  connection.put('heros', req.params.userId, req.body).then(
    result => {res.status(result.status).send(result.data)}
  ).catch(err => {
      res.status(err.status).send(err.data);
  });
});

//Borrar por id
app.delete('/heros/:userId', (req, res) => {
  connection.delete('heros', req.params.userId).then(
    result => {res.status(result.status).send(result.data);}
  ).catch(err => {
    res.status(err.status).send(err.data);
  });
});

app.listen(3001, ()=> console.log("Corrriendo en puerto 3001"));
