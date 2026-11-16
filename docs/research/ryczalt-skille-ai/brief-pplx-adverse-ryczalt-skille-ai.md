# Research - Stawka ryczałtu od przychodów ewidencjonowanych dla sprzedaży skilli AI (pakietów plików Markdown ze skryptami pomocniczymi) (Adversarial)

## Research Persona

Jesteś doradcą podatkowym specjalizującym się w ryczałcie od przychodów ewidencjonowanych i klasyfikacji PKWiU produktów cyfrowych i IT. Znasz linię interpretacyjną Dyrektora Krajowej Informacji Skarbowej (KIS) i orzecznictwo NSA/WSA dotyczące art. 12 ust. 1 ustawy o zryczałtowanym podatku dochodowym. Nie masz interesu w żadnej stawce: zależy Ci tylko na tym, która obroni się przy kontroli.

## Goal

Ustal, która stawka ryczałtu najpewniej ma zastosowanie do przychodów ze sprzedaży opisanego niżej produktu: 8,5%, 12% czy 15% (albo inna) i jak mocno każda opcja jest podparta przepisami, interpretacjami i orzecznictwem. Wynik posłuży do wyboru stawki i ewentualnie do wniosku o interpretację indywidualną.

## Context — what we already know

**Produkt („Asystent UX” / UX Designer skill):**
- Pakiet plików do pobrania (link mailowy po zakupie), który klient wgrywa do asystenta AI (Claude; regulamin wymienia też ChatGPT i Gemini). Asystent AI używa go jako instrukcji i bazy wiedzy do prowadzenia procesu projektowania UX stron internetowych.
- Skład:
  - **Treść:** `SKILL.md` i około 140 plików Markdown (wiedza o 16 typach stron, frameworki UX, procedury audytu, wireframingu i komunikacji), razem 1,9 MB i 27 tys. linii. To rdzeń wiedzy; nie wymaga kodu.
  - **Kod w Pythonie:** `ux_utils.py`, około 4,1 tys. linii (177 KB), tylko biblioteka standardowa. Udostępnia 9 poleceń CLI: zapis wyników pracy do szablonów HTML, walidację (blokuje zapis, gdy praca AI jest niekompletna), podsumowania danych dla AI oraz pobieranie mapy układu strony z serwera sprzedawcy.
  - **Kod w JavaScripcie:** `playwright-capture.js` (41 linii) robi zrzut strony. Jest opcjonalny, używany tylko awaryjnie i wymaga doinstalowania Node.js i Playwright.
  - **Szablony:** 4 szablony HTML (około 650 KB) zawierające około 336 KB JavaScriptu przeglądarkowego. Z nich powstają interaktywne dokumenty wynikowe.
  - **Proporcja:** kod Python i JS to około 9% objętości Markdown (15% linii), nie licząc JavaScriptu w szablonach. Pakiet ma wersje (v4.5) i sumy kontrolne.
- Rola skryptów:
  - Autor opisuje je jako „helpery do różnych zadań, żeby AI miało mniej pracy albo mogło weryfikować swoją pracę”.
  - Uruchamia je wyłącznie asystent AI. Klient nigdy nie jest proszony o uruchomienie kodu.
  - W wersji dla środowisk z wykonywaniem kodu (IDE, CLI) zapis wyników i kontrole jakości przez skrypty są obowiązkowe.
  - W wersjach dla czatów webowych skill działa bez skryptów, z ograniczoną funkcjonalnością: tylko wireframy mobilne, bez kontroli kompletności, a szablon AI wypełnia ręcznie.
- **Element usługi online:** płatne kopie zawierają klucz licencyjny.
  - Klucz odblokowuje własną usługę online sprzedawcy: serwer na Vercel z przeglądarką headless, który dla podanego adresu URL zwraca mapę układu strony.
  - Serwer egzekwuje limity i podział na wersję płatną i darmową, a sprzedawca musi go utrzymywać. Bez klucza ta funkcja nie działa.
  - Regulamin o tej usłudze nie wspomina.
- Model sprzedaży: jednorazowa opłata, pakiety licencyjne Solo (1 użytkownik), Studio (do 5), Agencja (bez limitu w jednej organizacji). Do tego 6 miesięcy aktualizacji i zakaz redystrybucji. Regulamin: „Kupujesz licencję na użytkowanie, nie prawa autorskie do plików” oraz „Produkt nie jest oprogramowaniem, aplikacją ani usługą online. To pliki tekstowe (Markdown), które działają jako instrukcje i baza wiedzy dla modeli AI”.
- Sprzedawca: JDG, czynny podatnik VAT, ryczałt od przychodów ewidencjonowanych, autor wszystkich treści i kodu. Klienci: Polska i zagranica, firmy i konsumenci.

**Przepisy (tekst jednolity Dz.U. 2025 poz. 843; nowelizacja Dz.U. 2026 poz. 779 nie zmienia art. 12; dla celów ryczałtu obowiązuje PKWiU 2015):**
- 8,5%: art. 12 ust. 1 pkt 5 lit. a (działalność usługowa niewymieniona gdzie indziej), lit. c (edukacja, PKWiU dział 85).
- 12%: art. 12 ust. 1 pkt 2b lit. a. Obejmuje wydawanie pakietów oprogramowania systemowego (58.29.1) i użytkowego (58.29.2) oraz oprogramowania komputerowego pobieranego z Internetu (ex 58.29.3), „z wyłączeniem pobierania oprogramowania w trybie on-line”. Lit. b obejmuje m.in. usługi związane z oprogramowaniem (ex 62.01.1) i oryginały oprogramowania (62.01.2).
- 15%: art. 12 ust. 1 pkt 2 lit. e (usługi licencyjne związane z nabywaniem praw do korzystania z programów komputerowych, 58.29.50.0; praw do książek, 58.11.60.0; praw do pozostałych wyrobów drukowanych, 58.19.30.0). Także lit. i (przetwarzanie danych, ex 63.11.1; pozostałe usługi informacyjne, 63.99).
- 8,5% do 100 tys. zł / 12,5% powyżej: art. 12 ust. 1 pkt 4 lit. f (wynajem własności intelektualnej z wyłączeniem prac chronionych prawem autorskim, 77.40).

**Wstępna analiza:** 8,5% przysługuje tylko wtedy, gdy produkt nie trafia do żadnej grupy wymienionej wprost. Ryzyka:
- 12% z powodu dołączonego, obowiązkowo używanego kodu;
- 15% z powodu licencyjnego modelu sprzedaży;
- dodatkowa niewiadoma z powodu usługi online dostępnej z kluczem (przetwarzanie danych 63.11.1 objęte jest 15%, a oprogramowanie on-line jest wyłączone z 12%).

Nie znaleziono dotąd interpretacji KIS dotyczącej skilli AI ani pakietów promptów.

## Scope

Polska. Stan prawny od 2022 r. (Polski Ład wprowadził obecne stawki 12/14/15/17%), ze szczególnym naciskiem na interpretacje i wyroki z lat 2023–2026. Klasyfikacja według PKWiU 2015; odnotuj, jeśli wejście PKWiU 2025 ma lub może mieć znaczenie dla ryczałtu.

Wyłączone: CIT, IP Box (niedostępny na ryczałcie), VAT (chyba że klasyfikacja na potrzeby VAT lub WIS wyjaśnia grupowanie PKWiU), skala i podatek liniowy, inne kraje.

## Depth

Minimum 4 000 słów i 20 źródeł. Każda z trzech pozycji (8,5% / 12% / 15%) ma dostać porównywalną głębokość analizy.

## Source priorities

Każde twierdzenie musi mieć źródło. Twierdzenia bez źródła oznacz [UNVERIFIED]. Kolejność wiarygodności:
1. Ustawa (ISAP) i objaśnienia Ministerstwa Finansów.
2. Interpretacje indywidualne Dyrektora KIS (eureka.mf.gov.pl), zawsze z sygnaturą i datą.
3. Wyroki NSA i WSA (orzeczenia.nsa.gov.pl), zawsze z sygnaturą.
4. GUS: PKWiU 2015 z objaśnieniami, opinie klasyfikacyjne Ośrodka Klasyfikacji i Nomenklatur w Łodzi.
5. Komentarze doradców podatkowych i kancelarii, oznaczone [COMMENTARY: źródło].
6. Blogi biur rachunkowych i serwisów fakturowych tylko jako wskazówka do odnalezienia źródła pierwotnego, oznaczone [VENDOR: firma].

## Quality Guardrails

Zanim skrytykujesz którąkolwiek pozycję, zbuduj jej najmocniejszą wersję. Odróżniaj przepis, linię interpretacyjną (interpretacja wiąże tylko wnioskodawcę, ale pokazuje podejście organu) i własne wnioskowanie. Wskaż, gdzie dowodów jest mało. Gdy linia interpretacyjna jest niejednolita, pokaż obie strony z sygnaturami.

## Anti-hallucination

Nie wymyślaj sygnatur interpretacji, dat ani numerów spraw sądowych. Jeśli nie możesz potwierdzić sygnatury, napisz to wprost. Nazwy grupowań PKWiU cytuj dokładnie według PKWiU 2015. Nie podawaj nieistniejących adresów URL.

## Confidence Calibration

Każde istotne twierdzenie oceń: HIGH (kilka niezależnych źródeł pierwotnych), MEDIUM (ograniczone, ale wiarygodne), LOW (jedno źródło lub źródło wtórne), SPECULATIVE (rozsądne wnioskowanie bez bezpośredniego dowodu).

## Research directions

### Pozycja A: 8,5% (treść cyfrowa, usługa niewymieniona albo edukacja)
1. Jakie stawki KIS przyjmowała dla sprzedaży do pobrania e-booków, kursów online, szablonów (Canva, Notion, Excel), presetów, pakietów promptów, baz wiedzy i materiałów szkoleniowych w latach 2022–2026? Podaj sygnatury.
2. Czy zestaw instrukcji i wiedzy dla modelu AI można zakwalifikować jako publikację elektroniczną, materiał edukacyjny (dział 85) albo usługę niewymienioną?
3. Czy dołączone skrypty pomocnicze mogą być elementem pomocniczym świadczenia złożonego, który nie zmienia klasyfikacji całości? Jak KIS i sądy stosują koncepcję świadczenia głównego i pomocniczego przy ryczałcie?

### Pozycja B: 12% (oprogramowanie pobierane z Internetu albo pakiet oprogramowania użytkowego)
1. Jak KIS i sądy rozumieją „oprogramowanie” na gruncie art. 12 ust. 1 pkt 2b (w tym odniesienia do art. 74 ustawy o prawie autorskim)? Czy obecność kodu Python lub JavaScript w pakiecie czyni całość oprogramowaniem, nawet gdy kod jest drobną częścią i uruchamia go asystent AI?
2. Interpretacje dotyczące sprzedaży motywów i wtyczek WordPress, rozszerzeń, skryptów, szablonów z makrami i podobnych produktów łączących treść z kodem: 12% czy 8,5%?
3. Co oznacza wyłączenie „pobierania oprogramowania w trybie on-line” w ex 58.29.3 i czy ma znaczenie dla pakietu pobieranego jednorazowo?

### Pozycja C: 15% (usługi licencyjne)
1. Czy sprzedaż kopii z licencją użytkownika końcowego to „usługa licencyjna związana z nabywaniem praw do korzystania z programów komputerowych” (58.29.50.0), czy wydanie lub sprzedaż egzemplarza (58.29.2 / ex 58.29.3)? Jak KIS rozgranicza te grupowania?
2. Jak KIS traktuje przychody z licencji na e-booki i inne treści (58.11.60.0, 58.19.30.0, a także podobieństwo do najmu)?
3. Czy sformułowania regulaminu („kupujesz licencję”, pakiety według liczby użytkowników) wpływają na klasyfikację, czy decyduje faktyczny charakter świadczenia?

### Produkty analogiczne jako punkt odniesienia
Zbierz interpretacje KIS i wyroki (z sygnaturami) dotyczące stawki ryczałtu dla produktów podobnych do skilla AI, zwłaszcza tych łączących treść z kodem lub sprzedawanych na licencji:
- wtyczki i motywy WordPress,
- rozszerzenia przeglądarki (Chrome, Firefox),
- wtyczki do Figmy i rozszerzenia VS Code,
- szablony Notion, Canva i Excel (także z makrami),
- custom GPT i pakiety promptów, presety (np. Lightroom),
- fonty i grafiki stockowe,
- dodatki i mody do gier.

Dla każdego podaj: produkt, sygnaturę i datę, wskazane grupowanie PKWiU, stawkę i uzasadnienie organu. Na końcu oceń, które analogie są najbliższe skillowi AI i dlaczego.

### Element usługi online
1. Czy dostęp do usługi online sprzedawcy, odblokowany kluczem z pakietu (serwer zwracający mapę układu strony), jest odrębnym świadczeniem, czy elementem pomocniczym sprzedaży pakietu?
2. Jeśli jest odrębny, czy to przetwarzanie danych (ex 63.11.1, 15%), oprogramowanie on-line (58.29.40, wyłączone z 12%; czy według KIS objęte 8,5%?), czy inna usługa?
3. Jak KIS traktuje produkty mieszane: plik do pobrania połączony z dostępem do usługi w chmurze? Czy wymaga osobnej ewidencji i osobnych stawek (art. 12 ust. 3)?

### Inne klasyfikacje do potwierdzenia lub wykluczenia
63.99 (pozostałe usługi informacyjne, 15%), 77.40 (8,5% / 12,5%), 5,5% (działalność wytwórcza), 3% (handel) oraz każda inna, którą znajdziesz w źródłach.

### Arbitration
- Która pozycja ma najsilniejsze oparcie w źródłach pierwotnych i jak oceniasz jakość dowodów każdej z nich?
- Które cechy produktu przesądzają o klasyfikacji? Rozważ udział kodu i to, że jego użycie jest obowiązkowe, możliwość działania bez skryptów, usługę online z kluczem licencyjnym, sposób dostarczenia, model licencyjny i opis w regulaminie.
- Jakie realne zmiany produktu lub sposobu sprzedaży przesuwają klasyfikację? Przykłady: sprzedaż skryptów jako osobnej pozycji z osobną ceną i odrębną ewidencją według art. 12 ust. 3, rezygnacja z kodu. Uwzględnij ryzyko uznania takich zmian za sztuczne.
- Procedura zabezpieczenia: opinia GUS a interpretacja indywidualna KIS. KIS nie klasyfikuje PKWiU, więc wnioskodawca musi ją wskazać. Jak sformułować opis stanu faktycznego, ile to kosztuje, ile trwa i jaką daje ochronę?

## Required Output Structure

- ## Executive Summary
- ## Legal Framework
- ## Position A — 8.5%
- ## Position B — 12%
- ## Position C — 15%
- ## Analogous Products — Reference Table
- ## Other Possible Classifications
- ## Arbitration
  - ### Evidence Quality Comparison
  - ### Decisive Product Facts
  - ### Decision Table
- ## Securing the Position
- ## Gaps and Open Questions

## Anti-goals

- Nie zastępuj analizy ogólnikiem „skonsultuj się z księgowym”.
- Nie wyznaczaj stawki na podstawie kodów PKD. Decyduje PKWiU faktycznie wykonywanej czynności.
- Nie podawaj stawek sprzed 2022 r. jako aktualnych (np. dawne 17% dla oprogramowania).
- Nie traktuj blogów biur rachunkowych jako rozstrzygających.
- Nie wchodź w VAT, CIT ani IP Box.

## Suggested follow-ups

1. Znajdź interpretacje KIS z lat 2022–2026 (z sygnaturami) dotyczące sprzedaży wtyczek i motywów WordPress, rozszerzeń przeglądarki, wtyczek do Figmy, skryptów i szablonów z makrami. Jaką stawkę rozstrzygnięto i dlaczego?
2. Znajdź interpretacje KIS dotyczące sprzedaży e-booków, kursów online, szablonów, pakietów promptów i produktów związanych z AI na ryczałcie w latach 2023–2026.
3. Znajdź wyroki NSA i WSA rozgraniczające „usługi licencyjne” (58.29.50.0) od wydawania lub sprzedaży oprogramowania (58.29.2, ex 58.29.3) na gruncie ryczałtu.
4. Jak KIS klasyfikuje na ryczałcie produkty łączące plik do pobrania z dostępem do usługi w chmurze na klucz licencyjny? Jedna stawka dla całości czy osobne stawki dla każdego elementu?
5. Jak sformułować wniosek o interpretację indywidualną dla tego produktu, żeby uzyskać ochronę dla wybranej stawki?

Save your report as: `brief-pplx-adverse-ryczalt-skille-ai.md`
