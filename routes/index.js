const express = require('express');
const router = express.Router();
const moment = require('moment');
const BookMark = require('../modules/Bookmark'); 

router.get('/' , async (req,res) => {

    try{
        const bookmarks = await BookMark.find().sort({createdAt : 'desc'});
        
        res.render('dashboard' , {
            moment : moment ,
            bookmarks
        });
        
    }catch(err){
        console.log(err);
        res.render('error')
    }

})

router.get('/addBookMark' , (req,res) => {
    res.render('addBookMark');
});

router.post('/addBookMark' , async (req,res) => {
    try{
        await BookMark.create(req.body);
        res.redirect('/');
    }
    catch(err) {
        console.log(err);
        res.render('error');
    }
});

router.get('/delete/:id' ,async (req,res) => {
    try{
        await BookMark.remove({_id : req.params.id})
        res.redirect('/');
    }
    catch(err){
        console.log(err);
        return res.render('error');
    }
});


router.get('/edit/:id'  ,async (req,res) => {
    try{
        const bookmark = await BookMark.findOne({
            _id: req.params.id
        });

        if(!bookmark){
            return res.render('error');
        }
        else{
            res.render('edit',{
                bookmark
            })
        }
    }
    catch(err){
        console.log(err);
        return res.render('error');
    }
})

router.post('/edit/:id' ,async (req,res) => {
    try{

        let bookmark = await BookMark.findById(req.params.id);

        console.log(bookmark);
        if(!bookmark){
            console.log("========")
            res.render('error');
        }
        else{
            const date = new Date();
            req.body.updatedAt = date; 
            bookmark = await BookMark.findOneAndUpdate({_id : req.params.id} , req.body ,{
                new : true,
                runValidators : true
            })

            res.redirect('/')
        }
    }
    catch(err){
        console.log(err)
        return res.render('error')
    }
})




module.exports = router