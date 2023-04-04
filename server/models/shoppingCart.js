const { Schema, model } = require('mongoose');

const menuItemSelectedSchema = new Schema({
    menuItem: {
        type: Schema.Types.ObjectId,
        ref:'menu',
        required:true,
    },
    selectedIngredients:[{
        type: Schema.Types.ObjectId,
        ref:'ingredients'
    }]
});

const shoppingCartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        price: {
            type: Number,
        },
        menuItems: [{
            menuItemSelectedSchema
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
