import { toast } from "react-toastify";
import { sendToLocalApi2 } from "../../lib/sendToLocalApi";

export default async function getCategories(setLoading,setCategories) {

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

  export async function sendCategories(setLoading,allCategories,reloadCategories) {

    const data = {
      url: 'categories',
      controller: 'categories',
      objectToSend : {
        allCategories : allCategories
      }
    }

    const responseData = await sendToLocalApi2(data, setLoading, 'POST');

    console.log('responseData',  responseData);

    if(responseData?.error) {
      toast.error(responseData?.error);
      return;
    }

    if(!responseData?.post) {
        toast.error('שגיאה');
      return;
    }

    toast.success('כל הכבודת התחלנו!...');
    reloadCategories();
    //setCategories(responseData.get);

  }


export async function getAllBookmarks(setLoading,setBookmarks) {

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