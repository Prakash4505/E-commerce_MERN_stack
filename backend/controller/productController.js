const ErrorHandler = require("../utils/erorHandler")
const Product = require("../model/model")
const catchasyncerror = require("../middleware/catchasyncerror");
const ApiFeatures = require("../utils/apifeature");

// Create products 

exports.createProduct = catchasyncerror(
    async (req, res, next) => {
        const product = await Product.create(req.body);
        res.status(200).json({
            success: true,
            product
        })

    }
)

// Get all Products

exports.getAllProducts = catchasyncerror(async (req, res) => {
    const resultPerPage = 5 ;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        products
    })

})

// Get Product details 

exports.getProductDetails = catchasyncerror(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
        productCount,
    })


})

// update product

exports.updateProduct = catchasyncerror(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
})

// delete product 

exports.deleteProduct = catchasyncerror(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndDelete(req.params.id, req.body)


    res.status(202).json({
        success: true,
        messege: "Product has been deleted"
    })
})