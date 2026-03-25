const http = require("http");
const https = require("https");

const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const PORT = process.env.PORT || 8080;

function post(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Content-Length": data.length,
        },
      },
      (res) => {
        let chunks = "";
        res.on("data", (c) => (chunks += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(chunks));
          } catch {
            reject(new Error(chunks));
          }
        });
      }
    );
    req.on("error", reject);
    req.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/auth") {
    const scope = url.searchParams.get("scope") || "repo,user";
    const redirect = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${scope}`;
    res.writeHead(301, { Location: redirect });
    res.end();
    return;
  }

  if (url.pathname === "/callback") {
    const code = url.searchParams.get("code");
    if (!code) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Missing code parameter");
      return;
    }

    try {
      const data = await post("https://github.com/login/oauth/access_token", {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      });

      if (data.error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end(data.error_description || data.error);
        return;
      }

      const content = `
<!doctype html><html><body><script>
(function() {
  function recieveMessage(e) {
    console.log("recieveMessage %o", e);
    window.opener.postMessage(
      'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: "github" })}',
      e.origin
    );
    window.removeEventListener("message", recieveMessage, false);
  }
  window.addEventListener("message", recieveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script></body></html>`;

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Token exchange failed: " + err.message);
    }
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("OK");
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
