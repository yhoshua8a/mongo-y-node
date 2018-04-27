const MongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectId;

const SERVER_ADDR = 'mongodb://localhost:27017';
const DATABASE  = 'baseprueba';

const SERVER_ERROR = {
  status:500,
  data:{message:'Mongodb connection error X('}
};

const get = function(dbCollection) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(SERVER_ADDR, (server_err, client) => {
      if (server_err !== null){
        reject(SERVER_ERROR);
      };
      const db = client.db(DATABASE);

      db.collection(dbCollection).find({}).toArray( (findErr, documents) => {
        if (findErr !== null) {
          reject({status: 400, data:{ message: 'Error to find documents'}});
          client.close()
        };

        resolve({
          status: 200,
          data: documents
        });
        client.close();
      });
    });
  });
}

const put = function(dbCollection){

  return new Promise((resolve, reject) =>{
    MongoClient.connect(SERVER_ADDR, (server_err, client)=>{
       if(server_err !== null){
         reject();
         client.close();
       }

       const db = client.db(DATABASE);

       // const collection = db.collection('documents');
       //db.collection(dbCollection).insert();


    });
  });

}



module.exports = {
  get,
};
