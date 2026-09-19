export default {
  async fetch(request, env) {
    return new Response(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SUN.TEC</title>
  <meta name="description" content="SUN.TEC — Apps, Games, AI, Education and Technology.">
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #071a12;
      color: white;
      text-align: center;
    }
    header {
      padding: 70px 20px;
    }
    h1 {
      font-size: 52px;
      margin: 0 0 15px;
      letter-spacing: 3px;
    }
    .tagline {
      font-size: 20px;
      color: #d7e8df;
    }
    .services {
      margin: 30px auto;
      max-width: 700px;
      padding: 25px;
      border-radius: 18px;
      background: #0d2a20;
    }
    .services p {
      font-size: 17px;
      line-height: 1.8;
    }
  </style>
</head>
<body>

  <header>
    <h1>SUN.TEC</h1>
    <div class="tagline">Technology • Education • AI • Games</div>

    <div class="services">
      <p>
        Building modern Apps, Games, AI tools,
        Educational Platforms and Digital Solutions.
      </p>
    </div>
  </header>

</body>
</html>
`, {
      headers: {
        "content-type": "text/html;charset=UTF-8"
      }
    });
  }
};
