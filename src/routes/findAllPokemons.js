const pokemons = require('../db/mock-pokemon')
const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    
    const limit = parseInt(req.query.limit) || 5
      
    if(req.query.name) {
        const name = req.query.name

        if(name.length < 2) {
            const message = 'Le terme de recherche doit contenir au minimum 2 caractères.'
            return res.status(400).json({ message })
        }
        return Pokemon.findAndCountAll({ 
            where: { 
                name: {
                    [Op.like]: `%${name}%` 
                }
            },
            order: ['name'],
            limit: limit
        })
        .then(({count, rows}) => {
            const message = `Il ya ${count} pokémons qui correspondent au terme ${name}`
            res.json({message, data: rows})
        })
    } else {
        Pokemon.findAll({order: ['name'], limit: limit})
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = `La liste des pokémons n'a pu être récupérée. Réessayer plus tard.`
          res.status(500).json({message, data: error})
        })
    }
  })
}