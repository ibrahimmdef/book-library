import db from "../db/index.js";

export const addQuote = async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const userId = req.session.user.id;
  const { quotes, author } = req.body;

  try {
    //  Check duplicate quote
    const check = await db.query(
      "SELECT * FROM quotes WHERE user_id = $1 AND quote_text = $2",
      [userId, quotes]
    );

    if (check.rows.length > 0) {
      return res.send("You have already added this quote.");
    }

    //  Insert new quote
    await db.query(
      "INSERT INTO quotes (user_id, quote_text, author) VALUES ($1, $2, $3)",
      [userId, quotes, author]
    );

    res.redirect("/quotes");
  } catch (err) {
    console.log(err);
    res.send("An error occurred.");
  }
};

export const getUserQuotes = async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const userId = req.session.user.id;
  try {
    const result = await db.query(
      "SELECT * FROM quotes WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );

    res.render("quotes.ejs", { quotes: result.rows });
  } catch (err) {
    console.log(err);
    res.send("An error occurred while fetching quotes.");
  }
};
