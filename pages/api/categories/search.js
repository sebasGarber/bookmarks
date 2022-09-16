import { isEmpty, map } from 'lodash';
import { getSession } from 'next-auth/client'
import conectToMongo from '../../../lib/conectToMongo';

const {Category, validate} = require('../../../dbModels/category');

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

    reqBody.uid = session?.user?.image?.uid;

    if(req.method === 'POST') {


        const categories = await Category.find({ uid : session?.user?.image?.uid, name : {$regex: reqBody.searchValue, $options: 'i'} }).sort('name');

        if(isEmpty(categories)) {

            res.status(200).json({
                message: 'Hellow',
                warning: 'לא נמצאו קטגוריות' 
            });
            return;

        } else {

            res.status(200).json({
                message: 'Hellow',
                get: categories 
            });
            return;

        }

        


               
        const exist = await Category.findOne({ name: data.name, uid: data.uid });
        if (exist) return res.status(400).json({error : 'הקטגוריה קיימת'});

        const category = new Category(data);
        await category.save();

        
        
        res.status(200).json({
            get : 'ok'
        });
        return;

    }

    if(req.method === 'PUT') {

        if(!req?.body?.id) {
            return res.status(400).json({error : 'אין ID'});   
        }

        const category = await Category.findByIdAndUpdate(req?.body?.id, { name: reqBody.name }, {
            new: true
          });
        
        if (!category) return res.status(404).send('הקטגוריה לא נמצאת');

        res.status(200).json({
            message: 'OK',
            update: category
        });
        return;

    }

    if(req.method === 'DELETE') {

        if(!req?.body?.id) {
            return res.status(400).json({error : 'אין ID'});   
        }

        const bookmarks = await Bookmark.deleteMany({ catId : req?.body?.id });
        const category = await Category.findByIdAndRemove(req?.body?.id);
        
        if (!category) return  res.status(400).json({error : 'הקטגוריה לא נמצאת'});

        res.status(200).json({
            message: 'OK',
            delete: category,
            bookmarks : bookmarks
        });
        return;

    }
    
 
    

}

export default handler;

