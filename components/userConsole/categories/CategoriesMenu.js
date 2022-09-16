import React, { useState } from 'react'

import RtlMaterialCont from '../../utils/RtlMaterialCont';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from '@mui/material';
import { Button, Spinner } from "react-bootstrap"; //npm install react-bootstrap@next bootstrap@5.1.0

import classes from './../user-console.module.scss'
import { sendCategories } from '../userConsoleFunctions';
import { toast } from 'react-toastify';

export default function CategoriesMenu(props) {

    const {reloadCategoriesInsert, searchCat, searchCatValue } = props

  return (
    <div className={classes.CategoriesMenu}>
        <ul>
            <li>
                <RtlMaterialCont content={ <SearchCat searchCat = { searchCat } searchCatValue = {searchCatValue} /> } />
            </li>
            <li>
                <RtlMaterialCont content={ <NewCat reloadCategoriesInsert = {reloadCategoriesInsert} /> } />
            </li>
        </ul>
        
    </div>
  )
}

function NewCat(props) {

    const {reloadCategoriesInsert} = props


    const [newCat, setNewCat] = useState('');
    const [loading, setLoading] = useState(false);

    const sendCategoriesToApi = () => {

        if( newCat && (newCat.length < 3 || newCat.length > 50) ) {

            toast.error('שם הקטגוריה צריך להיות מעל 3 תווים');

        } else if(!newCat ) {

            toast.error('יש ללהזין קטגוריה');

        } else {

            const allCategories = [
                newCat
            ]
    
            sendCategories(setLoading,allCategories,reloadCategoriesInsert);

        }

     }

    return (<div className={classes.newCat}>
       <FormControl  className={classes.catForm} >
            <TextField 
                variant="filled"
                onChange={ (event)=> setNewCat(event.target.value) }
                //multiline
                value={newCat}
                label='קטגוריה חדשה'
                error={ newCat && (newCat.length < 3 || newCat.length > 50) ? true : false }
            />
        </FormControl>
        <Button className={classes.BtnMenuCat} disabled={loading} variant={'light'} size="lg" onClick={ sendCategoriesToApi }>
            {loading ? <Spinner size="" animation="border" variant="light" /> : <span>הוסף &raquo;</span> }
        </Button>
    </div>)

}

function SearchCat(props) {

    const {searchCat, searchCatValue} = props
    const [search, setSearch] = useState(searchCatValue ? searchCatValue : '');

    const sendSearch = () => {
        searchCat(search);
    }

    const clearSearch = () => { 
        searchCat('');
     }

    return (<div className={classes.newCat}>
       <FormControl  className={classes.catForm} >
            <TextField 
                variant="filled"
                onChange={ (event)=> setSearch(event.target.value) }
                //multiline
                value={search}
                label='חיפוש קטגוריה'
                error={ search && (search.length < 3 || search.length > 50) ? true : false }
            />
        </FormControl>
        <Button className={classes.BtnMenuCat} variant={'light'} size="lg" onClick={ sendSearch }>
           <span>חיפוש &raquo;</span>
        </Button>
        {searchCatValue && <Button className={classes.BtnMenuCat} variant={'primary'} size="lg" onClick={ clearSearch }>
           <span>איפוס חיפוש &raquo;</span>
        </Button> }
    </div>)

}
