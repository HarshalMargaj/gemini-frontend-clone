
# Gemini Frontend Clone Assignment Submission

Build a fully functional, responsive, and visually appealing frontend for a Gemini-style conversational AI chat application.

# Project Overview

Gemini Frontend Clone is a responsive AI chat interface inspired by Google Gemini. Built with React, Next.js App Router, and Tailwind CSS, it replicates key features of modern chat UIs including:

1. Chatroom creation and deletion

2. Sidebar navigation with search

3. Real-time simulated AI responses

4. Message throttling

5. Infinite scroll (reverse)

6. Dark mode with flicker-free toggle

7. Mobile-friendly design

8. Image upload and message copy functionality

The project is ideal for frontend developers showcasing practical implementation of:

1. Zustand for state management

2. JSON Server as a mock backend

3. LocalStorage for persistence

4. Component-driven architecture

✅ This clone is part of a frontend assignment to demonstrate advanced UI features and state logic in a realistic single-page application.

# ⚙️ Setup & Run Instructions


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file




## Deployment

Follow these steps to get the project running locally:

1. Clone the Repository

```bash
  git clone https://github.com/HarshalMargaj/gemini-frontend-clone.git
  cd gemini-frontend-clone
```


2. Install Dependencies

```bash
  npm install
```


3. Start the Development Server

```bash
  npm run dev
```

4. Start JSON Server (Mock Backend)

```bash
  json-server constants/Chatrooms.json --port 3001
```

# Folder Structure





```bash
  /app
  ├── _components/                      # Global reusable components
  │   ├── ContentLayout.jsx             # Layout wrapper for content area
  │   └── Navbar.jsx                    # Top navigation bar (theme toggle, branding)

  ├── dashboard/                        # Main chat UI
  │   ├── _components/                  # Dashboard-specific components
  │   │   ├── ChatInput.jsx             # Input box with typing, throttling
  │   │   ├── ChatInputDropdown.jsx     # Image upload, options dropdown
  │   │   ├── ChatroomMenuDropdownContent.jsx  # Chatroom delete/options
  │   │   ├── Message.jsx               # Message bubbles (user/AI)
  │   │   ├── SearchBar.jsx             # Debounced search input
  │   │   └── Sidebar.jsx               # Chatroom list, responsive toggle
  │   ├── [id]/                         # Dynamic route for each chatroom
  │   │   ├── layout.jsx                # Chatroom-specific layout (with Sidebar)
  │   │   └── page.jsx                  # Chat interface
  │   └── page.jsx                      # Default /dashboard route (fallback page)

  ├── login/
  │   ├── _components/                  # Login form and related UI (if any)
  │   └── page.jsx                      # Login page

/stores
  └── LayoutStore.js                    # Zustand store for sidebar toggle state

```
    
# How throttling, pagination, infinite scroll, and form validation are implemented

- Throttling: Simulates typing delay before showing Gemini's response using `setTimeout`.
- Pagination: Messages are paginated on scroll with 20 messages per page (client-side).
- Infinite Scroll (Reverse)**: Older messages load as you scroll up in chat.
- Form Validation**: Chat input prevents empty submission and allows image attachments.





## Demo

https://gemin-frontend-clone.vercel.app/login
