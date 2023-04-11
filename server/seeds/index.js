require("dotenv").config()
const connection = require('../config/connection');
const mongoose = require('mongoose');
const { Ingredients, Meats, Menu, Sides } = require('../models');

const ingredientsData = require('./ingredients.json');
const menuData = require('./menu.json');

const seedDatabase = async () => {
  await connection.once('open', async () => {
    connection.db.dropDatabase();
  });
  

  await connection.once('open', async () => {
    /*    const menuIngredientsCasted = menuData.map(x => {
          return {
            ingredients: x.ingredients.map(y => {
              if (y._id) {
                return {
                  _id: new mongoose.Types.ObjectId(y._id)
                }
              }
            })
          }
        })*/

    const ingredientsDataCasted = ingredientsData.map(x => {
      return {
        _id: new mongoose.Types.ObjectId(x._id.$oid),
        name:x.name,
        price:x.price,
      }
    })

    const menuDataCasted = menuData.map(x => {
      return {
        name: x.name,
        price: x.price,
        _id: x._id
      }
    })

    await Menu.create(menuDataCasted)
    console.log("finished creating Menu DataTransfer");

    await Ingredients.create(ingredientsDataCasted);
    //await Menu.create(menuIngredientsCasted);
    console.log("finished creating DataTransfer");
    process.exit(0);
  }) 
  
  };

  seedDatabase();