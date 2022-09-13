import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
  } from 'firebase/auth'

import { auth } from './../../../components/utils/Firebase'

     

export default async function handler(req, res) {

    if (!req.method === 'POST') { 
        
        res.status(500).json({
            error: 'שגיאה ביצירת חשבון'
        });
        
        return;
    }

    const formData = req.body;

    const changeUserName = () => {

        updateProfile(auth.currentUser, {
        displayName: formData.username,
        })
        .then(() => {
            // Profile updated!
            // ...
        })
        .catch((error) => {
            throw new Error('שגיאה ביצירה שם משתמש');
            // An error occurred
            // ...
            //toast.error('Error al asignar el nombre de Usuario')
        })

    }

    const sendVerificationEmail = () => {

        sendEmailVerification(auth.currentUser)
        .then(() => {
            // Email verification sent!

            //toast.success('Se ha enviado un email de verificaion')
        })
        .catch(() => {
            throw new Error('שגיאה בשליחת מייל');
            //toast.error('Error al enviar el emais de verificacion')
        })

    }
    
    createUserWithEmailAndPassword(auth, formData.email, formData.password)

        .then((userCredential) => {
        // Signed in
        const user = userCredential.user

            

            res.status(200).json({
                user: user,
                ok: 'החשבון נוצר בהצלה. נשלח מייל אליך לאישור'
        
            });

            //console.log(user)
            //console.log('Registro completado')
            changeUserName()
            sendVerificationEmail()

        })

        .catch((error) => {

            if(error?.code === 'auth/email-already-in-use') {

                res.status(500).json({
                    error: 'קיים כבר חשבון במייל זה',
                    errorMsg: error
                });
                return;


            } else {

                res.status(500).json({
                    error: 'שגיאה ביצירת חשבון',
                    errorMsg: error
                });
                return;

            }

                        
        })




}