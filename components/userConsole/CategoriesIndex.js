import { map } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react'
import Masonry from 'react-masonry-css' //npm i react-masonry-css //css on global css!!!
import Loading from '../utils/Loading';
import Category from './categories/Category';
import { getAllBookmarks } from './userConsoleFunctions';

export default function CategoriesIndex(props) {

  const { categories } = props
  //console.log('categories', categories);

  const [ bookmarks, setBookmarks ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {getAllBookmarks(setLoading,setBookmarks);}, [])
  const reloadBookmark = () => { getAllBookmarks(setLoading,setBookmarks) }

  
  
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const items = map(categories,item => {
    return <Category  key={item._id} item = {item} bookmarks = { bookmarks } reloadBookmark = {reloadBookmark} />
  });

  if(loading) {return (<Loading open={true} noBackdrop={true}/>)}

  return (
    <Fragment>
        <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">

            {items}

        </Masonry>
    </Fragment>
  )
}
