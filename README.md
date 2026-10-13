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
- `src/assets` — baśniowe ilustracje kosmetyków wygenerowane przez AI oraz krój oryginalnego logotypu gamesCore_. Aktywne grafiki zapisano w `products.json`, a prompty w `art-prompts.md`. Oryginalne zdjęcia stockowe zachowano jako nieużywane pliki źródłowe.
- `scripts` — budowanie i lokalny serwer.
- `dist` — generowany wynik do publikacji.

Kolorystyka nawiązuje do Cosibella. Gra nie wykorzystuje zdjęć produktów ze sklepu Cosibella. Oryginalny tekstowy logotyp gamesCore_ korzysta z fontu Recoleta Alt Bold ze strony https://thegamescore.com/.

Ekran startowy zawiera krótkie zasady i przycisk „Rozpocznij grę”. Kliknięcie otwiera planszę na cały obszar okna i uruchamia stoper. Nie ma limitu czasu. Czas zatrzymuje się po znalezieniu ośmiu par. Jeden ruch to odsłonięcie dwóch kart. Niedopasowane karty wracają po 1,1 s. Powrót do startu zatrzymuje rozgrywkę i kasuje oczekujące odwrócenia. Nowa gra tasuje karty i zeruje wynik.

Prosta grywalizacja: 3 gwiazdki za ukończenie w maks. 12 ruchach, 2 za maks. 18, 1 za każde ukończenie. Kolejne trafienia bez pomyłki wyświetlają komunikat o serii. Najmniejsza liczba ruchów z ukończonej rundy jest zapisywana lokalnie w przeglądarce; przy niedostępnym localStorage gra działa dalej z rekordem w pamięci sesji.
