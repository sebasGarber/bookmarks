import Head from 'next/head'
//import styles from '../styles/Home.module.css'
import LoginPageIndex from '../components/layout/loginPage/loginPageIndex'

export default function Home() {
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
