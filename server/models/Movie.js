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

  movie_id: {
    type: String,
    required: true,
  },
});

module.exports = movieSchema;
