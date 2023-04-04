const { Schema, model } = require('mongoose');

const shoppingCartSchema = new Schema(
    {

        name: {
            type: String,
            required: true,
        },
        imagePath: {
            type: String,
        },
        price:{
            type: Number,
        },
        menuItems:[{
            type: Schema.Types.ObjectId,
            ref:'menu'
        }],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)

const ShoppingCartModel = model('shoppingCart', shoppingCartSchema);

module.exports = ShoppingCartModel;
