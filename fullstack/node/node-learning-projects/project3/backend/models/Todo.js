import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Todo text is required'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;