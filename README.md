# Beauty Memory

A responsive memory matching game in English: 16 cards, 8 pairs, a move counter, a timer, and a victory screen. Built with vanilla HTML, CSS, and JavaScript, with no dependencies.

## Getting started

- `npm run dev` — starts a local server at http://localhost:4196, serving files from `src`.
- `npm run check` — checks the syntax of the game logic.
- `npm run build` — rebuilds the `dist` directory from the source files.

## Project structure

- `src/index.html` — interface and dialogs.
- `src/style.css` — responsive styling and card animations.
- `src/game.js` — shuffling, matching, timer, and restart logic.
- `src/assets` — flat SVG illustrations of cosmetics (`card-*.svg`, without brand names or logos) and the typeface used for the original gamesCore_ wordmark. Active artwork is listed in `products.json`. Earlier AI-generated fairy-tale illustrations (`fairy-*.jpg`, with prompts in `art-prompts.md`) are unused. Original stock photos are retained as unused source assets.
- `scripts` — build script and local server.
- `dist` — generated files ready for publishing.

The color palette is inspired by ICI PARIS XL (black, white, magenta #d82b91, and light pink). The game does not use ICI PARIS XL logos, photos, or product names. The original gamesCore_ wordmark uses the Recoleta Alt Bold font from https://thegamescore.com/.

The start screen shows brief instructions and a “Start game” button. Clicking it opens the board across the window and starts the timer. There is no time limit. The timer stops when all eight pairs are found. One move means flipping two cards. Cards that do not match flip back after 1.1 seconds. Returning to the start screen stops the game and cancels pending card flips. A new game shuffles the cards and resets the score.

Simple rewards: earn 3 stars for finishing in 12 moves or fewer, 2 for 18 moves or fewer, and 1 for any completed game. Consecutive matches display a streak message. The lowest move count from a completed round is saved locally in the browser. If localStorage is unavailable, the game continues with the best score kept in memory for the current session.
