const { prisma } = require("../prisma/prismaClient");

const PostController = {
  createPost: async (req, res) => {
    const { content } = req.body;

    const authorId = req.user.userId;

    if (!content) {
      return res.status(400).json({ error: "All fields required!" });
    }

    try {
      const post = await prisma.post.create({
        data: {
          content,
          authorId,
        },
      });

      res.json(post);
    } catch (error) {
      console.error("Create post error", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getAllPosts: async (req, res) => {
    res.send("getAllPosts");
  },
  getPostById: async (req, res) => {
    res.send("getPostById");
  },
  deletePost: async (req, res) => {
    res.send("deletePost");
  },
};

module.exports = PostController;
