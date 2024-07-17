const { Schema, model } = require('mongoose')

function formatDate(date) {
 return date.toString()
}

const reactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    }
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},{
    toObject: {
        virtuals: true,
        getters: true,
    },
    id: false
})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought