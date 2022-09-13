import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import {
    signInWithEmailAndPassword
  } from 'firebase/auth'

import { auth } from './../../../components/utils/Firebase'


export default NextAuth({

    
    session: {
        jwt : true
    },

    providers: [
        Providers.Credentials({
            
            async authorize(credentials) {


                const userCredential = await  getDataFromApi(credentials);

                if(userCredential?.error) {
                    throw new Error(userCredential.error);
                
                } else if(!userCredential?.user?.uid) {

                    //throw new Error(userApi.uid);
                    throw new Error('שגיאה');

                } else {

                    const moreData = {
                        uid : userCredential?.user?.uid
                    }
    
                    //log in
                    return { 
                        email: userCredential?.user?.email,
                        name:  userCredential?.user?.displayName,
                        image: moreData
                    }; 

                }
                
            }
            
        })
    ],

});


function handlerErrors(code) {
    //console.log(code)
  

    switch (code) {
      case 'auth/wrong-password':
        return 'שם המשתמש או הסיסמה שגויים';
         
      case 'auth/user-not-found':
        return 'שם המשתמש או הסיסמה שגויים';
          
      case 'auth/too-many-requests':
        return 'יותר מדי בקשות להעברת אימייל בזמן קצר';

      default:
        return code
        //return 'שגיאה'
    }
  }

async function getDataFromApi (credentials) {

    try {
        
        const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)

        if (!userCredential.user.emailVerified) {
    
            return {
                error : 'כדי להיות מסוגל להתחבר יש לאמת את החשבון'
            }
            
        } else {
            
            //log in
            return userCredential;
        }

    } catch (error) {

        const errorMsg = handlerErrors(error?.code)
        
        return {
            error : errorMsg
        }

    }


}