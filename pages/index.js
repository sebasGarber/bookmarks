import Head from 'next/head'

import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client'; //npm install --save-exact next-auth@3
import { useEffect, useState } from 'react';

import Loading from '../components/utils/Loading';
import LoginIndex from '../components/layout/loginPage/LoginIndex';

export default function Home() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    getSession().then(session => {

      if (session) {
        router.replace('/userConsole');
      } else {
        setIsLoading(false);
      }

    })

  }, [router])
  
  if (isLoading) {
    return <Loading open={true}/>
  }

  return (
    <div className='loginPageIndex'>
      <Head>
        <title>Bookmarks</title>
        
        <meta name="description" content="Bookmarks System by Sebas" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="og:image" content="https://bookmarks-sebas.vercel.app/img/maxresdefault.jpg" />
        <meta name="canonical" content="https://bookmarks-sebas.vercel.app" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main> {/* className={styles.main} */}
        <LoginIndex />
      </main>

      
    </div>
  )
}
