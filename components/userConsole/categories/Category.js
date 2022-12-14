import React, { Fragment, useEffect, useState } from 'react'
import validator from "validator"; //npm install validator
import { toast } from 'react-toastify' 
import { countBy, map } from "lodash"
import { deleteMyBookMark, editBookmark, editBookmarkApi, removeCategoryApi, sendNewBookmark } from '../userConsoleFunctions';
import Bookmark from './Bookmark';
import { Accordion } from 'react-bootstrap';
import classes from './../user-console.module.scss'

import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';

import ModalSiteCont from '../../utils/ModalSiteCont';
import RtlMaterialCont from '../../utils/RtlMaterialCont';

import { Button, Spinner } from "react-bootstrap"; //npm install react-bootstrap@next bootstrap@5.1.0
import TextField from '@mui/material/TextField';
import FormControl from '@material-ui/core/FormControl';

export default function Category(props) {

    const { item, reloadCategories, reloadBookmark, bookmarks } = props

    const [showAddBookmark, setShowAddBookmark] = useState(false);
    const [editBookmark, setEditBookmark] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const [, setLoading] = useState(false)

    const addBookmark = () => { 
        setShowAddBookmark(!showAddBookmark);
    }

    const removeCategory = () => { 
        //console.log('remove');

        let obj = countBy(bookmarks, (rec) => {
            return rec.catId === item._id;
        });

        const count = parseInt(obj?.true ? obj.true : 0);

        if(count > 0) {
            setShowConfirm(count);
        } else {

            removeCategoryApi(setLoading,item._id, reloadCategories);

        }

    }

    const removeMe = () => { 
        removeCategoryApi(setLoading,item._id, reloadCategories);
     }

     const editMe = (bookmark) => { 
        setEditBookmark(bookmark);
        //console.log('bookmark', bookmark);
    }

    
    const deleteMe = (bookmark) => { 
        deleteMyBookMark(setLoading,bookmark._id, reloadCategories);
    }

    
    

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

                                {!showConfirm ? <button onClick={ () => removeCategory() }>
                                    <RemoveCircleSharpIcon />
                                </button> : <div style={{textAlign: 'right'}} className='animate__animated animate__fadeIn'>
                                    <span>???? {showConfirm} bookmarks, ???????? ?????????? ???????</span><br/>
                                    <button style={{color: 'red'}} onClick={ () => removeMe() } >??????????</button>{' | '}<button onClick={ ()=> setShowConfirm(false) }>??????????</button>
                                </div> }

                                <button onClick={ addBookmark }>
                                    <AddCircleSharpIcon />
                                </button>
                                
                            </div>

                            {map(bookmarks , bookmark => {
                                    if(item._id === bookmark.catId) {
                                        return <Bookmark key={bookmark._id} bookmark = {bookmark} editMe = { (bookmark) => editMe(bookmark)} deleteMe = { (bookmark) => deleteMe(bookmark) } />
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
                titleModal={'?????????? BOOKMARK ??????'}
                modalSize='lg' //sm xl lg
                childrens={<RtlMaterialCont content={ < AddBookmark item = {item} reloadBookmark = { reloadBookmark } /> } />}
        />

        < ModalSiteCont
                showModal={editBookmark}
                setShowModal={setEditBookmark}
                titleModal={'?????????? Bookmark'}
               
                modalSize='lg' //sm xl lg
                childrens={<RtlMaterialCont content={ < EditBookmark  bookmark = {editBookmark} item = {item} reloadBookmark = { reloadBookmark } /> } />}
        />

        

    </Fragment>
  )
}

function AddBookmark(props) {

    const {reloadBookmark, item} = props

    const formFields = [
        {
            name : "title",
            placeholder: "??????????",
            type: 'text',
            defaultValue: '',
            error: '*?????? ????????'
        },
        {
             name : "url",
             placeholder: "url",
             type: 'text',
             defaultValue: '',
             error: '*?????? ????????'
         },
         {
             name : "notes",
             placeholder: "??????????",
             type: 'text',
             defaultValue: '',
             error: '*?????? ????????'
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

        setAreErrors('???? ?????????? ??????????');

    } 
    
    else if(validator.isEmpty(formData.url) ) {
        setAreErrors('???? ?????????? url');
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

            //console.log('formData', formData)
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
            {loading ? <Spinner size="" animation="border" variant="light" /> : <span>?????????? &raquo;</span> }
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

function EditBookmark(props) {

    const {reloadBookmark, bookmark} = props

    const formFields = [
        {
            name : "title",
            placeholder: "??????????",
            type: 'text',
            defaultValue: '',
            error: '*?????? ????????'
        },
        {
             name : "url",
             placeholder: "url",
             type: 'text',
             defaultValue: '',
             error: '*?????? ????????'
         },
         {
             name : "notes",
             placeholder: "??????????",
             type: 'text',
             defaultValue: '',
             error: '*?????? ????????'
         }
 
    ]

    //const [addBookmak, setAddBookmak] = useState('');
    const [formData, setFormData] = useState(defaultValueForm(formFields, bookmark))
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

        setAreErrors('???? ?????????? ??????????');

    } 
    
    else if(validator.isEmpty(formData.url) ) {
        setAreErrors('???? ?????????? url');
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

            formData.id = bookmark._id;

            //console.log('formData', formData)
            editBookmarkApi(setLoading,formData,reloadBookmark);
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
            {loading ? <Spinner size="" animation="border" variant="light" /> : <span>?????????? &raquo;</span> }
        </Button>
            
        </div>
    )

    function defaultValueForm(formFields,bookmark) {
    
        let objReturn = {};
    
        map(formFields, item => {
                  
            objReturn[item.name] = bookmark[item.name] ?   bookmark[item.name] :  item.defaultValue;
            
          })


    
        return objReturn;
    
    }


}
