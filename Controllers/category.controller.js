const Category = require('../Models/Category.model');

class categoryController {
    static createCategory (req,res,next){
        const {category} = req.body;
        Category.create({category})
        .then(result=>{
            res.status(201).json({message:'succes to create new category', data:result});
        })
        .catch(next);
    }

    static listCategory (req,res,next){
        Category.find()
        .then(result=>{
            res.status(200).json({message:'success to get list of product category', data:result});
        })
        .catch(next);
    }

    static modifyCategory (req,res,next){
        const {category}= req.body;
        const {categoryId} = req.params;
        const updatedData = {category}

        for (let key in updatedData){
            if(!updatedData[key]){
              delete updatedData[key]
            }
        }

        Category.findByIdAndUpdate(categoryId, updatedData, {new:true})
        .then(result=>{
            res.status(200).json({message:'success to modify product category', data:result});
        })
        .catch(next);
    }

    static deleteCategory (req,res,next){
        const {categoryId} = req.params;
        Category.findByIdAndDelete(categoryId)
        .then(result=>{
            res.status(200).json({message:'success to delete product category', data:result});
        })
        .catch(next);
    }
}

module.exports = categoryController;