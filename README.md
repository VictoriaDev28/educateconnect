<!-- Final Project README -->
# Final Project

This repository contains a small full-stack application (backend + frontend) used for the Final Project.

High-level summary
- Backend: Node.js (small Express-style server found in `backend/server.js`).
- Frontend: React app using Vite (sources under `frontend/src`).

This README provides quick setup and run instructions for Windows (PowerShell) and describes the repository layout and important notes.

## Table of contents

- Project structure
- Prerequisites
- Setup
- Development (run)
- Production build
- Configuration / environment
- Useful notes
- Contributing
- License

## Project Structure

Top-level layout (relevant files/folders):

- `backend/` — server code and backend package.json
  - `server.js` — entry point
  - `config/` — backend configuration (e.g. `db.js`)
- `frontend/` — React + Vite application
  - `src/` — React source code
  - `public/` — static assets
  - `package.json` — frontend scripts and dependencies

## Prerequisites

- Node.js (LTS) — v16+ recommended
- npm (bundled with Node) or yarn
- Git (optional, for cloning and version control)

## Setup

Open a PowerShell terminal and run the following commands to install dependencies for both backend and frontend.

```powershell
# from repository root
cd .\backend
npm install

# in a separate terminal
cd ..\frontend
npm install
```

If you prefer a single terminal, run the backend and frontend installs sequentially:

```powershell
cd .\backend; npm install; cd ..\frontend; npm install
```

## Development (run)

Start backend

```powershell
cd .\backend
# if package.json defines a start script
npm run start
# or directly
node server.js
```

Start frontend (Vite)

```powershell
cd .\frontend
npm run dev
```

Notes:
- Run the backend and frontend in separate terminals. The frontend dev server (Vite) typically runs on port 3000 or 5173 and proxies API calls to the backend during development if configured.

## Production build

Build the frontend for production and then serve the built files from a static server or integrate into your backend.

```powershell
cd .\frontend
npm run build

# serve the dist folder with a static server (optional)
npm install -g serve
serve -s dist
```

To serve the built frontend from the backend, add static serving in `backend/server.js` (example: express.static pointing to `frontend/dist`) and make sure the backend serves API routes and the frontend assets.

## Configuration / environment

- Backend configuration (database URL, ports, etc.) is typically under `backend/config` (see `db.js`).
- If you need environment variables, create a `.env` file in `backend/` and load it in `server.js` (using `dotenv`) — this repository does not currently include a `.env` file by default.

Suggested minimal `.env` example (backend):

```
# Example values — adjust for your environment
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=myuser
DB_PASS=mypassword
DB_NAME=mydb
```

## Useful notes

- If ports conflict, update the port values in `backend/server.js` or the frontend dev server config (`vite.config.js`).
- If you add new packages to the frontend or backend, commit the updated `package-lock.json` or `yarn.lock`.

## Contributing

1. Fork the repository (or branch from `main`/`master`).
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Make changes and add tests if appropriate.
4. Open a pull request describing your changes.

## License

This project is provided under the MIT License. Replace or add a license file if you need a different license.

---

If you'd like, I can also:

- add a sample `.env.example` to the `backend/` folder,
- add convenience npm scripts to the root to start both servers concurrently,
- or inspect `backend/package.json` and `frontend/package.json` and update these instructions with exact script names.

If you want any of those, tell me which and I will implement them.

