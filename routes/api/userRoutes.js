const router = require('express').Router()
const { User, Thought } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).send('Error getting all the users.')
    }
})

router.get('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const user = await User
            .findById(_id)
            .populate('thoughts')
            .populate('friends')
        res.json(user)    
    } catch (error) {
        res.status(500).send('Error getting the user.')
    }
})

router.post('/', async (req, res) => {
    try {
        // const newUser = await User.create(req.body)
        res.json(newUser)
    } catch (error) {
        res.status(400).send('Error creating new user.')
    }
})

router.put('/:_id', async (req, res) => {
    const{ _id } = req.params
    try {
        
    } catch (error) {
        
    }
})

router.delete('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        
    } catch (error) {
        
    }
})


module.exports = router