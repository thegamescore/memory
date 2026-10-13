# Beauty Memory

Responsywna gra memory po polsku: 16 kart, 8 par, licznik ruchów i czasu, ekran wygranej. Vanilla HTML, CSS i JavaScript — bez zależności.

## Uruchomienie

- `npm run dev` — serwer lokalny http://localhost:4196, serwuje źródła z `src`.
- `npm run check` — sprawdzenie składni logiki gry.
- `npm run build` — odtwarza katalog `dist` ze źródeł.

## Struktura

- `src/index.html` — interfejs i okna dialogowe.
- `src/style.css` — responsywny wygląd i animacja kart.
- `src/game.js` — tasowanie, pary, zegar i restart.
- `src/assets` — lokalne stockowe zdjęcia Unsplash oraz krój oryginalnego logotypu gamesCore_. Źródła zdjęć zapisano w `products.json`.
- `scripts` — budowanie i lokalny serwer.
- `dist` — generowany wynik do publikacji.

Kolorystyka nawiązuje do Cosibella. Gra nie wykorzystuje zdjęć produktów ze sklepu Cosibella. Oryginalny tekstowy logotyp gamesCore_ korzysta z fontu Recoleta Alt Bold ze strony https://thegamescore.com/.

Zegar startuje po pierwszej karcie. Jeden ruch to odsłonięcie dwóch kart. Niedopasowane karty wracają po 1,1 s. Restart kasuje również oczekujące animacje i licznik czasu.
