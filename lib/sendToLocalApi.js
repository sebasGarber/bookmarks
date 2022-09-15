export default async function sendToLocalApi(data, setLoading)  {


   /* const data {
        url: 'getAssigns',
        controller: 'assigns',
        objectToSend : {
          send: '1',
        }
    } */

    if(setLoading) {setLoading(true);}
    

    try {

        const response = await fetch('/api/sendToCI/restrictedApi', {

            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        
        })
        
        const responseData = await response.json();

        if( responseData && setLoading ) { setLoading(false); }

        return responseData;

    } catch (e) {

        console.log(e);

        if(setLoading) {setLoading(false);}

        //toast.error('שגיאה בשרת');
        return {};
        
    }
}



export async function sendToLocalApi2(data, setLoading, method)  {


    /* const data {
         url: 'getAssigns',
         controller: 'assigns',
         objectToSend : {
           send: '1',
         }
     } */
 
     if(setLoading) {setLoading(true);}
     
 
     try {

        const apiUrl = `/api/${data.controller}/${data.url}`;
 
        let config = {};
        
        if(method !== 'GET') {

            config = {
 
                method: method,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            
            }

        } else {

            config = {
 
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            
            }

        }

        const response = await fetch(apiUrl, config);
         
         const responseData = await response.json();
 
         if( responseData && setLoading ) { setLoading(false); }
 
         return responseData;
 
     } catch (e) {
 
         console.log(e);
 
         if(setLoading) {setLoading(false);}
 
         //toast.error('שגיאה בשרת');
         return {};
         
     }
 }

