const { Schema, model } = require('mongoose');

const menuItemSelectedSchema = new Schema({
    menuItem: {
        type: Schema.Types.ObjectId,
        ref: 'menu',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const shoppingCartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'Users'
        },
        price: {
            type: Number,
        },
        menuItems: {
            type: [menuItemSelectedSchema],
            required:true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)

const ShoppingCartModel = model('shoppingCart', shoppingCartSchema);

module.exports = ShoppingCartModel;
