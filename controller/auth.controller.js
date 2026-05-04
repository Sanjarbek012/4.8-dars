const { read_file, write_file } = require("../fs/file-manager");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email, password are required" });
    }

    // Faylni o'qishda xatolik bo'lmasligi uchun [] qo'shdik
    const users = read_file("users.json") || [];

    const foundedEmail = users.find((u) => u.email === email);
    if (foundedEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: v4(),
      username,
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    write_file("users.json", users);

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = read_file("users.json") || [];
    const user = users.find((u) => u.email === email);

    // Foydalanuvchi topilmasa yoki parol xato bo'lsa
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Token yaratish
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" }); // Muddati 1 soat qilindi

    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik" });
  }
};

module.exports = { register, login };
