const express = require("express");

const router = express.Router();

const ShortURL = require("../models/urlSchema");
router.get("/", async (req, res) => {
  const shorturls = await ShortURL.find();

  res.render("index", { shorturls: shorturls });
});

router.get("/back", (req, res) => {
  res.render("backend");
});

router.post("/shortUrls", async (req, res) => {
  // console.log(req.body.full)

  const url = req.body.full;
  const newShortURL = new ShortURL({
    full: url,
  });
  await newShortURL.save();
  console.log("Short URL Created", newShortURL);
  res.redirect("/");
});

// Post End

// Views data

router.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortURL.findOne({ shortid: req.params.shortUrl });
  if (shortUrl == null) {
    return res.sendStatus(404);
  } 
  else {
    await shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
    console.log(shortUrl.clicks)
  }
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await ShortURL.deleteOne({ _id: id });
    console.log("Delete");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
