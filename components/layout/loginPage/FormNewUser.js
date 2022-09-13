import React, { useEffect, useState } from 'react'
import { Button, Spinner } from "react-bootstrap"; //npm install react-bootstrap@next bootstrap@5.1.0
import { map } from "lodash" //https://lodash.com/docs/4.17.15#map
import validator from "validator"; //npm install validator
import { toast } from 'react-toastify' //npm i react-toastify
//import getDataFromApi from './../../Components/api/getDataFromApi'

import TextField from '@mui/material/TextField';
import FormControl from '@material-ui/core/FormControl';

export default function FormNewUser(props) {

    const { setNewUserPage, newUserData, setNewUserData } = props

  
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
        },
        {
            name : "username",
            placeholder: "שם משתמש",
            type: 'text',
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

   //check for errors
   useEffect(() => {

        if(validator.isEmpty(formData.username)) {

            setAreErrors('נא להזין שם משתמש');

        }

        else if(!validator.isEmail(formData.email) ) {
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
   
   //created user
   useEffect(() => {
    
        if(newUserData) {

            setNewUserPage(false);
            //console.log('newUserData', newUserData);

       }


   }, [newUserData])
   

   async function onSubmit() { 
        
        setShowErrors(true);
        setAreErrors(true);

        if(areErrors ) {

            toast.warning(areErrors);

        }
        
        else {

            createUser(formData,setLoading,setNewUserData);
            
        }

    }

    
  return (
    <div className='formLogin animate__animated animate__fadeIn'>


        <FormControl  className='form-100' >
            <TextField 
                name={formFields[2].name}
                onChange={onChange}
                //multiline
                value={formData.assignText}
                label={formFields[2].placeholder}
                error={ !formData[formFields[2].name] && showErrors }
                helperText={ !formData[formFields[2].name] && showErrors && formFields[2].error }
                
            />
        </FormControl>

        <FormControl  className='form-100' >
            <TextField 
                name={formFields[0].name}
                onChange={onChange}
                //multiline
                value={formData.assignText}
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
                value={formData.assignText}
                label={formFields[1].placeholder}
                error={ !formData[formFields[1].name] && showErrors }
                helperText={ !formData[formFields[1].name] && showErrors && formFields[1].error }
                
            />
        </FormControl>
        

        <div className="d-grid gap-2 btnCont">

            <Button className={`customBtn_violet ${!areErrors ? 'animate__animated animate__bounceIn' : ''}`} disabled={loading} variant={ (areErrors && showErrors) ? 'danger' : 'primary'} size="lg" onClick={ onSubmit }>
                {loading ? <Spinner size="" animation="border" variant="light" /> : <span>יצירת משתמש חדש</span> }
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

function createUser(formData,setLoading,setNewUserData) {
    
    setLoading(true);

    try {

        fetch(`/api/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type' : 'application/json',
        }
        }) 

        .then((response) => response.json())

        .then((data) => {

            setLoading(false);

            if(data?.error) {
                toast.error(data.error);
            }

            else if(data?.ok && data?.user) {
                toast.success(data.ok);
                setNewUserData(data?.user);
            }

            else {
                toast.error('שגיאה');
            }


        });

    } catch (e) {

        toast.error('שגיאה בשרת');
        return {};
        
    }

    

  
}

