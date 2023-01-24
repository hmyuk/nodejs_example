const express = require('express');
const { Comment2 } = require('../models');


const router = express.Router();

router.post('/' , async(req, res, next) =>{
    try{
        const comment = await Comment2.create({
            commenter : req.body.id,
            comment : req.body.comment
        })
        console.log(comment);
        res.status(201).json(comment);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.route('/:id')
.patch(async (req, res, next) =>{
    try{
        const result = await Comment2.update({
            comment : req.body.comment
        },{
            where: { id: req.params.id}
        });
        res.json(result);

    }catch(err){
        console.error(err);
        next(err);
    }
})
.delete(async (req, res, next) =>{
    try{
        const result = await Comment2.destroy({ where : { id: req.params.id}});
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;