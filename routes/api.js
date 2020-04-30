let express = require('express')
let Sequelize = require('sequelize')
let db = require('../models')
let Student = db.Student

let router = express.Router()

// router.get means it.. gets data from the database, following the route
// and it looks for students using the URL addition, returning the promise in json
router.get('/students', function(req, res, next){
    Student.findAll( {order: ['starID']} ).then( students => {
        return res.json(students)
    }).catch( err => next(err))
})

// post? posts a new student to the table I think, if the student exists, it's ok'd, otherwise, 400 error
router.post('/students', function(req, res, next){
    Student.create(req.body).then( (data) => {
        return res.status(201).send('ok')
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message )
            // 400 = bad request
            return res.status(400).json(messages)
        }
    })
})

// patch, so update? edits a student using the arguments provided. 
router.patch('/students/:id', function(req, res, next){
    Student.update( req.body, { where: { id: req.params.id } })
        .then( rowsModified => {
            if (!rowsModified[0]) {
                // 404 not found, no student match found
                return res.status(404).send('Not found')
            } else {
                return res.send('ok')
            }
        }).catch( err => {
            if (err instanceof Sequelize.ValidationError) {
                let messages = err.errors.map( (e) => e.message)
                // 400 code, bad request
                return res.status(400).json(messages)
            }
            return next(err)
        })
})

// straightforward, deletes a student that matches the arguments, parameters?
router.delete('/students/:id', function(req, res, next){
    Student.destroy({where: {id: req.params.id}})
        .then( rowsModified => {
            return res.send('ok')
        }).catch( err => next(err) )
})

module.exports = router