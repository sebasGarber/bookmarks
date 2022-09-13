import Head from 'next/head'
import LoginPageIndex from '../components/layout/loginPage/loginPageIndex'
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client'; //npm install --save-exact next-auth@3
import { useEffect, useState } from 'react';

import Loading from '../components/utils/Loading';

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main> {/* className={styles.main} */}
        <LoginPageIndex />
      </main>

      
    </div>
  )
}
