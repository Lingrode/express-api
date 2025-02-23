const bcrypt = require('bcryptjs');
const jdenticon = require('jdenticon');
const path = require('node:path');
const fs = require('node:fs');
const { prisma } = require('../prisma/prismaClient');

const UserController = {
  register: async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: 'All fields required!' })
    }

    try {
      const existingUser = await prisma.user.findUnique(({ where: { email } }));

      if (existingUser) {
        return res.status(400).json({ error: 'User already registered!' })
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const png = jdenticon.toPng(name, 200);
      const avatarName = `${name}_${Date.now()}.png`;
      const avatarPath = path.join(__dirname, '../uploads', avatarName);
      fs.writeFileSync(avatarPath, png);

      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name, avatarUrl: `/uploads/${avatarPath}` }
      })

      res.json(user);
    } catch (error) {
      console.error('Error', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  login: async (req, res) => { res.send('login') },
  getUserById: async (req, res) => { res.send('getUserById') },
  updateUser: async (req, res) => { res.send('updateUser') },
  current: async (req, res) => { res.send('currentUser') },
}

module.exports = UserController;