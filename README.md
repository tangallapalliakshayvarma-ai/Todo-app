<<<<<<< HEAD
# Full Stack Todo App (Express + MongoDB + HTML/JS)

A clean, minimal Todo application with a Node.js + Express + MongoDB backend and a vanilla HTML/CSS/JS frontend.

## Features
- Create, Read, Update, Delete todos
- Inline edit titles
- Toggle complete
- Filter: All / Active / Completed
- Clear completed

## Quick Start

### 1) Requirements
- Node.js 18+
- MongoDB (Local or Atlas). If you don't have local MongoDB, using Atlas is easiest.

### 2) Setup

```bash
cd server
cp .env.example .env        # or create an .env file
# For Atlas, put your connection string in .env as MONGO_URI=...
# For local MongoDB you can skip setting MONGO_URI.
npm install
npm run dev                 # starts server with nodemon on http://localhost:5000
```

The server will also serve the frontend from `../client`. Open http://localhost:5000 in your browser.

### 3) MongoDB Atlas (optional)
1. Create free cluster on Atlas.
2. Create a database user and allow access from your IP.
3. Copy the connection string and put it in `.env` as `MONGO_URI=...`.
4. Restart `npm run dev`.

### API Endpoints
- `GET    /api/todos` — list all todos
- `POST   /api/todos` — create `{ title }`
- `PATCH  /api/todos/:id` — update `{ title?, completed? }`
- `DELETE /api/todos/:id` — delete by id

#### cURL examples
```bash
curl -X POST http://localhost:5000/api/todos -H "Content-Type: application/json" -d '{ "title":"Learn Express" }'
curl http://localhost:5000/api/todos
curl -X PATCH http://localhost:5000/api/todos/<id> -H "Content-Type: application/json" -d '{ "completed": true }'
curl -X DELETE http://localhost:5000/api/todos/<id>
```

## Record Your 10–15s Video
- Start server: `npm run dev`
- In browser: add a todo, mark as completed, edit title, delete it.
- Done. Post on LinkedIn/YouTube and tag **TechnoHacks** and **Mentor Sandip Gavit**.

### Optional Enhancements (for portfolio)
- Add authentication (JWT) so todos are per-user.
- Add due dates and priority; sort and filter.
- Deploy backend to Render/Railway and use Atlas.
- Host frontend on Netlify (change `baseUrl` in `client/app.js` to point to the API).

---
MIT License
=======
# Todo-app
>>>>>>> df073bd822f1b9ac1df7c9760e2babafa3fc92fc
