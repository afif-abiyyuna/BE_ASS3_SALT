const Product = require ('../Models/Product.model');
const formidable = require ('formidable');
const fs = require ('fs');
const productDao = require ('./product.Dao');

class productController{
    static postProduct (req,res,next){
        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, (err,fields,files)=>{
            if(err){
                return res.status(400).json({message:'Image cant be uploaded'});
            }
            console.log(files.image);
            const{productname,description,price,total,shortdescription} = fields;
            if(!productname||!description||!price||!total||!shortdescription){
                return res.status(400).json({message:'Fields must be filled'});
            }
            const product = new Product(fields)
            if(files.image && files.thumbnail){
                if(files.image.size > 1000000 && files.thumbnail.size > 1000000){
                    return res.status(400).json({message:'Images size is too big'}) 
                }
            }
            product.image.data = fs.readFileSync(files.image.path)
            product.image.contentType = files.image.type
            product.thumbnail.data = fs.readFileSync(files.thumbnail.path)
            product.thumbnail.contentType = files.thumbnail.type

            product.save()
            .then((result)=>{
                if(result){
                    res.status(200).json({message:'Succes to upload image', result});
                } else{
                    res.status(400).json({message:'error to upload image'});
                }
            })
            .catch(next);
        })
    }

    static listProduct (req,res,next){
        Product.find()
        .populate('categories')
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(next);
    }

    static getProductId (req,res,next, _id){
        let query = {_id:_id}
        productDao.getProduct(query)
        .then(result=>{
            req.product = result.product;
            next()
        })
        .catch({name:'PRODUCT INVALID'});
    }

    static getDetail (req,res,next){
        const{productId} = req.params;
        Product.findById(productId)
        .populate('categories')
        .then(result=>{
            res.status(200).json({message:'success get product by id', message:result});
        })
        .catch(next);
    }

    static updateProduct (req,res,next){
        const {productname,thumbnail,image,description,price,total,shortdescription} = req.body;
        const {productId} = req.params;
        const updatedData = {productname,thumbnail,image,description,price,total,shortdescription}

        for (let key in updatedData){
            if(!updatedData[key]){
              delete updatedData[key]
            }
        }

        Product.findByIdAndUpdate(productId, updatedData, {new:true})
        .then(result=>{
            res.status(200).json({message:'success to update data by id', data:result});
        })
        .catch(next);
    }

    static deleteProduct (req,res,next){
        const {productId} = req.params;
        Product.findByIdAndDelete(productId)
        .then(result=>{
            res.status(200).json({message:'success to delete product', data:result});
        })
        .catch(next);
    }

    static productPatchCategory (req,res,next){
        const {categoryId} = req.body;
        Product.findByIdAndUpdate(
            req.params.productId,
            {$push:{categories:categoryId}},
            {new:true}
        )
        .then(result=>{
            res.status(200).json({message:'success to patch category product', data:result});
        })
        .catch(next);
    }

    static viewImageProduct (req,res,next){

       console.log(req.product.image);
        if(req.product.image.data){
            res.set('Content-Type', req.product.image.contentType)
            return res.send(req.product.image.data)
        }
        next();
    }

    static async productAll (req,res,next){
        const {page = 1, limit = 4, q = ''} = req.query;
        try {
            const product = await Product.find({ productname: { '$regex': q, '$options': 'i' } })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec()
            const nextpage = parseInt(page) + parseInt('1')
            const previouspage = parseInt(page) - parseInt('1')
            const jumlahData = await Product.countDocuments({ productname: { '$regex': q, '$options': 'i' } })
            const jumlahPage = Math.ceil(jumlahData / limit)
            var npg, ppg
            if(parseInt(page) === parseInt(jumlahPage) && parseInt(page) === 1){
                npg = null
                ppg = null
            } else if(parseInt(page) === parseInt(jumlahPage)){
                ppg = 'http://localhost:3000/product/all?page=' + previouspage
                npg = null
            } else if(parseInt(page) === 1){
                npg = 'http://localhost:3000/product/all?page=' + nextpage
                ppg = null
            } else {
                npg = 'http://localhost:3000/product/all?page=' + nextpage
                ppg = 'http://localhost:3000/product/all?page=' + previouspage
            }
            res.status(200).json({product, page:page, totalpage:jumlahPage, nextpages:npg, previouspages:ppg});
        }
        catch(error){console.log(error.message)}
    }
}

module.exports = productController;