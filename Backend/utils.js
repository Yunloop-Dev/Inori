const { clientId, clientSecret, servers, front } = require("./config.json");
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

const clientID = clientId;
const client_secret = clientSecret;
const credentials = Buffer.from(`${clientID}:${client_secret}`).toString(
  "base64"
);

const hostIp = servers.url;

/**
 *
 * @param {string} access_token
 * @param {base64} credentials
 */
const revokeToken = async (access_token) => {
  await oauth.revokeToken(access_token, credentials).then((response) => {
    console.log(response);
    console.log(`Successfully revived token: ${credentials}`);
  });
};

/**
 *
 * @param {String} access_token
 * @returns Array UserInfo
 */
const getUserInfo = async (access_token) => {
  const guilds = await oauth.getUserGuilds(access_token);
  const userInfo = await oauth.getUser(access_token);

  return {
    userInfo: userInfo,
    guilds: guilds,
  };
};

const auth = async (code, res) => {
  return await oauth // Запрос авторизации по коду
    .tokenRequest({
      clientId: clientId,
      clientSecret: clientSecret,
      grantType: "authorization_code",
      scope: ["guilds", "identify"],
      code: code,
      redirectUri: `http://${hostIp}/user/auth`,
    })
    .then(async (response) => {
      console.log(response);
      return res.redirect(
        `http://${front.ip}:${front.port}/?access_token=${response.access_token}#/`
      );
    })
    .catch((error) => {
      return res.status(599).json({
        success: false,
        message: error.message,
      });
    });
};

module.exports = {
  revokeToken,
  getUserInfo,
  auth,
};
