import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    seq: { type: Number, default: 0 },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
)

categorySchema.index({ user: 1, name: 1 }, { unique: true })

export const Category = mongoose.model('category', categorySchema)
