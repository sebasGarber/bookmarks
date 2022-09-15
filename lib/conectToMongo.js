const mongoose = require('mongoose');

export default function conectToMongo() {

    
    const uriDB =  process.env.MONGODB_URI;

    mongoose.connect(uriDB,  { useNewUrlParser: true, useUnifiedTopology: true } )
    
  /*   .then( 
        () => winston.info('Connected to MongoDB...')
        )  //Lo pone en el archivo LOG */
    .then( () => console.log('Connected to MongoDB...'))


}