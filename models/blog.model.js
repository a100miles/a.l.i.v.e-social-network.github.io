const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Your blog must include title!"]
        },

        body: {
            type: String,
            required: [true, "Your blog must include content!"]
        },

        author: {
            type: String,
            required: false,
            default: "Anonymous",
        }
    },

    {
        timestamps: true
    }
);

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;