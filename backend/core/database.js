exports.find = async function find(cedula, cluster) {
  // Get librares
  const {MongoClient} = require('mongodb');
  const uri = ['mongodb+srv://0982:0982@cluster0.yrdbq.gcp.mongodb.net/vacunados?retryWrites=true&w=majority',
              'mongodb+srv://admin:admin@cluster1.clwqv.mongodb.net/vacunados?retryWrites=true&w=majority'];
  const client = new MongoClient(uri[cluster]);
  
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
