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
  {#if piece.images[0]}
    <enhanced:img src={piece.images[0]} alt={piece.title} />
  {/if}
  <div class="info">
    <h3>{piece.title}</h3>
    {#if piece.price}
      <span class="price">${piece.price}</span>
    {/if}
    {#if !piece.available}
      <span class="sold">Sold</span>
    {/if}
  </div>
</a>

<style>
  .card {
    display: block;
    text-decoration: none;
  }
  .info {
    padding: 0.5rem 0;
  }
  .sold {
    color: #999;
    font-size: 0.85rem;
  }
</style>
