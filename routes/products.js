const express = require('express')
const router = express.Router()
const { products_data, products_variant } = require('../models/productModel')

// GET ALL PRODUCTS ROUTE

router.get('/', async (req, res) => {
    // res.send("WELCOME TO PRODUCT PAGE")
    // display all products
    const allProducts = await products_data.find()
        .populate('variants')

    res.json(allProducts)

})

// GET ALL VARIANTS ROUTE ( FOR TESTING PURPOSES )

router.get('/var', async (req, res) => {
    // res.send("VIEW VARIANT PAGE")
    // display all variants

    const allVariants = await products_variant.find()

    res.json(allVariants)

})

// ADD PRODUCTS ROUTE

router.post('/addProducts', async (req, res) => {

    // create new products and save

    const newProduct = new products_data(
        {
            product_name: "Jubikee Scott",
            product_brand: "Bikee",
        },
    )

    await newProduct.save()

    // find for id reference of newProducts

    const findProduct = await products_data.findById(
        {
            _id: newProduct._id
        }
    )

    // create new variant and store the req.body in test arr, 

    const test = [
        {
            variant_size: "US_1",
            variant_price: 11,
        },
        {
            variant_size: "US_2",
            variant_price: 22,
        },
        {
            variant_size: "US_3",
            variant_price: 33,
        },
    ]

    // Iterate the objects in the array then save and push

    for (const object of test) {

        object.products = newProduct._id

        const newVariant = await products_variant(
            object
        )

        await newVariant.save()
        await findProduct.variants.push(newVariant)
    }

    // save the updated new product

    await findProduct.save()

    res.json(findProduct)

})

// EDIT PRODUCT ROUTE

router.put('/editProduct', async (req, res) => {

    const updateProduct = await products_data.findByIdAndUpdate(

    )
        .populate('variants')


    res.json(updateProduct)

})


// DELETE PRODUCTS ROUTE

router.delete('/del', async (req, res) => {

    const toDelete = await products_data.findByIdAndDelete({ _id: "6564223eae83199852f80d1a" })
    await products_variant.deleteMany({ _id: toDelete.variants })
    res.json(toDelete)
})

module.exports = router;