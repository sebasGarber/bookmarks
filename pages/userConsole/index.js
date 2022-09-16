
import React, { useEffect, useState } from 'react'
import {  getSession } from 'next-auth/client'; //npm install --save-exact next-auth@3
import StartUser from '../../components/userConsole/StartUser'
import getCategories, { searchCategories } from '../../components/userConsole/userConsoleFunctions';
import UserConsoleIndex from '../../components/userConsole/UserConsoleIndex';
import { isEmpty, size } from 'lodash';
import Loading from '../../components/utils/Loading';

export default function index(props) {

  //console.log(props);
  const { userData  } = props

  const [ categories, setCategories ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCatValue, setsearchCatValue] = useState('');


  useEffect(() => {
      
      getCategories(setLoading,setCategories);

  }, [])

  function reloadCategories() {

    getCategories(setLoading,setCategories);

  }

  function reloadCategoriesInsert() {
    setTimeout(() => { getCategories(setLoading,setCategories); }, 500)
  }

  const searchCat = (value) => { 

    setsearchCatValue(value);
    searchCategories(setLoading,setCategories,value);
    //console.log('value', value);

   }

  
  if(loading) {
    return (<Loading open={loading} noBackdrop={true}/>)
  }

  return (
    
    <div className='userConsoleIndex'>

      {isEmpty(categories) ? <StartUser session = { userData } reloadCategoriesInsert = {reloadCategoriesInsert} />
       : <UserConsoleIndex 
          categories = { categories }
          searchCatValue = {searchCatValue}
          searchCat = {searchCat}
          reloadCategories = { reloadCategories } reloadCategoriesInsert = {reloadCategoriesInsert} />}

    </div>
  )
}

//No session go Out...
export async function getServerSideProps(context) {

    const session = await getSession({req: context.req});
  
    if(!session) {
      return {
        //notFound: true,
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }
  
    return {
      props: { userData : session }
    }
    
  
  }