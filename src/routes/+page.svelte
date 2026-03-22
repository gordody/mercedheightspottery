<script lang="ts">
const target = import.meta.env.VITE_DEPLOY_TARGET; // 'vercel' | undefined
const deploy_environment = import.meta.env.VITE_DEPLOY_ENVIRONMENT; // 'production' | 'preview' | 'development'

console.log("Env: ", "target=", target, "environment=", deploy_environment);
</script>

<svelte:head>
  <title>Merced Heights Pottery</title>
</svelte:head>

<main>
  <section class="hero">
    <h1>Merced Heights Pottery</h1>
    <p>Handcrafted ceramic pieces</p>

    <img src="images/hero.jpg" alt="Merced Heights Pottery" height="400" />
    
    <br>
      <a href="/pieces" class="cta-button">View Pieces</a>
  </section>
</main>

<style>
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  }

  .hero {
    text-align: center;
    padding: 2rem;
  }

  h1 {
    font-size: 3rem;
    margin: 0 0 1rem 0;
    color: #333;
  }

  p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .cta-button {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: #333;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.3s;
  }

  .cta-button:hover {
    background: #555;
  }
</style>
