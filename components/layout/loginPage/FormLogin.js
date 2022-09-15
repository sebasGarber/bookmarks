import React, { useEffect, useState } from 'react'
import { Button, Spinner } from "react-bootstrap"; //npm install react-bootstrap@next bootstrap@5.1.0
import { map } from "lodash" //https://lodash.com/docs/4.17.15#map
import validator from "validator"; //npm install validator
import { toast } from 'react-toastify' //npm i react-toastify
//import getDataFromApi from './../../Components/api/getDataFromApi'

import TextField from '@mui/material/TextField';
import FormControl from '@material-ui/core/FormControl';

import { signIn } from "next-auth/client"
import { useRouter } from 'next/router'

export default function FormLogin(props) {

    const { newUserData } = props

    const  router = useRouter();

    //console.log('newUserData', newUserData);
  
   const formFields = [
       {
           name : "email",
           placeholder: "כתובת מייל",
           type: 'text',
           defaultValue: '',
           error: '*שדה חובה'
       },
       {
            name : "password",
            placeholder: "סיסמה",
            type: 'password',
            defaultValue: '',
            error: '*שדה חובה'
        }

   ]


   const [formData, setFormData] = useState(defaultValueForm(formFields))
   const [loading, setLoading] = useState(false)
   const [showErrors, setShowErrors] = useState(false)
   const [areErrors, setAreErrors] = useState(false);

   const onChange = (e) => {

        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })

   }

   //Search 4 errors
   useEffect(() => {

        if(!validator.isEmail(formData.email) ) {
            setAreErrors('נא להזין מייל תקין');
        }

        else if(validator.isEmpty(formData.password)) {

            setAreErrors('נא להזין סיסמה');

        }

        else if(formData.password.length < 8 ) {

            setAreErrors('נא להזין סיסמה מעל 8 תווים');

        }
        
        else {
            setAreErrors(false);
        }    

   }, [formData])
   

   //Populate Email after create
   useEffect(() => {

        if(newUserData?.email) {

            setFormData({...formData, email: newUserData?.email });

        }
    
   }, [newUserData])

   const onSubmit = () => { 
        
        setShowErrors(true);
        setAreErrors(true);

        if(areErrors ) {

            toast.warning(areErrors);

        }
        
        else {

            setAreErrors(false);
            loginUser(formData,setLoading,router);
            

        }

    }

   
  return (
    <div className='formLogin animate__animated animate__fadeIn'>

        {newUserData?.email && <div className='newUserData'>
            <p>לא לשכוח לאשר את המייל ב-{newUserData.email}</p>
            {/* <Button className={`customBtn`} variant='primary' size="sm" onClick={ sendNewMail }>
                <span>לשליחה חוזרת</span>
            </Button> */}
        </div>}

        <FormControl  className='form-100' >
            <TextField 
                name={formFields[0].name}
                onChange={onChange}
                //multiline
                value={formData[formFields[0].name]}
                label={formFields[0].placeholder}
                error={ !formData[formFields[0].name] && showErrors }
                helperText={ !formData[formFields[0].name] && showErrors && formFields[0].error }
                
            />
        </FormControl>

        <FormControl  className='form-100' >
            <TextField 
                name={formFields[1].name}
                onChange={onChange}
                //multiline
                value={formData[formFields[1].name]}
                label={formFields[1].placeholder}
                error={ !formData[formFields[1].name] && showErrors }
                helperText={ !formData[formFields[1].name] && showErrors && formFields[1].error }
                
            />
        </FormControl>
        

        <div className="d-grid gap-2 btnCont">

            <Button className={`customBtn_pink ${!areErrors ? 'animate__animated animate__bounceIn' : ''}`} disabled={loading} variant={ (areErrors && showErrors) ? 'danger' : 'primary'} size="lg" onClick={ onSubmit }>
                {loading ? <Spinner size="" animation="border" variant="light" /> : <span>התחברות</span> }
            </Button>

        </div>
        
    </div>
  )
}

function defaultValueForm(formFields) {
    
    let objReturn = {};

    map(formFields, item => {
              
        objReturn[item.name] = item.defaultValue
        
      })

    
    return objReturn;

}

async function loginUser(formData,setLoading,router) {
    
    

    setLoading(true);

    const result = await signIn('credentials', {

        redirect: false, //cuando la clave no esta bien redireccionar
        email: formData.email,
        password:formData.password,

    });

    //console.log('result',  result);

    setLoading(false);

    if(!result.error) {
        router.replace('/userConsole');
    } else {
        toast.error(result.error);
    }

}
