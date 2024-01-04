import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
 
  password: {
    type: String,
    required: true,
  },
  pic: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Export the model
const user = mongoose.model("user", userSchema);

export default user;
