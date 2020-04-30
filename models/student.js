module.exports = (sequelize, DataTypes) => {

    // All of the needed information to define a Students table, 
    // columns and requirements.
    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    // set to false so the table isn't rerun if it already exists
    Student.sync({force: false}).then( () => {
        console.log('synced student table')
    })

    return Student
}