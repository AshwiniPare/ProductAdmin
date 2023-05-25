const Seller = require('../models/seller');

exports.getProducts = async(req, res, next) => {
    try {
        console.log('get products');
        const products = await Seller.findAll();
        res.status(200).json({allProducts: products});;

    } catch(error) {
        console.log('Get Products is failing '+ JSON.stringify(error));
        res.status(500).json({ error: error});
    }
};

exports.postProduct = async (req, res, next) => {
    try {
        console.log('inside post');
        const price = req.body.price;
        const name = req.body.name;
        console.log('name is '+name+' price is '+price);
        const data = await Seller.create( {price: price, name: name});
        console.log('after create');
        res.status(201).json({newProductDetail: data});
    } catch(err) {
        res.status(500).json({
            error: err
        })
    }
};

exports.deleteProduct = async(req, res, next) => {
    try {
        console.log('inside delete');
        if(req.params.id == 'undefined') {
            console.log('Id is missing');
            return res.status(404).json({err: 'Id is missing'});
        }
        const productId = req.params.id;
        await Seller.destroy({where: {id: productId}});
        res.sendStatus(200);
    } catch(error) {
        console.log('Delete Product is failing '+ JSON.stringify(error));
        res.status(500).json({ error: error});
    }
};