require('dotenv').config();

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
    //_id: new mongoose.Types.ObjectId(x._id.$oid),
    const ingredientsDataCasted = ingredientsData.map(x => {
      return {
        name: x.name,
        price: x.price,
      }
    })

    const menuDataCasted = menuData.map(x => {
      return {
        name: x.name,
        price: x.price,
        imagePath: x.imagePath,
        _id: x._id,
        description: x.description
      }
    })

    await Menu.create(menuDataCasted)
    console.log("finished creating Menu DataTransfer");

    await Ingredients.create(ingredientsDataCasted);
    console.log("finished creating DataTransfer");
    process.exit(0);
  }) 
  
  };

seedDatabase();