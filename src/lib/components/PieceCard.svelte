<script lang="ts">
  export let piece: {
    slug: string;
    title: string;
    price: number | null;
    available: boolean;
    images: string[];
    category: string;
  };
</script>

<a href="/pieces/{piece.slug}" class="card">
  {#if piece.images && piece.images.length > 0 && piece.images[0]}
    <div class="image">
      <img src={piece.images[0]} alt={piece.title} />
    </div>
  {:else}
    <div class="image placeholder">
      <span>No image</span>
    </div>
  {/if}
  <div class="info">
    <h3>{piece.title}</h3>
    <div class="meta">
      {#if piece.price}
        <span class="price">${piece.price}</span>
      {/if}
      {#if !piece.available}
        <span class="sold">Sold</span>
      {/if}
    </div>
  </div>
</a>

<style>
  .card {
    display: block;
    text-decoration: none;
    color: inherit;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .image {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    color: #999;
    font-size: 0.9rem;
  }

  .info {
    padding: 1rem;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .price {
    font-weight: 600;
    color: #333;
  }

  .sold {
    color: #999;
    font-size: 0.85rem;
    font-style: italic;
  }
</style>
