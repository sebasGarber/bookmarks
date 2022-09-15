import React from 'react'
import classes from './../user-console.module.scss'

export default function Bookmark(props) {

    const { bookmark } = props;

  return (
    <div className={classes.bookmark}>
        <p>{ bookmark?.title }</p>
        <p>{ bookmark?.notes }</p>
        <p>{ bookmark?.catId }</p>
        {/* <p>{ bookmark?.url }</p> */}
    </div>
  )
}
