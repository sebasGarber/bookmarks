import React, { useState } from 'react'
import Loading from '../utils/Loading';
import CategoriesIndex from './CategoriesIndex';
import classes from './user-console.module.scss'

export default function UserConsoleIndex(props) {

  const { categories } = props

  return (
    <div className={classes.categoriesIndex} >
        <CategoriesIndex categories = { categories } />
    </div>
  )
}
