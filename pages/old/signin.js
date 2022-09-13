import {
    signInWithEmailAndPassword
  } from 'firebase/auth'

import { auth } from './../../../components/utils/Firebase'

     

export default async function handler(req, res) {

    if (!req.method === 'POST') { 
        
        res.status(500).json({
            error: 'שגיאה'
        });
        
        return;
    }

    const formData = req.body;

        
    signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed in
          //setUser(userCredential.user)
          //setUserActive(userCredential.user.emailVerified)
          if (!userCredential.user.emailVerified) {

            res.status(401).json({
                error:  'כדי להיות מסוגל להתחבר יש לאמת את החשבון'
            });
            return;
            
          } else {
            /* res.status(200).json({
                ok:  'OK',
                user: userCredential.user
            }); */
            return;
          }
          // ...
        })
        .catch((error) => {

          const errorMsg = handlerErrors(error?.code)

            res.status(200).json({
                error:  errorMsg
            });
            return;
          //handlerErrors(error.message)
        })


}


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
        return 'שגיאה'
    }
  }