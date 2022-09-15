
import React, { useEffect, useState } from 'react'
import {  getSession } from 'next-auth/client'; //npm install --save-exact next-auth@3
import StartUser from '../../components/userConsole/StartUser'
import getCategories from '../../components/userConsole/userConsoleFunctions';
import UserConsoleIndex from '../../components/userConsole/UserConsoleIndex';
import { isEmpty } from 'lodash';
import Loading from '../../components/utils/Loading';

export default function index(props) {

  //console.log(props);
  const { userData  } = props

  const [ categories, setCategories ] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {getCategories(setLoading,setCategories);}, [])
  const reloadCategories = () => {
    console.log('reload');
    getCategories(setLoading,setCategories);
  }

  //console.log(' categories',  categories);

  if(loading) {
    return (<Loading open={loading} noBackdrop={false}/>)
  }

  return (
    
    <div className='userConsoleIndex'>

      {isEmpty(categories) ? <StartUser session = { userData } reloadCategories = { reloadCategories } />
       : <UserConsoleIndex categories = { categories } />}

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