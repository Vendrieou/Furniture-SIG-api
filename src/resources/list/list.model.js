import mongoose from 'mongoose'

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
      default: '',
      maxlength: 50
    },
    description: String,
    phone: Number,
    image: String,
    price: Number,
    lat: Number,
    long: Number,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
)

listSchema.index({ user: 1, name: 1 }, { unique: true })

export const List = mongoose.model('list', listSchema)
