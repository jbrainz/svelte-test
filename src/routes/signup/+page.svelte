<!-- src/routes/Signup.svelte -->
<script lang="ts">
  import TokenDisplay from "./TokenDisplay.svelte";
  import { writable } from "svelte/store";
  import "../../app.css";
  import { createAccount } from "$lib";
  let loading = writable(false);
  let message = writable("");
  let telegramID = "";
  let password = "";
  let fullName = "";
  let token = "";

  async function handleSubmit() {
    loading.set(true);

    const {
      success,
      token: responseToken,
      message: responseMessage,
    } = await createAccount({ telegramId: telegramID, password, fullName });
    if (!success) {
      message.set(responseMessage);
      loading.set(false);
      return;
    }
    token = responseToken;
    loading.set(false);
  }

  function validateInput(input: string) {
    const inputElement = document.getElementById(input) as HTMLInputElement;
    if (inputElement && !inputElement.checkValidity()) {
      inputElement.style.borderColor = "red";
    } else if (inputElement) {
      inputElement.style.borderColor = "initial";
    }
  }
  function handleChange(
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const target = e.target as HTMLInputElement;
    if (target.id === "password" && target.value.length < 6) {
      message.set("Password must be at least 6 characters long");
    }
    if (target.id === "fullName" && target.value.length < 4) {
      message.set("Full name must be at least 4 characters long");
    }
  }
</script>

<main>
  <div class="card">
    {#if $loading}
      <p>Loading...</p>
    {/if}
    {#if token}
      <TokenDisplay {token} />
    {:else}
      <h1>Sign Up</h1>
      <form on:submit|preventDefault={handleSubmit}>
        <label for="telegramID">Telegram ID:</label>
        <input
          id="telegramID"
          type="text"
          on:change={(e) => handleChange(e)}
          bind:value={telegramID}
          required
          on:blur={() => validateInput("telegramID")}
        />

        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          on:change={(e) => handleChange(e)}
          bind:value={password}
          required
          on:blur={() => validateInput("password")}
        />

        <label for="fullName">Full Name:</label>
        <input
          id="fullName"
          type="text"
          bind:value={fullName}
          required
          on:blur={() => validateInput("fullName")}
        />

        <button disabled={$loading} type="submit">Sign Up</button>
        {#if $message}
          <p class="error-message">{$message}</p>
        {/if}
        <p>
          Already have an account? <a class="login-link" href="/profile"
            >Login</a
          >
        </p>
      </form>
    {/if}
  </div>
</main>
