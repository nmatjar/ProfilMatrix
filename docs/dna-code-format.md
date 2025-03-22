# Format kodu DNA w ProfileMatrix

## Wprowadzenie

Format DNA to nowy sposób reprezentacji profili w aplikacji ProfileMatrix. Został zaprojektowany, aby być bardziej zwięzły, czytelny i elastyczny niż poprzedni format. Format DNA używa krótkich kodów i emotikonów do reprezentowania różnych atrybutów i preferencji użytkownika.

## Struktura kodu DNA

Kod DNA może być reprezentowany w kilku formatach:

### 1. Format klasyczny

```
[emoji_obszaru]{[emoji_segmentu][kod_segmentu][wartość];[emoji_segmentu][kod_segmentu][wartość]...}▪[emoji_obszaru]{...}
```

### 2. Format z emoji

```
[emoji_obszaru]{[emoji_segmentu]=[emoji_wartości];[emoji_segmentu]=[emoji_wartości]...}▪[emoji_obszaru]{...}
```

### 3. Format mieszany

```
[emoji_obszaru]{[emoji_segmentu]=[tekstowa_wartość];[emoji_segmentu][kod_segmentu][wartość]...}▪[emoji_obszaru]{...}
```

Gdzie:
- `[emoji_obszaru]` - emoji reprezentujące obszar aplikacji (np. 💼 dla "Praca i Organizacja")
- `[emoji_segmentu]` - emoji reprezentujące pojedynczy segment (np. 🏢 dla "Workplace")
- `[kod_segmentu]` - 2-znakowy kod identyfikujący segment (np. "WP" dla "Work Preference")
- `[wartość]` - wartość segmentu w formacie tekstowym (np. "F")
- `[emoji_wartości]` - emoji reprezentujące wartość segmentu (np. 👨‍💼 dla "Manager")

Sekcje dla różnych obszarów są oddzielone znakiem `▪` (czarny kwadrat). Segmenty wewnątrz obszaru są ujęte w nawiasy klamrowe `{}` i oddzielone średnikami `;`.

**Przykład kodu DNA w formacie z emoji:**

```
📊{🛡️=👨‍💼;🔀=📊;⏱️=📋;🔧=📊} ▪
```

## Obszary aplikacji

Kod DNA jest podzielony na następujące obszary, każdy oznaczony odpowiednim emoji:

| Emoji | ID obszaru | Nazwa obszaru |
|-------|------------|---------------|
| 💼 | work-organization | Praca i Organizacja |
| 💕 | work-intimacy | Relacje i Granice |
| 📍 | location-mobility | Lokalizacja i Mobilność |
| 🏢 | work-environment | Środowisko Pracy |
| ⏰ | work-time | Czas Pracy |
| 📊 | work-style | Styl Pracy |
| 📑 | work-conditions | Warunki Pracy |
| 📈 | work-development | Rozwój Zawodowy |
| ❤️ | work-values | Wartości Zawodowe |
| 👤 | personal-traits | Cechy Osobowości |
| 💻 | tech-stack | Stack Technologiczny |

## Reprezentacja wartości

Wartości w kodzie DNA są zwykle reprezentowane przez emoji, które odpowiadają wybranym opcjom. Dla każdego segmentu istnieje mapowanie (`valueMap`) między wartością tekstową a emoji lub kodem reprezentującym tę wartość.

Przykładowe mapowania wartości:

| Segment | Wartość tekstowa | Reprezentacja w kodzie DNA |
|---------|------------------|----------------------------|
| Cel Pracy | Finansowy | 💰 |
| Cel Pracy | Kariera | 📈 |
| Cel Pracy | Pasja | ❤️ |
| Etyka Pracy | Uczciwość | ✅ |

W przypadku segmentów ze skalą numeryczną, wartości są reprezentowane bezpośrednio jako liczby. Dla przykładu, liczba godzin pracy "40" będzie zakodowana po prostu jako "40".

## Przykład kodu DNA

Przykładowy kod DNA:

```
💼{🏢WPH;🏛️OTS;👔ORK;🌍WFZ}▪📍{🌆LOCW;🚶MOBH}▪📊{📊WSE;⏱️WH40;📆WDF}
```

Zdekodowany:

- **Praca i Organizacja** 💼
  - 🏢 WP: Hybrydowa (Work Preference)
  - 🏛️ OT: Startup/Scaleup (Organization Type)
  - 👔 OR: Korporacja (Organization)
  - 🌍 WF: Zdalna (Work Format)

- **Lokalizacja i Mobilność** 📍
  - 🌆 LOC: Warszawa (Location)
  - 🚶 MOB: Wysoka mobilność (Mobility)

- **Styl Pracy** 📊
  - 📊 WS: Elastyczny (Work Style)
  - ⏱️ WH: 40h (Work Hours)
  - 📆 WD: Elastyczny (Work Days)

## Generowanie i parsowanie kodu DNA

Kod DNA jest generowany na podstawie aktywnych segmentów użytkownika. Proces ten obejmuje:

1. **Grupowanie segmentów według obszarów** - funkcja `groupSegmentsByArea` w `dna-code-mapping.ts`
2. **Tworzenie kodu dla każdego segmentu** - każdy segment jest reprezentowany przez emoji segmentu, kod segmentu i wartość
3. **Łączenie segmentów w obszary** - segmenty są grupowane w obszary i formatowane zgodnie ze strukturą

Parsowanie kodu DNA jest realizowane przez funkcję `parseDNACode` w `dna-code-mapping.ts`, która:

1. Dzieli kod na obszary (po znaku `▪`)
2. Dla każdego obszaru wyodrębnia emoji obszaru i zawartość w nawiasach klamrowych
3. Dzieli segmenty wewnątrz obszaru (po znaku `;`)
4. Dla każdego segmentu wyodrębnia emoji segmentu, kod segmentu i wartość
5. Dekoduje wartości za pomocą `reverseValueMap` poszczególnych segmentów

## Zalety formatu DNA

1. **Kompaktowość** - kod DNA jest znacznie krótszy niż pełne opisy preferencji
2. **Czytelność** - użycie emoji i krótkich kodów ułatwia wizualne rozróżnianie sekcji
3. **Elastyczność** - format obsługuje różne typy wartości (emoji, kody, wartości numeryczne)
4. **Rozszerzalność** - można łatwo dodawać nowe segmenty i obszary bez zmiany formatu
5. **Wizualizacja** - łatwe formatowanie dzięki użyciu emoji dla kategorii i segmentów

## Przykładowe mapowania segmentów na kody DNA

Poniżej znajduje się przykładowa tabela mapowania segmentów dla obszaru "Wartości Zawodowe":

| Segment ID | Emoji | Kod DNA | Obszar aplikacji |
|------------|-------|---------|------------|
| work-purpose | 🎯 | WP | ❤️ Wartości Zawodowe |
| work-ethics | 🛡️ | WE | ❤️ Wartości Zawodowe |
| work-culture | 👥 | WC | ❤️ Wartości Zawodowe |
| work-balance | ⚖️ | WB | ❤️ Wartości Zawodowe |
| social-responsibility | 🌍 | SR | ❤️ Wartości Zawodowe |

Każdy obszar ma własny zestaw segmentów z unikalnymi kodami w aplikacji. Wszystkie kody segmentów są dwuliterowe, aby zachować spójność formatu.

## Implementacja

Format DNA jest zaimplementowany w aplikacji ProfileMatrix w następujących plikach:

1. `src/lib/dna-code-mapping.ts` - Definicje kodów DNA, funkcje parsowania i generowania kodu DNA.
2. `src/components/DNACodeDisplay.tsx` - Komponent do wizualizacji kodu DNA z formatowaniem i kolorowaniem.
3. `src/pages/DNADecoderPage.tsx` - Strona do dekodowania i wyświetlania profili DNA.
4. `src/pages/Index.tsx` - Logika generowania kodu DNA na podstawie wyborów użytkownika.
5. `src/lib/segment-data.ts` - Centralne dane o segmentach i obszarach używane do kodowania/dekodowania.

## Dodawanie nowych obszarów i segmentów

Aby dodać nowy obszar lub segment do systemu kodowania DNA, należy:

1. Dodać definicję obszaru w `src/data/areas.json`
2. Utworzyć plik segmentów w `src/data/segments/[nazwa-obszaru].json`
3. Zaktualizować `src/lib/data-loader.ts` o import nowego pliku segmentów
4. Upewnić się, że każdy segment ma unikalne:
   - ID segmentu (w kebab-case)
   - Kod segmentu (2 wielkie litery)
   - Emoji segmentu
   - Mapowanie wartości (valueMap i reverseValueMap)

Szczegółowa instrukcja znajduje się w pliku `/docs/ADDING_NEW_AREA.md`.

## Podsumowanie

Format DNA to zwięzły i elastyczny sposób reprezentacji profili użytkowników w aplikacji ProfileMatrix. Dzięki wykorzystaniu emoji i krótkich kodów, format jest jednocześnie czytelny dla ludzi oraz łatwy do parsowania i generowania przez aplikację. System można łatwo rozszerzać o nowe obszary i segmenty, zachowując spójność całego kodu DNA.
