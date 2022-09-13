import React, { useState } from 'react'
import { Form, FloatingLabel, Button, Spinner } from "react-bootstrap"; //npm install react-bootstrap@next bootstrap@5.1.0
import { map } from "lodash" //https://lodash.com/docs/4.17.15#map
import validator from "validator"; //npm install validator
import { toast } from 'react-toastify' //npm i react-toastify
//import getDataFromApi from './../../Components/api/getDataFromApi'

export default function FormLogin() {

  
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

   const onSubmit = () => { 
        
        setShowErrors(true);
        setAreErrors(true);

        if(!validator.isEmail(formData.email) ) {

            toast.warning('נא להזין מייל תקין');

        }

        else if(validator.isEmpty(formData.password) ) {

            toast.warning('נא להזין סיסמה');

        }
        
        else {

            setAreErrors(false);
            console.log('yes');
            //sendtoApi('index', 'login', formData, setLoading)

        }

    }

  return (
    <div className='formCont'>
        
        <FloatingLabel label={formFields[0].placeholder} >

            <Form.Control

            className="customFloatInput"
            isInvalid={!formData[formFields[0].name] && showErrors}
            /*isValid={formik.touched.fullname && !formik.errors.fullname}  */
            type={formFields[0].type}
            name={formFields[0].name}
            disabled={false}
            placeholder={formFields[0].placeholder}
            onChange={onChange}
            value={formData[formFields[0].name]}
            />
            { formFields[0].error && <Form.Control.Feedback type="invalid">
                <span>{ formFields[0].error }</span>
            </Form.Control.Feedback> }
            
        </FloatingLabel>

        <FloatingLabel label={formFields[1].placeholder} >

            <Form.Control

            className="customFloatInput"
            isInvalid={!formData[formFields[1].name] && showErrors}
            /*isValid={formik.touched.fullname && !formik.errors.fullname}  */
            type={formFields[1].type}
            name={formFields[1].name}
            disabled={false}
            placeholder={formFields[1].placeholder}
            onChange={onChange}
            value={formData[formFields[1].name]}
            />
            { formFields[1].error && <Form.Control.Feedback type="invalid">
                <span>{ formFields[1].error }</span>
            </Form.Control.Feedback> }
            
        </FloatingLabel>

        <div className="d-grid gap-2 btnCont">

            <Button disabled={loading} variant={areErrors ? 'danger' : 'primary'} size="lg" onClick={ onSubmit }>
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


