const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
  
    // Run your code here, after you have insured that the connection was made

    // const newRecipes = Recipe.create({ title: 'Food' });

    // console.log(Recipe.title);


    const newRecipes = new Recipe({

          title: "new Food",
          cuisine: "chips",  
          level: "Easy Peasy",   
        })

       return newRecipes.save()
    
  }).then(() => {

   return  Recipe.insertMany(data)
  }).then(() => {


    return Recipe.findOneAndUpdate({ title:"Rigatoni alla Genovese"}, { duration:100 })
  }).then(() => {


    return Recipe.findOneAndDelete({ title: "Carrot Cake" });

  }).then(() => {
    
    console.log("Deleted");
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
