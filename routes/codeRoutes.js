const express = require("express");
const Url = require("./../models/shortUrl");

const codes = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.codes });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(400).json("No url found");
    }
  } catch (e) {
    console.error(e);
    res.status(500).json("Server error");
  }
};

module.exports = codes;
