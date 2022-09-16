import React, { useState } from 'react'
import CategoriesMenu from './categories/CategoriesMenu';
import CategoriesIndex from './CategoriesIndex';
import classes from './user-console.module.scss'

export default function UserConsoleIndex(props) {

  const { categories, reloadCategories, reloadCategoriesInsert, searchCat, searchCatValue } = props
  
  return (
    <div className={classes.categoriesIndex} >
        <CategoriesMenu reloadCategoriesInsert = {reloadCategoriesInsert} searchCat = {searchCat} searchCatValue = {searchCatValue} />
        <CategoriesIndex categories = { categories } reloadCategories = {reloadCategories} />
    </div>
  )
}
