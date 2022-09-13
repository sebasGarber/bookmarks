import React, { useEffect } from 'react'
import {  signOut, getSession } from 'next-auth/client'; //npm install --save-exact next-auth@3
import { useRouter } from 'next/router';

export default function index() {

    const router = useRouter();

    useEffect(() => {
    
        getSession().then(session => {
    
          if (session) {
            console.log('session', session);
          } else {
            router.replace('/');
          }
    
        })
    
      }, [])


  return (
    <div>
        <button onClick={()=> signOut()}>Sing Out</button>
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
      props: { session }
    }
    
  
  }