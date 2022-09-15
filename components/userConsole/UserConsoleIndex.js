import React, { useState } from 'react'
import CategoriesIndex from './CategoriesIndex';
import classes from './user-console.module.scss'

export default function UserConsoleIndex(props) {

  const { categories } = props

  //useEffect(() => {getCategories(setLoading,setCategories);}, [])

  const [loading, setLoading] = useState(false);

  if(loading) {return (<p>Loading...</p>)}

  return (
    <div className={classes.categoriesIndex} >
        <CategoriesIndex categories = { categories } />
    </div>
  )
}
