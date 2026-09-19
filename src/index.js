export default {
  async fetch(request, env) {
    return new Response(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SUN.TEC</title>
</head>
<body style="font-family:Arial;text-align:center;padding:60px;">
  <h1>SUN.TEC</h1>
  <p>Technology • Education • AI • Games</p>
</body>
</html>
`, {
      headers: {
        "content-type": "text/html;charset=UTF-8"
      }
    });
  }
};
