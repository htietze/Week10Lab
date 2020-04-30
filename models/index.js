let Sequelize = require('sequelize');

// setting the process environment? using the development options from the config
let env = process.env.NODE_ENV || 'development';
let config = require(__dirname + '/../config.json')[env];

let db = {};

let sequelize;

// Not quite sure what this is doing. If the config is set to the env value, then 
// sequelize is initialized with those rules?
// If not, then it's made using.. I don't know? one uses the development environment value if it's found?
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    sequelize = new Sequelize(config)
}

// the student.js file has all the database information for the columns,
const model = sequelize['import']('./student.js')
// and builds a database using that for the model
db[model.name] = model;

// sequelizes it a bunch. for db management?
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;