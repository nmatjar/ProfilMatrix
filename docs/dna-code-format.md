# Format kodu DNA w ProfileCoder

## Wprowadzenie

Format DNA to nowy sposób reprezentacji profili w aplikacji ProfileCoder. Został zaprojektowany, aby być bardziej zwięzły, czytelny i elastyczny niż poprzedni format. Format DNA używa krótkich kodów i emotikonów do reprezentowania różnych atrybutów i preferencji użytkownika.

## Struktura kodu DNA

Kod DNA ma następującą strukturę:

```
[emoji_obszaru][kod_segmentu].[wartość].[kod_segmentu].[wartość]... | [emoji_obszaru][kod_segmentu].[wartość]...
```

Gdzie:
- `[emoji_obszaru]` - emoji reprezentujące obszar aplikacji (np. 🏢 dla "Praca i Organizacja")
- `[kod_segmentu]` - 2-3 znakowy kod identyfikujący segment (np. "WP" dla "Work Preference")
- `[wartość]` - wartość segmentu, która może być:
  - Kodem wartości dla segmentów z predefiniowanymi opcjami (np. "K" dla "Korporacja")
  - Wartością skalarną z prefiksem typu skali (np. "P50" dla "50%" w skali procentowej)

Sekcje dla różnych obszarów są oddzielone znakiem `|` (pionowa kreska).

## Obszary aplikacji

Kod DNA jest podzielony na następujące obszary, każdy oznaczony odpowiednim emoji:

| Emoji | ID obszaru | Nazwa obszaru |
|-------|------------|---------------|
| 🏢 | work-organization | Praca i Organizacja |
| 📍 | location-mobility | Lokalizacja i Mobilność |
| 👥 | collaboration-relations | Współpraca i Relacje |
| ⏰ | time-availability | Czas i Dostępność |
| 🧠 | process-methodology | Proces i Metodologia |
| 💬 | communication-decisions | Komunikacja i Decyzje |
| 🔄 | development-adaptation | Rozwój i Adaptacja |
| 💻 | technology-preferences | Preferencje Technologiczne |
| ☕ | work-style-preferences | Styl Pracy i Preferencje |

## Typy skal

Dla segmentów, które używają skal, stosujemy następujące prefiksy:

| Prefiks | Typ skali | Przykład | Znaczenie |
|---------|-----------|----------|-----------|
| P | Procentowa | P50 | 50% |
| T | 1-5 | T3 | 3/5 |
| F | Elastyczność | F4 | Elastyczność: 4/5 |
| C | Kultura | CA | Kultura typu A |
| A | Dostępność | A3 | Dostępność: 3/5 |
| S | Synergia | S4 | Synergia: 4/5 |

## Przykład kodu DNA

Przykładowy kod DNA:

```
🏢WP.H.CU.T3.OT.S.ORG.K.WF.Z.OS.O | 📍LM.P50.LOC.W.MOB.F3 | 👥CS.D.AV.T4.TS.S.TWS.T | ⏰WP.F.WH.40.WS.F.AL.A1
```

Zdekodowany:

- **Praca i Organizacja** 🏢
  - WP: Hybrydowa (Work Preference)
  - CU: Kultura typu 3/5 (Culture)
  - OT: Startup/Scaleup (Organization Type)
  - ORG: Korporacja (Organization)
  - WF: Zdalna (Work Format)
  - OS: Biuro (Office Space)

- **Lokalizacja i Mobilność** 📍
  - LM: 50% (Location Mobility)
  - LOC: Warszawa (Location)
  - MOB: Elastyczność: 3/5 (Mobility)

- **Współpraca i Relacje** 👥
  - CS: Dyplomatyczny (Communication Style)
  - AV: 4/5 (Availability)
  - TS: Solo (Team Size)
  - TWS: Team (Team Work Style)

- **Czas i Dostępność** ⏰
  - WP: Elastyczny (Work Pattern)
  - WH: 40h (Work Hours)
  - WS: Elastyczny (Work Schedule)
  - AL: Dostępność: 1/5 (Availability Level)

## Generowanie i parsowanie kodu DNA

Kod DNA jest generowany na podstawie aktywnych segmentów użytkownika. Każdy segment jest mapowany na odpowiedni kod i wartość, a następnie segmenty są grupowane według obszarów. Kod jest parsowany w podobny sposób, dzieląc go na sekcje i pary kod-wartość.

## Obsługa wartości tekstowych

Dla wartości tekstowych, które nie mają predefiniowanych kodów, stosujemy następujące zasady:
1. Dla pojedynczych słów: pierwsze 3 litery (np. "Warszawa" -> "WAR")
2. Dla wielu słów: pierwsze litery każdego słowa (np. "Praca Zdalna" -> "PZ")
3. Dla długich wartości: skrócona wersja oparta na pierwszych literach słów

## Zalety formatu DNA

1. **Kompaktowość** - kod DNA jest znacznie krótszy niż pełne opisy preferencji
2. **Czytelność** - użycie emoji i krótkich kodów ułatwia wizualne rozróżnianie sekcji
3. **Elastyczność** - format obsługuje różne typy wartości (tekstowe, skalarne)
4. **Rozszerzalność** - można łatwo dodawać nowe segmenty i obszary

## Mapowanie segmentów na kody DNA

Poniżej znajduje się tabela mapowania segmentów na kody DNA:

| Segment ID | Emoji | Kod DNA | Obszar aplikacji |
|------------|-------|---------|--------------|
| organization-type | 🏢 | ORG | 💼 Praca i Organizacja |
| work-format | 🏢 | WF | 💼 Praca i Organizacja |
| workplace | 🏢 | WP | 💼 Praca i Organizacja |
| officeType | 🏢 | OT | 💼 Praca i Organizacja |
| culture | 🏢 | CU | 💼 Praca i Organizacja |
| location | 📍 | LOC | 📍 Lokalizacja i Mobilność |
| mobility | 📍 | MOB | 📍 Lokalizacja i Mobilność |
| locationMobility | 📍 | LM | 📍 Lokalizacja i Mobilność |
| teamSize | 👥 | TS | 👥 Współpraca i Relacje |
| team-work-style | 👥 | TWS | 👥 Współpraca i Relacje |
| motivation-system | 👥 | MS | 👥 Współpraca i Relacje |
| communicationStyle | 👥 | CS | 👥 Współpraca i Relacje |
| availability | 👥 | AV | 👥 Współpraca i Relacje |
| workHours | ⏰ | WH | ⏰ Czas i Dostępność |
| workSchedule | ⏰ | WS | ⏰ Czas i Dostępność |
| workPace | ⏰ | WP | ⏰ Czas i Dostępność |
| learningStyle | 🧠 | LS | 🧠 Proces i Metodologia |
| problemSolving | 🧠 | PS | 🧠 Proces i Metodologia |
| decisionMaking | 🧠 | DM | 🧠 Proces i Metodologia |
| feedbackStyle | 💬 | FS | 💬 Komunikacja i Decyzje |
| asyncPreference | 💬 | AP | 💬 Komunikacja i Decyzje |
| stressManagement | 🔄 | SM | 🔄 Rozwój i Adaptacja |
| innovationLevel | 💡 | IL | 🔄 Rozwój i Adaptacja |
| projectPreference | 💡 | PP | 🔄 Rozwój i Adaptacja |
| synergy | 💡 | SY | 🔄 Rozwój i Adaptacja |
| system | 💻 | SYS | 💻 Preferencje Technologiczne |
| musicPreference | 🎶 | MP | ☕ Styl Pracy i Preferencje |
| dressCode | 👔 | DC | ☕ Styl Pracy i Preferencje |
| homePreference | 🏠 | HP | ☕ Styl Pracy i Preferencje |

## Implementacja

Format DNA jest zaimplementowany w aplikacji ProfileCoder w następujących plikach:

1. `src/lib/dna-code-mapping.ts` - Definicje kodów DNA i funkcje pomocnicze.
2. `src/components/DNACodeDisplay.tsx` - Komponent do wizualizacji kodu DNA.
3. `src/pages/Index.tsx` - Logika generowania kodu DNA na podstawie wyborów użytkownika.

## Przyszłe rozszerzenia

W przyszłości format DNA może zostać rozszerzony o:

1. **Więcej obszarów aplikacji** - Dodanie nowych obszarów aplikacji, np. dla preferencji dotyczących zdrowia i dobrostanu.
2. **Więcej typów skal** - Dodanie nowych typów skal, np. dla preferencji dotyczących równowagi między życiem zawodowym a prywatnym.
3. **Więcej segmentów** - Dodanie nowych segmentów, np. dla preferencji dotyczących stylu przywództwa.
4. **Więcej wizualizacji** - Dodanie nowych sposobów wizualizacji kodu DNA, np. w formie wykresu radarowego.
5. **Eksport/import** - Dodanie możliwości eksportu i importu kodu DNA w różnych formatach, np. JSON, CSV.

## Podsumowanie

Format DNA to nowy sposób reprezentacji profili w aplikacji ProfileCoder, który jest bardziej zwięzły, czytelny i elastyczny niż poprzedni format. Format DNA używa krótkich kodów i emotikonów do reprezentowania różnych atrybutów i preferencji użytkownika, co ułatwia jego przechowywanie, udostępnianie i interpretację.
