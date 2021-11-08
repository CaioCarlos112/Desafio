const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://mongo:27017")
            .then(conn => global.conn = conn.db("desafio"))
            .catch(err => console.log(err))
 
function findAll() {
  return global.conn.collection("funcionarios").find().toArray();
}
             
function insert(customer) {
    return global.conn.collection("funcionarios").insertOne(customer);
}
 
const ObjectId = require("mongodb").ObjectId;
function findOne(id) {
    return global.conn.collection("funcionarios").findOne(new ObjectId(id));
}
 
function update(id, customer) {
    return global.conn.collection("funcionarios").updateOne({ _id: new ObjectId(id) }, { $set: customer });
}
 
function deleteOne(id) {
    return global.conn.collection("funcionarios").deleteOne({ _id: new ObjectId(id) });
}
 
module.exports = { findAll, insert, findOne, update, deleteOne }
