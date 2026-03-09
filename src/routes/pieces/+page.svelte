<script lang="ts">
  import PieceCard from "$lib/components/PieceCard.svelte";

  export let data;

  const categories = ["all", "bowl", "vase", "mug", "plate", "other"];
  let selected = "all";
  let showAvailableOnly = false;

  $: filtered = data.pieces.filter((p) => {
    const matchCategory = selected === "all" || p.entry.category === selected;
    const matchAvailable = !showAvailableOnly || p.entry.available;
    return matchCategory && matchAvailable;
  });
</script>

<svelte:head>
  <title>Merced Heights Pottery</title>
</svelte:head>

<main>
  <a href="/" class="back">← Main</a>

  <h1>Merced Heights Pottery Ceramics</h1>

  <div class="filters">
    <div class="categories">
      {#each categories as cat}
        <button
          class:active={selected === cat}
          on:click={() => (selected = cat)}
        >
          {cat}
        </button>
      {/each}
    </div>

    <label class="available-toggle">
      <input type="checkbox" bind:checked={showAvailableOnly} />
      Available only
    </label>
  </div>

  {#if filtered.length === 0}
    <p class="empty">No pieces found.</p>
  {:else}
    <div class="grid">
      {#each filtered as piece (piece.slug)}
        <PieceCard
          piece={{
            slug: piece.slug,
            title: piece.entry.title,
            price: piece.entry.price,
            available: piece.entry.available,
            images: piece.entry.images,
            category: piece.entry.category,
          }}
        />
      {/each}
    </div>
  {/if}
</main>

<style>
  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .filters {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .categories {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .categories button {
    padding: 0.3rem 0.8rem;
    border: 1px solid #ccc;
    border-radius: 999px;
    background: none;
    cursor: pointer;
    text-transform: capitalize;
    font-size: 0.9rem;
  }

  .categories button.active {
    background: #222;
    color: #fff;
    border-color: #222;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }

  .empty {
    color: #999;
  }
</style>
