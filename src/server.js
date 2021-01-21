import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { signup, signin, protect } from './utils/auth'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'
import listRouter from './resources/list/list.router'
import categoryRouter from './resources/category/category.router'
import { cloudinary } from './utils/cloudinary';

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/list', listRouter)
app.use('/api/category', categoryRouter)

app.get('/api/images', async (req, res) => {
  const { resources } = await cloudinary.search
    .expression('folder:dev_setups')
    .sort_by('public_id', 'desc')
    .max_results(12)
    .execute()
  const publicIds = resources.map(file => file.public_id)

  res.send(publicIds)
})

app.post('/api/upload', async (req, res) => {
  try {
    const fileStr = req.body.data
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'dev_setups'
    })

    res.json({ msg: 'success', data: uploadedResponse })
  } catch (error) {
    console.error(error)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
