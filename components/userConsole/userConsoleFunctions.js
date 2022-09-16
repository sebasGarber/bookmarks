import { size } from "lodash";
import { toast } from "react-toastify";
import { sendToLocalApi2 } from "../../lib/sendToLocalApi";

export default async function getCategories(setLoading,setCategories) {

    setLoading(true);

    const data = {
      url: 'categories',
      controller: 'categories',
      objectToSend : {}
    }

    const responseData = await sendToLocalApi2(data, setLoading, 'GET');

    if(responseData?.error) {
      toast.error(responseData?.error);
      return;
    }

    if(!responseData?.get) {
        toast.error('שגיאה');
      return;
    }

    setCategories(responseData.get);

  }

  
  export async function searchCategories(setLoading,setCategories,searchValue) {

    setLoading(true);

    const data = {
      url: 'search',
      controller: 'categories',
      objectToSend : {
        searchValue : searchValue
      }
    }

    const responseData = await sendToLocalApi2(data, setLoading, 'POST');

    if(responseData?.error) {
      toast.error(responseData?.error);
      return;
    }

    else if(responseData?.warning) {
      toast.warning(responseData?.warning);
      return;
    }
    
    else if(!responseData?.get) {
        toast.error('שגיאה');
        
      return;

    } else {

      setCategories(responseData.get);

    }

    

  }

  export async function sendCategories(setLoading,allCategories,reloadCategoriesInsert) {

    const data = {
      url: 'categories',
      controller: 'categories',
      objectToSend : {
        allCategories : allCategories
      }
    }

    const responseData = await sendToLocalApi2(data, setLoading, 'POST');

    //console.log('responseData',  responseData);

    if(responseData?.error) {
      toast.error(responseData?.error);
      return;
    }

    if(!responseData?.post) {
        toast.error('שגיאה');
      return;
    }

    toast.success('כל הכבודת התחלנו!...');
    reloadCategoriesInsert();
    

  }

  
  export async function removeCategoryApi(setLoading,catId,reloadCategories) {

    const data = {
      url: 'categories',
      controller: 'categories',
      id: catId,
      objectToSend : {}
    }

    const responseData = await sendToLocalApi2(data, setLoading, 'DELETE');

    //console.log('responseData',  responseData);

    if(responseData?.error) {
      toast.error(responseData?.error);
      return;
    }

    if(!responseData?.delete) {
        toast.error('שגיאה');
      return;
    }

    toast.success('נמחק בהצלחה');
    reloadCategories();
    //setCategories(responseData.get);

  }

export async function getAllBookmarks(setLoading,setBookmarks) {

  setLoading(true);

const data = {
    url: 'bookmarks',
    controller: 'bookmarks',
    objectToSend : {}
}

const responseData = await sendToLocalApi2(data, setLoading, 'GET');

if(responseData?.error) {
    toast.error(responseData?.error);
    return;
}

if(!responseData?.get) {
    toast.error('שגיאה');
    return;
}

setBookmarks(responseData.get);

}


export async function sendNewBookmark(setLoading,objectToSend,reloadBookmark) {

    const data = {
      url: 'bookmarks',
      controller: 'bookmarks',
      objectToSend : {
        title : objectToSend.title,
        url : objectToSend.url,
        notes : objectToSend.notes,
        catId : objectToSend.catId
      }
    }

    const responseData = await sendToLocalApi2(data, setLoading, 'POST');

    if(responseData?.error) {
      toast.error(responseData?.error);
      return;
    }

    if(!responseData?.post) {
        toast.error('שגיאה');
      return;
    }

    toast.success('נוסף בהצלחה!');
    reloadBookmark();
    //setCategories(responseData.get);

  }


export async function editBookmarkApi(setLoading,objectToSend,reloadBookmark) {

  const data = {
    url: 'bookmarks',
    controller: 'bookmarks',
    id: objectToSend.id,
    objectToSend : {
      title : objectToSend.title,
      url : objectToSend.url,
      notes : objectToSend.notes,
      catId : objectToSend.catId
    }
  }

  const responseData = await sendToLocalApi2(data, setLoading, 'PUT');

  if(responseData?.error) {
    toast.error(responseData?.error);
    return;
  }

  if(!responseData?.update) {
      toast.error('שגיאה');
    return;
  }

  toast.success('עודכן בהצלחה');
  reloadBookmark();
  //setCategories(responseData.get);

}


export async function deleteMyBookMark(setLoading,bookmarkId,reloadBookmark) {

  const data = {
    url: 'bookmarks',
    controller: 'bookmarks',
    id: bookmarkId,
    objectToSend : {}
  }

  const responseData = await sendToLocalApi2(data, setLoading, 'DELETE');

  if(responseData?.error) {
    toast.error(responseData?.error);
    return;
  }

  if(!responseData?.delete) {
      toast.error('שגיאה');
    return;
  }

  toast.success('נמחק בהצלחה');
  reloadBookmark();
  //setCategories(responseData.get);

}

  