<script lang="ts">
  export let data;

  const { piece, slug } = data;
  let activeImage = 0;
</script>

<svelte:head>
  <title>{piece.title}</title>
</svelte:head>

<main>
  <a href="/pieces" class="back">← All pieces</a>

  <div class="layout">
    <!-- Image gallery -->
    <div class="images">
      {#if piece.images && piece.images.length > 0}
        <div class="main-image">
          <img src={piece.images[activeImage]} alt={piece.title} />
        </div>
        {#if piece.images.length > 1}
          <div class="thumbnails">
            {#each piece.images as img, i}
              <button
                class:active={activeImage === i}
                on:click={() => (activeImage = i)}
                aria-label="View image {i + 1}"
              >
                <img src={img} alt="{piece.title} photo {i + 1}" />
              </button>
            {/each}
          </div>
        {/if}
      {:else}
        <div class="no-images">
          <p>No images available</p>
        </div>
      {/if}
    </div>

    <!-- Details -->
    <div class="details">
      <h1>{piece.title}</h1>

      {#if data.enableSnipcart && piece.price}
        <p class="price">${piece.price}</p>
      {/if}

      {#if !piece.available}
        <span class="sold-badge">Sold</span>
      {/if}

      {#if piece.description}
        <p class="description">{piece.description}</p>
      {/if}

      <dl class="specs">
        {#if piece.dimensions}
          <dt>Dimensions</dt>
          <dd>{piece.dimensions}</dd>
        {/if}
        {#if piece.clay}
          <dt>Clay</dt>
          <dd>{piece.clay}</dd>
        {/if}
        {#if piece.glaze}
          <dt>Glaze</dt>
          <dd>{piece.glaze}</dd>
        {/if}
        {#if piece.fired}
          <dt>Firing</dt>
          <dd>{piece.fired}</dd>
        {/if}
      </dl>

      {#if data.enableSnipcart && piece.available && piece.price}
        <!-- Snipcart buy button — add your item details here -->
        <button
          class="buy-button snipcart-add-item"
          data-item-id={slug}
          data-item-name={piece.title}
          data-item-price={piece.price}
          data-item-url="/pieces/{slug}"
          data-item-image={piece.images[0] ?? ""}
        >
          Add to cart — ${piece.price}
        </button>
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
  }

  .back {
    display: inline-block;
    margin-bottom: 1.5rem;
    color: #555;
    text-decoration: none;
  }
  .back:hover {
    color: #000;
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  @media (max-width: 700px) {
    .layout {
      grid-template-columns: 1fr;
    }
  }

  .main-image img {
    width: 100%;
    border-radius: 4px;
  }

  .thumbnails {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
    flex-wrap: wrap;
  }

  .thumbnails button {
    width: 72px;
    height: 72px;
    padding: 0;
    border: 2px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    background: none;
  }

  .thumbnails button.active {
    border-color: #222;
  }
  .thumbnails img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .no-images {
    aspect-ratio: 1;
    background: #f5f5f5;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  .price {
    font-size: 1.4rem;
    margin: 0.25rem 0;
  }

  .sold-badge {
    display: inline-block;
    background: #eee;
    color: #666;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }

  .description {
    color: #444;
    line-height: 1.6;
    margin: 1rem 0;
  }

  dl.specs {
    margin: 1.5rem 0;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.4rem 1rem;
  }
  dt {
    font-weight: 600;
    color: #555;
    font-size: 0.9rem;
  }
  dd {
    margin: 0;
  }

  .buy-button {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.85rem;
    background: #222;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }

  .buy-button:hover {
    background: #444;
  }
</style>
