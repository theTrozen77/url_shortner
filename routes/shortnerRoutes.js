const express = require("express");
const shortId = require("shortid");
const config = require("config");
const req = require("express/lib/request");
const validUrl = require("valid-url");
const Url = require("./../models/shortUrl");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("shotner");
});

routes.post("/", async (req, res) => {
  console.log("Inside post of url shortner");
  const { longUrl } = req.body;
  console.log("long url", req.body);
  const baseUrl = config.get("baseURL");
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  //create url code
  const urlCode = shortId.generate();

  //check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (e) {
      console.log("Error in finding in db or inserting new entry");
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid Long Url");
  }
});

module.exports = routes;
