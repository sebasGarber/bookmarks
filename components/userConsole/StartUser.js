import { filter, find, isEmpty, map } from 'lodash';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { sendCategories } from './userConsoleFunctions';

import { Button, Spinner } from "react-bootstrap"; //npm install react-bootstrap@next bootstrap@5.1.0
import TextField from '@mui/material/TextField';
import FormControl from '@material-ui/core/FormControl';

import classes from './user-console.module.scss'
import RtlMaterialCont from '../utils/RtlMaterialCont';

export default function StartUser(props) {

    const {session, reloadCategoriesInsert } = props

    const [sendList, setSendList] = useState ([]);
    const [customCat, setCustomCat] = useState('');
    const [loading, setLoading] = useState(false);

    const startCategories = [
        { id: 1, name: 'חדשות' },
        { id: 2, name: 'רשתות חברתיות' },
        { id: 3, name: 'חיפושים' },
        { id: 4, name: 'ספורט' },
    ]

    //console.log('sendList', sendList);

    const sendCategoriesToApi = () => {

        let allCategories = [];

        map(sendList,item => {
            allCategories.push(item.name)
        })
        
        if( customCat && (customCat.length < 3 || customCat.length > 50) ) {

            toast.error('שם הקטגוריה צריך להיות מעל 3 תווים');

        } else if( isEmpty(allCategories) && !customCat ) {

            toast.error('יש לבחור / לרשום קטגוריה אחת לפחות');

        } else {

            if(customCat) {
                allCategories.push(customCat);
            }
    
            //console.log('allCategories', allCategories);
            sendCategories(setLoading,allCategories,reloadCategoriesInsert);

        }

     }


  return (
    <div className={classes.startUser}>
        <h1 className='animate__animated animate__bounce'>
            <strong>שלום {session.user.name}!</strong>באו נתחיל!</h1>
        <p>בחרו קטגוריות:</p>
        <ul className='newUserCat'>
            {map(startCategories,item => {
            
                if (true) {
                    return (
                        <Item key={item.id}  item = {item}  setSendList = {setSendList} sendList = {sendList} />
                    );

                } else return false;
                
            })}
        </ul>
        <h2>תרשמו גם עוד קטגוריה אחת:</h2>

        <RtlMaterialCont content={ <FormControl  className={classes.catForm} >
            <TextField 
                name='customCat'
                onChange={ (event)=> setCustomCat(event.target.value) }
                //multiline
                value={customCat}
                label='קטגוריה אישית'
                error={ customCat && (customCat.length < 3 || customCat.length > 50) ? true : false }
            />
        </FormControl>} />

        <Button className={`customBtn_violet bounce3`} disabled={loading} variant={'primary'} size="lg" onClick={ sendCategoriesToApi }>
            {loading ? <Spinner size="" animation="border" variant="light" /> : <span>התחלנו &raquo;</span> }
        </Button>

    </div>
  )
}

function Item(props) {

    const { sendList, item, setSendList } = props

    const itemExist = find(sendList, {id:item.id});

    const handler = (item) => { 

        if(!itemExist) {

            let items = sendList;
            setSendList(items.concat(item));

        } else {

            
            const filterList = filter(sendList, function(sendList) {
                return sendList.id !== item.id
            });

            //console.log('filterList', filterList);

            setSendList( filterList )

        }

    }

    return(
        <li className={itemExist ? classes.active : ''} key={item.formCode} onClick={() => handler(item)} >
            {item.name}
        </li>
    )

}
