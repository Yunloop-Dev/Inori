const express = require("express");
const { port } = require("./config.json");
const DiscordOauth2 = require("discord-oauth2");
const { revokeToken, getUserInfo, auth } = require("./utils");

const oauth = new DiscordOauth2();

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/api/user/get", async (req, res) => {
  const access_token = req.body?.accessToken;

  let userInfo = await getUserInfo(access_token);
  return res.json({ success: true, message: userInfo });
});

app.post("/api/revoke", async (req, res) => {
  await revokeToken(req.query.accessToken).then(() =>
    res.status(200).json({ success: true })
  );
});

app.get("/user/auth", async (req, res) => {
  const code = req.query.code;
  await auth(code, res);
  return console.log(`User ${code}`);
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
