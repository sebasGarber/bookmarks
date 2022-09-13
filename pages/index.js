import Head from 'next/head'
//import styles from '../styles/Home.module.css'
import LoginPageIndex from '../components/layout/loginPage/loginPageIndex'
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client'; //npm install --save-exact next-auth@3
import { useEffect, useState } from 'react';

export default function Home() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    getSession().then(session => {

      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }

    })

  }, [router])
  
  if (isLoading) {
    return <p>Loading...</p>
  }


  return (
    <div className=''> {/* {styles.container} */}
      <Head>
        <title>Bookmarks</title>
        <meta name="description" content="Bookmarks System by Sebas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main > {/* className={styles.main} */}
        <LoginPageIndex />
      </main>

      
    </div>
  )
}
