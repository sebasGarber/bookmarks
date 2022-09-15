import React, { Fragment, useEffect, useState } from 'react'
import validator from "validator"; //npm install validator
import { toast } from 'react-toastify' 
import { map } from "lodash"
import { sendNewBookmark } from '../userConsoleFunctions';
import Bookmark from './Bookmark';
import { Accordion } from 'react-bootstrap';
import classes from './../user-console.module.scss'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ModalSiteCont from '../../utils/ModalSiteCont';
import RtlMaterialCont from '../../utils/RtlMaterialCont';

import { Button, Spinner } from "react-bootstrap"; //npm install react-bootstrap@next bootstrap@5.1.0
import TextField from '@mui/material/TextField';
import FormControl from '@material-ui/core/FormControl';

export default function Category(props) {

    const { item,reloadBookmark, bookmarks } = props

    const [showAddBookmark, setShowAddBookmark] = useState(false);

    const addBookmark = () => { 
        setShowAddBookmark(!showAddBookmark);
    }

    console.log('bookmarks', bookmarks)

  return (
    <Fragment>

        <div className={classes.category}>
            <Accordion className="accordions acc1"  defaultActiveKey="accordion0"  >

                <Accordion.Item eventKey="accordion0" >
                    
                    <Accordion.Header className={classes.accordionHeader}>
                        <h2>{ item.name }</h2>
                    </Accordion.Header>

                    <Accordion.Body className={classes.accordionBody}>
                        <div className={classes.bookmarkContainer}>
                            <div className={classes.btnCont}>
                                <button onClick={ addBookmark }>
                                    <AddCircleSharpIcon />
                                </button>
                            </div>

                            {map(bookmarks , bookmark => {
                                    if(item._id === bookmark.catId) {
                                        return <Bookmark key={bookmark._id} bookmark = {bookmark} />
                                    } else return false;
                                })
                            }

                        </div>
                    </Accordion.Body>

                </Accordion.Item>

            </Accordion>
        </div>

        < ModalSiteCont
                showModal={showAddBookmark}
                setShowModal={setShowAddBookmark}
                titleModal={'הוספת BOOKMARK חדש'}
                modalSize='lg' //sm xl lg
                childrens={<RtlMaterialCont content={ < AddBookmark item = {item} reloadBookmark = { reloadBookmark } /> } />}
        />

        

    </Fragment>
  )
}

function AddBookmark(props) {

    const {reloadBookmark, item} = props

    const formFields = [
        {
            name : "title",
            placeholder: "כותרת",
            type: 'text',
            defaultValue: '',
            error: '*שדה חובה'
        },
        {
             name : "url",
             placeholder: "url",
             type: 'text',
             defaultValue: '',
             error: '*שדה חובה'
         },
         {
             name : "notes",
             placeholder: "הערות",
             type: 'text',
             defaultValue: '',
             error: '*שדה חובה'
         }
 
    ]

    //const [addBookmak, setAddBookmak] = useState('');
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

    if(validator.isEmpty(formData.title)) {

        setAreErrors('נא להזין כותרת');

    } 
    
    else if(validator.isEmpty(formData.url) ) {
        setAreErrors('נא להזין url');
    }
    
    else {
        setAreErrors(false);
    }    

}, [formData])

    function onSubmit() { 
            
        setShowErrors(true);
        setAreErrors(true);

        if(areErrors ) {

            toast.warning(areErrors);

        }
        
        else {

            formData.catId = item._id;

            console.log('formData', formData)
            sendNewBookmark(setLoading,formData,reloadBookmark);
        }

    }

    return(
        <div className={classes.addBookmakModal}>

        <FormControl  className={classes.formControl} >
            <TextField 
                name={formFields[0].name}
                onChange={ onChange }
                //multiline
                value={formData[formFields[0].name]}
                label={formFields[0].placeholder}
                error={ showErrors && !formData[formFields[0].name] }
            />
        </FormControl>

        <FormControl  className={classes.formControl} >
            <TextField 
                name={formFields[1].name}
                onChange={ onChange }
                //multiline
                value={formData[formFields[1].name]}
                label={formFields[1].placeholder}
                error={ showErrors && !formData[formFields[1].name] }
            />
        </FormControl>

        <FormControl  className={classes.formControl} >
            <TextField 
                name={formFields[2].name}
                onChange={ onChange }
                multiline
                value={formData[formFields[2].name]}
                label={formFields[2].placeholder}
                //error={ customCat && (customCat.length < 3 || customCat.length > 50) ? true : false }
            />
        </FormControl>
            
        <Button className={`customBtn_violet bounce3`} disabled={loading} variant={'primary'} size="lg" onClick={ onSubmit }>
            {loading ? <Spinner size="" animation="border" variant="light" /> : <span>הוספה &raquo;</span> }
        </Button>
            
        </div>
    )

    function defaultValueForm(formFields) {
    
        let objReturn = {};
    
        map(formFields, item => {
                  
            objReturn[item.name] = item.defaultValue
            
          })
    
        return objReturn;
    
    }


}
