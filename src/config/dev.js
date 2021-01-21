require('dotenv')
  .config({
    path: '.env'
})

export const config = {
  secrets: {
    jwt: 'learneverything'
  },
  // dbUrl: process.env.MONGODB_URI
  dbUrl: 'mongodb://localhost:27017/api-design'
}
