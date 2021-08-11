//import tensorflow.js
//create a tensor
var tensor = tf.tensor2d([[1,2,3],[4,5,6]], [2,3]);
//create a session
var sess = tf.Session();
//run the session
var result = sess.run(tensor);
//print the result
console.log(result);
//close the session
sess.close();
