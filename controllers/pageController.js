import db from "../db/index.js";

export const getDashboard = async (req, res) => {
  const userId = req.session.user.id;

  try {
    // Total books
    const totalBooksResult = await db.query(
      "SELECT COUNT(*) FROM books WHERE user_id = $1",
      [userId]
    );
    const totalBooks = totalBooksResult.rows[0].count;

    // Finished books
    const finishedBooksResult = await db.query(
      "SELECT COUNT(*) FROM books WHERE user_id = $1 AND status = 'finished'",
      [userId]
    );
    const finishedBooks = finishedBooksResult.rows[0].count;

    // Want to read books
    const wantBooksResult = await db.query(
      "SELECT COUNT(*) FROM books WHERE user_id = $1 AND status = 'want'",
      [userId]
    );
    const wantBooks = wantBooksResult.rows[0].count;

    // Total quotes
    const totalQuotesResult = await db.query(
      "SELECT COUNT(*) FROM quotes WHERE user_id = $1",
      [userId]
    );
    const totalQuotes = totalQuotesResult.rows[0].count;

    res.render("dashboard.ejs", {
      totalBooks,
      finishedBooks,
      wantBooks,
      totalQuotes,
    });
  } catch (err) {
    console.error(err);
    res.send("Error fetching dashboard data.");
  }
};
