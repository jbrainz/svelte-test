<script>
  import { page } from "$app/stores";

  let paramValue;

  $: paramValue = $page.url.searchParams.get("firstname");
</script>

<main>
  <nav>
    <a href="/profile">Profile</a>
    <a href="/signup">Sign Up</a>
  </nav>
  <div class="welcome-message">
    <h3>
      Welcome! Here you can manage your profile, sign up for new events, and
      much more.
    </h3>
  </div>
  {#if paramValue}
    <p>Hello, {paramValue}!</p>
  {:else}
    <p>No logged in user found</p>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }

  nav {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
  }

  .welcome-message {
    margin-bottom: 20px;
    font-size: 18px;
  }
</style>
