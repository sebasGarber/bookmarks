import React from 'react'
import classes from "./main-navigation.module.scss"
import {  signOut } from 'next-auth/client'; //npm install --save-exact next-auth@3
import TextTruncate from 'react-text-truncate'; //https://www.npmjs.com/package/react-text-truncate
//npm install react-text-truncate

export default function MainNavigation(props) {

    const { userData } = props

  return (
    <div className={classes.mainNavigation}>
        <div className={classes.right}>
            <TextTruncate  line={1}
                element="span"
                truncateText="…"
                text={`שלום: ${userData?.user?.name}`}
                //textTruncateChild={<a href="#">Read on</a>}
            />
        </div>
        <div className={classes.center}>Bookmarks Saver</div>
        <div className={classes.left}>
            <button onClick={()=> signOut()}>התנתק</button>
        </div>
    </div>
  )
}
