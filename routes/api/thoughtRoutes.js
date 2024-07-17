const router = require('express').Router()
const { User, Thought } = require('../../models')

// Gets all the thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts)
    } catch (error) {
        res.status(500).send('Error getting all the thoughts.')
    }
})

// Gets one thought by thought's id
router.get('/:_id', async (req, res) => {
    const{ _id } = req.params
    try {
        const thought = await Thought.findById(_id)
        res.json(thought)
    } catch (error) {
        res.status(500).send('Error getting thought.')
    }
})

// Creates a new thought
router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body)

        await User.findOneAndUpdate({username: req.body.username}, {$push: {thoughts: newThought._id}})
        res.json(newThought)

    } catch (error) {
        console.log(error)
        res.status(500).send('Error updating thought.')
    }
})

// Updates thought by thought's id
router.put('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const updatedThought = await Thought.findByIdAndUpdate(_id, req.body, { new: true })
        res.json(updatedThought)
    } catch (error) {
        res.status(500).send('Error updating thought.')
    }
})

// Delete thought by thought's id
router.delete('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const deletedThought = await Thought.findByIdAndDelete(_id)
        const user = await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: req.params.thoughtId }}, { new: true})
        res.json({ message: 'Thought successfully deleted'})
    } catch (error) {
        res.status(500).send('Error deleting thought.')
    }
})

// Post to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
    const { thoughtId } = req.params
    try {
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: req.body }}, { new: true })
        res.json(thought)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error adding reaction to thought.')
    }
})

// Delete to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { _id: req.params.reactionId}}}, { new: true })
        res.json(thought)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error deleting reaction from thought.')
    }
})

module.exports = router