### Overview

A web application developed in Svelte, focusing on user registration and session management.

### Features

- **Sign-Up Form**: Users can register using their Telegram ID and password. Upon submission, they receive an authorization token for future logins, which they are prompted to save securely.

- **Data Storage**: The application stores user data, including Telegram ID, password, creation date, and the automatically generated token.

- **Session Management**: The web app restricts to a single user session at a time. Users must log in using their Telegram ID and password, followed by token verification.

- **Token Validation**: The system validates the provided token upon login. Invalid tokens redirect users to the Sign-up page, while successful validation grants access to the user's profile page.

- **Profile Page**: Authenticated users can access their profile page, displaying account information and session details.
