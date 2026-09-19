export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve files from the public assets folder
    if (path !== "/" && path !== "") {
      try {
        const assetRequest = new Request(
          new URL(path, request.url),
          request
        );

        return await env.ASSETS.fetch(assetRequest);
      } catch (error) {
        // Continue to homepage fallback if asset is not found
      }
    }

    // SUN.TEC Homepage
    return new Response(`
<!DOCTYPE html>
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
  background:#071b14;
  color:#fff;
}

header{
  padding:22px 25px;
  border-bottom:1px solid #315744;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.logo{
  font-size:30px;
  font-weight:900;
  letter-spacing:4px;
  color:#e5c15b;
}

.search{
  padding:10px 15px;
  border-radius:8px;
  border:1px solid #557766;
  background:#0c251b;
  color:white;
}

.hero{
  text-align:center;
  padding:70px 20px 50px;
}

.hero h1{
  font-size:clamp(35px,7vw,70px);
  margin:0;
  color:#e5c15b;
}

.hero p{
  color:#cbd8d0;
  font-size:18px;
  margin-top:15px;
}

.container{
  max-width:1100px;
  margin:auto;
  padding:20px;
}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(210px,1fr));
  gap:18px;
}

.card{
  background:#102c21;
  border:1px solid #315744;
  border-radius:16px;
  padding:25px;
  transition:.2s;
}

.card:hover{
  transform:translateY(-4px);
  border-color:#d6ad45;
}

.card h2{
  color:#e5c15b;
  margin-top:0;
}

.card p{
  color:#cbd8d0;
}

.btn{
  display:inline-block;
  text-decoration:none;
  background:#d6ad45;
  color:#071b14;
  padding:11px 17px;
  border-radius:8px;
  font-weight:bold;
  margin-top:8px;
}

section{
  margin:50px 0;
}

footer{
  text-align:center;
  padding:35px 20px;
  border-top:1px solid #315744;
  color:#9db2a5;
}

@media(max-width:600px){
  header{
    flex-direction:column;
    gap:15px;
  }

  .hero{
    padding-top:45px;
  }
}
</style>
</head>

<body>

<header>
  <div class="logo">SUN.TEC</div>

  <input
    class="search"
    type="search"
    placeholder="Search..."
  >
</header>

<div class="hero">
  <h1>SUN.TEC</h1>
  <p>THE DIGITAL TECHNOLOGY PLATFORM</p>
</div>

<div class="container">

<section>

<div class="grid">

<div class="card">
<h2>📱 Apps</h2>
<p>Educational and productivity applications.</p>
<a class="btn" href="/apps.html">Explore Apps</a>
</div>

<div class="card">
<h2>🎮 Games</h2>
<p>Interactive and educational games.</p>
<a class="btn" href="#">Explore</a>
</div>

<div class="card">
<h2>🤖 AI Tools</h2>
<p>Smart artificial intelligence tools.</p>
<a class="btn" href="#">Explore</a>
</div>

<div class="card">
<h2>🎓 Education</h2>
<p>Digital learning resources for students and teachers.</p>
<a class="btn" href="#">Explore</a>
</div>

<div class="card">
<h2>📝 Online Tests</h2>
<p>Online school tests and assessments.</p>

<a
class="btn"
href="/science7.html"
>
Class 7 Science Test
</a>

</div>

<div class="card">
<h2>🏆 Results</h2>
<p>Student examination results and records.</p>
<a class="btn" href="#">View Results</a>
</div>

<div class="card">
<h2>💻 Software</h2>
<p>Useful educational and technology software.</p>
<a class="btn" href="#">Explore</a>
</div>

<div class="card">
<h2>⬇️ Downloads</h2>
<p>Apps, documents and digital resources.</p>
<a class="btn" href="#">Downloads</a>
</div>

</div>

</section>

<section>

<div class="card">

<h2>Featured Online Test</h2>

<p>
Class 7 General Science — Chapters 1 to 4
</p>

<p>
40 Multiple Choice Questions • Automatic Checking • A4 Result
</p>

<a
class="btn"
href="/science7.html"
>
START CLASS 7 SCIENCE TEST
</a>

</div>

</section>

</div>

<footer>
© 2026 SUN.TEC — Digital Technology Platform
</footer>

</body>
</html>
`, {
      headers: {
        "content-type": "text/html; charset=UTF-8"
      }
    });
  }
};
