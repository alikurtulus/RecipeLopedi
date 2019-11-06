const port =process.env.PORT || 4000
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-db'
const secret = process.env.SECRET || 'Zge{T*g._&;(gCaQ2mcn=-mR'

module.exports = { port, dbUri, secret }
