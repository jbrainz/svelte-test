<script lang="ts">
  import { writable } from "svelte/store";

  export let token: string;

  let copyText = writable("Copy Token");

  async function copyTokenToClipboard() {
    try {
      await navigator.clipboard.writeText(token);
      copyText.set("Copied!");
    } catch (err) {
      console.error("Failed to copy token:", err);
      copyText.set("Failed to copy");
    }
  }
</script>

<div class="token-display">
  <h2>Your Token:</h2>
  <p>Copy this token and keep it safe, you will need it during login</p>
  <p>{token}</p>
  <button class="copy-token" on:click={copyTokenToClipboard}>{$copyText}</button
  >
  <a class="login-link" href="/profile">Continue to login</a>
</div>

<style>
  .token-display {
    padding: 20px;
    margin: 20px 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  .login-link {
    display: block;
    margin-top: 10px;
    color: #007bff;
    text-decoration: none;
  }

  h2 {
    color: #333;
  }

  .copy-token {
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  p {
    word-break: break-all;
  }
</style>
