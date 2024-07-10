<script lang="ts">
  import { writable } from "svelte/store";
  import "../../app.css";
  import { login } from "$lib";
  import { onMount } from "svelte";

  let telegramID = "";
  let password = "";
  let inputToken = "";
  let storedToken = writable("");
  let isLoggedIn = writable(false);
  let message = writable("");

  async function handleLogin() {
    try {
      const { valid } = await login({
        telegramId: telegramID,
        password,
        token: inputToken,
      });

      if (valid) {
        storedToken.set(inputToken);
        isLoggedIn.set(true);
      } else {
        alert("Invalid token. Please sign up again.");
        window.location.href = "/signup";
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  }

  onMount(async () => {
    const user = localStorage.getItem("user");
    if (!!user) {
      isLoggedIn.set(true);
      telegramID = JSON.parse(user).telegramId;
    }
  });

  function handleChange(
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const target = e.target as HTMLInputElement;
    if (target.id === "password" && target.value.length < 6) {
      message.set("Password must be at least 6 characters long");
    }
  }
</script>

<main>
  <div class="card">
    {#if !$isLoggedIn}
      <h1>Login</h1>
      <form on:submit|preventDefault={handleLogin}>
        <label for="telegramID">Telegram ID:</label>
        <input required id="telegramID" type="text" bind:value={telegramID} />

        <label for="password">Password:</label>
        <input
          on:change={(e) => handleChange(e)}
          required
          id="password"
          type="password"
          bind:value={password}
        />

        <label for="token">Token:</label>
        <input
          on:change={(e) => handleChange(e)}
          required
          id="token"
          type="text"
          bind:value={inputToken}
        />

        <button type="submit">Login</button>
      </form>
      {#if $message}
        <p class="error-message">{$message}</p>
      {/if}
      <p>
        Don't have an account? <a class="login-link" href="/signup">Sign up</a>
      </p>
    {:else}
      <h1>Profile</h1>
      <p>Telegram ID: {telegramID}</p>
      <p>Created: {new Date().toLocaleDateString()}</p>
    {/if}
  </div>
</main>
