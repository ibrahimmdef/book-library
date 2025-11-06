import db from "../db/index.js";

export const addBook = async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const userId = req.session.user.id;
  const { title, author, url, status } = req.body;

  try {
    // Check duplicate
    const check = await db.query(
      "SELECT * FROM books WHERE user_id = $1 AND title = $2",
      [userId, title]
    );

    if (check.rows.length > 0) {
      return res.send("You have already added this book.");
    }

    // Insert
    await db.query(
      "INSERT INTO books (user_id, title, author, cover_url, status) VALUES ($1, $2, $3, $4, $5)",
      [userId, title, author, url, status]
    );

    res.redirect("/books");
  } catch (err) {
    console.log(err);
    res.send("An error occurred.");
  }
};
