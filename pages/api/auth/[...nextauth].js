import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../components/utils/auth";
import { connectToDatabase } from "../../../components/utils/db";

export default NextAuth({

    session: {
        jwt : true
    },

    providers: [
        Providers.Credentials({
            
            async authorize(credentials) {
                const client = await connectToDatabase();

                const userCollection = client.db().collection('users');

                const user = await userCollection.findOne({email: credentials.email});

                if(!user) {
                    client.close();
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    client.close();
                    throw new Error('Could not log you in!');
                }

                client.close();

                //more data
                const sebas = {
                    a: 'asd',
                    b: '123123'
                }

                return { 
                    email: user.email,
                    name: 'sebas',
                    image: sebas
                };
                
            }
            
        })
    ],

});