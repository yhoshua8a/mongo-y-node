const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const SERVER_ADDR = 'mongodb://localhost:27017';
const DATABASE  = 'heros';

const SERVER_ERROR = {
  status:500,
  data:{message:'Mongodb connection error X('}
};


//Funcion obtener documento por id
const getOne = function(dbCollection, id) {

  return new Promise((resolve, reject) => {
    MongoClient.connect(SERVER_ADDR, (server_err, client) => {

      if (server_err !== null){
        reject(SERVER_ERROR);
      };
      const db = client.db(DATABASE);

      db.collection(dbCollection).findOne({ _id: new ObjectId(id) }, (err, result) => {

      resolve({
        status: 200,
        data: result
       });

      client.close();

      });
    });//cierre MongoClient
  });
}

//Funcion obtener todos los documentos

const get = function(dbCollection){
   return new Promise((resolve, reject) => {
      MongoClient.connect(SERVER_ADDR, (server_err, client) => {
         if(server_err != null){
           reject(SERVER_ERROR);
         }

         const db = client.db(DATABASE);

         db.collection(dbCollection).find({}).toArray((findErr, documents) => {
           if(findErr !== null){
             reject({status:400, data:{message: 'Error to find documents'}});
             client.close();
           }

           resolve({
             status:200,
             data:documents
           });

           client.close();
         });
      });
   });
}

//Funcion para insertar documento
const post = function(dbCollection, data){

  return new Promise((resolve, reject) => {
     MongoClient.connect(SERVER_ADDR, (server_err, client) => {
        if(server_err !== null){
          reject(SERVER_ERROR);
        }

        const db = client.db(DATABASE);

        db.collection(dbCollection).insert(data, (insertErr, result) => {

          if(insertErr !== null){
            reject({
              status:400,
              data:{message:'Error to save in databse'}
            });
          }
           resolve({
             status:200,
             data:result
           });
           client.close();
        });
     });
  });
}

//Funcion para actualizar documento
const put = function(dbCollection, id, data){
   return new Promise((resolve, reject) => {
      MongoClient.connect(SERVER_ADDR, (server_err, client) =>{
        if(server_err !== null){
          reject(SERVER_ERROR);
        }

        const db = client.db(DATABASE);

        db.collection(dbCollection).update({_id: new ObjectId(id)}, data,
         (updateErr, result) => {
            if(updateErr !== null){

              console.log(updateErr);
              reject({
                status:400,
                data:{message:'Unable to update user'}
              });
            }

            resolve({status:200, data:null});
            client.close();
         });
      });
   });
}

//funcion ára borrar documentos
const deleteById = function(dbCollection, id){
  return new Promise((resolve, reject) => {
    MongoClient.connect(SERVER_ADDR, (server_err, client) => {
       if(server_err !== null){
         reject(SERVER_ERROR);
       }
       const db = client.db(DATABASE);

       db.collection(dbCollection).deleteOne({ _id: new ObjectId(id)}, (delateErr, result) => {
         if(delateErr !== null){

           reject({
             status:404,
             data:{message:'Unable to delete or not found'}
           });

           client.close();
         }

         resolve({
           status:204,
           data:result
         });

         client.close();
       });
    });
  });

}



module.exports = {
  getOne,
  get,
  post,
  put,
  delete:deleteById
};
