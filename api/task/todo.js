const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        title: String,
        description: String,
        active: Boolean
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Todo', schema )