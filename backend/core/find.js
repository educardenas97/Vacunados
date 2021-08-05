exports.find = async function find(cedula) {
  // Get librares
  const {MongoClient} = require('mongodb');
  const uri = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(uri);
  
  let allValues;
  try {
    // Connect to the database
    await client.connect();
    collection = await client.db("vacunados").collection("vacunados");;
    // Get all the documents from the collection
    allValues = await collection.find({cedula: parseInt(cedula)})
      .project({_id: 0})
      .sort({fecha_aplicacion: 1})
      .toArray();
  } catch (err) {
    console.error(err);
  }

  return allValues;

}
