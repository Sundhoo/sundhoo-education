export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve files from /public
    if (path !== "/") {
      try {
        const assetRequest = new Request(
          new URL(path, request.url),
          request
        );

        const response = await env.ASSETS.fetch(assetRequest);

        if (response.status !== 404) {
          return response;
        }
      } catch (error) {
        console.log("Asset error:", error);
      }
    }

    // SUN.TEC Home Page
    return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SUN.TEC — Digital Technology Platform</title>

<style>
*{
  box-sizing:border-box;
}

body{
  margin:0;
  font-family:Arial,Helvetica,sans-serif;
  background:#07130f;
  color:#f5f1df;
}

header{
  padding:22px 7%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  border-bottom:1px solid #806d32;
}

.logo{
  font-size:30px;
  font-weight:900;
  color:#d7b84a;
  letter-spacing:3px;
}

.badge{
  color:#cfc9ad;
  font-size:13px;
}

.hero{
  text-align:center;
  padding:70px 20px 50px;
}

.hero h1{
  font-size:clamp(35px,7vw,70px);
  margin:0;
  color:#e2c65c;
}

.hero p{
  max-width:700px;
  margin:20px auto;
  color:#bfc5b9;
  line-height:1.7;
}

.container{
  width:min(1100px,90%);
  margin:auto;
}

.section-title{
  text-align:center;
  color:#d7b84a;
  margin:20px 0 30px;
}

.cards{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:18px;
}

.card{
  background:#0d2119;
  border:1px solid #675a2d;
  border-radius:16px;
  padding:25px;
  min-height:170px;
  transition:.2s;
}

.card:hover{
  transform:translateY(-3px);
  border-color:#d7b84a;
}

.card h3{
  color:#e1c75c;
  margin-top:0;
}

.card p{
  color:#adb8ae;
  line-height:1.6;
}

.test-btn{
  display:inline-block;
  margin-top:12px;
  padding:13px 18px;
  border-radius:10px;
  background:#d7b84a;
  color:#07130f;
  font-weight:800;
  text-decoration:none;
}

footer{
  text-align:center;
  padding:50px 20px;
  margin-top:60px;
  border-top:1px solid #675a2d;
  color:#858f86;
}
</style>
</head>

<body>

<header>
  <div class="logo">SUN.TEC</div>
  <div class="badge">DIGITAL TECHNOLOGY PLATFORM</div>
</header>

<section class="hero">
  <h1>THE DIGITAL TECHNOLOGY PLATFORM</h1>
  <p>
    Apps, Games, AI, Education, Online Tests, Results,
    Software and Digital Tools — all in one place.
  </p>
</section>

<main class="container">

<h2 class="section-title">Featured Online Test</h2>

<div class="cards">

<div class="card">
  <h3>Class 7 General Science</h3>
  <p>
    Chapters 1–4 • 40 Multiple Choice Questions
    • Automatic Checking • A4 Result
  </p>

  <a class="test-btn" href="/science7.html">
    START CLASS 7 SCIENCE TEST
  </a>
</div>

<div class="card">
  <h3>Education</h3>
  <p>
    Digital educational resources and tools
    for teachers and students.
  </p>
</div>

<div class="card">
  <h3>AI Tools</h3>
  <p>
    Smart AI-powered educational and productivity tools.
  </p>
</div>

<div class="card">
  <h3>Software</h3>
  <p>
    Useful digital software and applications.
  </p>
</div>

</div>

</main>

<footer>
  © 2026 SUN.TEC — Digital Technology Platform
</footer>

</body>
</html>`, {
      headers: {
        "content-type": "text/html; charset=UTF-8"
      }
    });
  }
};
