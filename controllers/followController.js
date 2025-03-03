const { prisma } = require("../prisma/prismaClient");

const FollowController = {
  followUser: async (req, res) => {
    const { followingId } = req.body;
    const userId = req.user.userId;

    if (followingId === userId) {
      return res.status(500).json({ error: "You can't follow yourself" });
    }

    try {
      const existingFollow = await prisma.follows.findFirst({
        where: { AND: [{ followerId: userId }, { followingId }] },
      });

      if (existingFollow) {
        return res.status(400).json({ error: "You already followed" });
      }

      await prisma.follows.create({
        data: {
          follower: { connect: { id: userId } },
          following: { connect: { id: followingId } },
        },
      });

      res.status(201).json({ message: "You followed successfully" });
    } catch (error) {
      console.error("Error while following", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  unfollowUser: async (req, res) => {
    res.send("unfollowUser");
  },
};

module.exports = FollowController;
