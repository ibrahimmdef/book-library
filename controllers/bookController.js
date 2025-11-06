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

export const getAllBooks = async (req, res) => {
  const books = await db.query("SELECT * FROM books WHERE user_id = $1", [
    req.session.user.id,
  ]);
  res.render("books.ejs", { books: books.rows, filter: "all" });
};

export const getReadBooks = async (req, res) => {
  const books = await db.query(
    "SELECT * FROM books WHERE user_id = $1 AND status = 'finished'",
    [req.session.user.id]
  );
  res.render("books.ejs", { books: books.rows, filter: "read" });
};

export const getWantBooks = async (req, res) => {
  const books = await db.query(
    "SELECT * FROM books WHERE user_id = $1 AND status = 'want'",
    [req.session.user.id]
  );
  res.render("books.ejs", { books: books.rows, filter: "want" });
};

export const bookDelete = async (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM books WHERE id = $1", [id]);
  res.redirect("/books");
};

export const bookFinish = async (req, res) => {
  const id = req.params.id;
  db.query("UPDATE books SET status='finished' WHERE id =$1", [id]);
  res.redirect("/books");
};
