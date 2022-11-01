const { Schema } = require("mongoose");

// Saved movies schema
const movieSchema = new Schema({
  title: [
    {
      type: String,
      required: true,
    },
  ],
  overview: {
    type: String,
    required: true,
  },

  movieId: {
    type: String,
    required: true,
  },
  poster_path:{
    type: String,
    reuired: false,
  },
  popularity:{
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },
  releasedate: {
    type: Date,
    required: false,
  }
});

module.exports = movieSchema;
