const { prisma } = require("../prisma/prismaClient");

const LikeController = {
  likePost: async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.userId;

    if (!postId) {
      return res.status(400).json({ error: "All fields required!" });
    }

    try {
      const existingLike = await prisma.like.findFirst({
        where: { postId, userId },
      });

      if (existingLike) {
        return res.status(400).json({ error: "You already liked post" });
      }

      const like = await prisma.like.create({ data: { postId, userId } });

      res.json(like);
    } catch (error) {
      console.error("Error while liking comment", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  unlikePost: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!id) {
      return res.status(400).json({ error: "You already disliked post!" });
    }

    try {
      const existingLike = await prisma.like.findFirst({
        where: { postId: id, userId },
      });

      if (!existingLike) {
        return res.status(400).json({ error: "You cannot dislike post." });
      }

      const like = await prisma.like.deleteMany({
        where: { postId: id, userId },
      });

      res.json(like);
    } catch (error) {
      console.error("Error while deleting like", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = LikeController;
