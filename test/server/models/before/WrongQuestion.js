const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String },
    answerList: { type: Array },
    right: { type: Number },
    rate: { type: Number },
    category: {
        categoryId: { type: String },
        categoryName: { type: String }
    },
    username: { type: String }
})

const WrongQuestion = mongoose.model('WrongQuestion', schema)
module.exports = { WrongQuestion }
