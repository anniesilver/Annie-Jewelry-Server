// import seed data files, arrays of objects
const usersData = require('../seed-data/users');
const categoryData = require('../seed-data/category');
const productsData = require('../seed-data/products');
const collectionyData = require('../seed-data/collection');


exports.seed = async function(knex) {
    await knex('users').del();
    await knex('products').del();
    await knex('category').del();
    await knex('collection').del();

    
    await knex('users').insert(usersData);
    await knex('category').insert(categoryData);
    await knex('collection').insert(collectionyData);
    await knex('products').insert(productsData);
};   
