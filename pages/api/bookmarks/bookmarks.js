import { getSession } from 'next-auth/client'
import conectToMongo from '../../../lib/conectToMongo';

const {Bookmark, validate} = require('../../../dbModels/bookmark');


async function handler(req, res) {

    const session = await getSession({ req : req });
    if (!session) { //Not authenticated!
        res.status(401).json({
            message: 'Not authenticated!'
        });
        return;
    }

    conectToMongo();
    
    const reqBody = req?.body?.objectToSend;
    

    //https://mongoosejs.com/docs/queries.html

    if(req.method === 'GET') {
        
        const bookmarks = await Bookmark.find({ uid : session?.user?.image?.uid }).sort('name');

        res.status(200).json({
            message: 'Hellow',
            get: bookmarks 
        });
        return;

    }

    reqBody.uid = session?.user?.image?.uid;

    if(req.method === 'POST') {

        
        const { error } = validate(reqBody); 
        if (error) return res.status(400).json({error : error.details[0].message});
      
        const exist = await Bookmark.findOne({ url: reqBody.url,  catId: reqBody.catId, uid: reqBody.uid });
        if (exist) return res.status(400).json({error : 'קיים'});

        const  bookmark = new  Bookmark({ 
            url: reqBody.url,
            title: reqBody.title,
            notes: reqBody.notes,
            catId: reqBody.catId,
            uid: reqBody.uid 
        });
        
        await  bookmark.save();
        
        res.status(200).json({
            post: 'OK',
            message: 'OK',
            insert: bookmark
        });
        return;

    }

    if(req.method === 'PUT') {

        if(!req?.body?.id) {
            return res.status(400).json({error : 'אין ID'});   
        }

        const bookmark = await Bookmark.findByIdAndUpdate(req?.body?.id, { url: reqBody.url }, {
            new: true
          });
        
        if (!bookmark) return res.status(404).send('לא נמצאת');

        res.status(200).json({
            message: 'OK',
            update: bookmark
        });
        return;

    }

    if(req.method === 'DELETE') {

      
        if(!req?.body?.id) {
            return res.status(400).json({error : 'אין ID'});   
        }

        const bookmark = await Bookmark.findByIdAndRemove(req?.body?.id);
        
        if (!bookmark) return  res.status(400).json({error : 'לא נמצאת'});

        res.status(200).json({
            message: 'OK',
            delete: bookmark
        });
        return;

    }
    
 
    

}

export default handler;

