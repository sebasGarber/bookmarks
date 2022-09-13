import { MongoClient } from 'mongodb' //npm i mongodb

export async function connectToDatabase() {

    const pass = encodeURIComponent('waveproject');

    const client = await MongoClient.connect('mongodb+srv://sebasNext:'+ pass +'@sebasdbmongo.0hdnu.mongodb.net/nextCurs?retryWrites=true&w=majority');

    return client;

}