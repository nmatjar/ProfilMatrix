# Format kodu DNA w ProfileCoder

## Wprowadzenie

Format DNA to nowy sposób reprezentacji profili w aplikacji ProfileCoder. Został zaprojektowany, aby być bardziej zwięzły, czytelny i elastyczny niż poprzedni format. Format DNA używa krótkich kodów i emotikonów do reprezentowania różnych atrybutów i preferencji użytkownika.

## Struktura formatu DNA

Format DNA składa się z segmentów, które są pogrupowane według obszarów aplikacji. Każdy segment ma następującą strukturę:

```
[EMOJI][KOD1].[WARTOŚĆ1].[KOD2].[WARTOŚĆ2]...
```

Na przykład:
```
🧬ORG.K.WF.Z | 📍LOC.WAW.MOB.F3 | 👥TS.S.TWS.TA
```

### Elementy formatu DNA

1. **Emoji kategorii** - Emotikona reprezentująca obszar aplikacji, np. 🧬 dla pracy i organizacji, 📍 dla lokalizacji i mobilności.
2. **Kod segmentu** - Krótki kod reprezentujący segment, np. ORG dla typu organizacji, WF dla formatu pracy.
3. **Wartość segmentu** - Wartość wybrana dla danego segmentu, np. K dla korporacji, Z dla pracy zdalnej.
4. **Separator segmentów** - Kropka (.) oddziela kody i wartości w ramach jednej kategorii.
5. **Separator obszarów** - Pionowa kreska (|) oddziela różne obszary aplikacji.

## Obszary aplikacji

Format DNA grupuje segmenty według obszarów aplikacji, które są oznaczone odpowiednimi emoji:

1. **💼 Praca i Organizacja (work-organization)** - Preferencje dotyczące organizacji i środowiska pracy.
2. **📍 Lokalizacja i Mobilność (location-mobility)** - Preferencje dotyczące lokalizacji pracy.
3. **👥 Współpraca i Relacje (collaboration-relations)** - Preferencje dotyczące współpracy i interakcji z innymi.
4. **⏰ Czas i Dostępność (time-availability)** - Preferencje dotyczące czasu i organizacji pracy.
5. **🧠 Proces i Metodologia (process-methodology)** - Preferencje dotyczące procesów i metodologii pracy.
6. **💬 Komunikacja i Decyzje (communication-decisions)** - Preferencje dotyczące komunikacji i podejmowania decyzji.
7. **🔄 Rozwój i Adaptacja (development-adaptation)** - Umiejętności, potencjał i faza rozwoju zawodowego.
8. **💻 Preferencje Technologiczne (technology-preferences)** - Preferowane narzędzia i technologie.
9. **☕ Styl Pracy i Preferencje (work-style-preferences)** - Preferencje dotyczące stylu pracy.

Każdy obszar jest oznaczony odpowiednim emoji, które pojawia się na początku segmentu kodu DNA.

## Typy skal

Format DNA obsługuje różne typy skal dla wartości segmentów:

1. **P[0-100]** - Skala procentowa, np. P75 oznacza 75%.
2. **T[1-5]** - Skala od 1 do 5, np. T3 oznacza 3/5.
3. **F[1-5]** - Skala elastyczności, np. F4 oznacza wysoką elastyczność.
4. **C[1-5]** - Skala kultury, np. C2 oznacza kulturę typu 2.
5. **A[1-5]** - Skala dostępności, np. A3 oznacza średnią dostępność.
6. **S[1-5]** - Skala synergii, np. S5 oznacza maksymalną synergię.

## Przykłady kodów DNA

### Przykład 1: Profil osoby preferującej pracę zdalną w korporacji

```
🧬ORG.K.WF.Z | 📍LOC.WAW.MOB.F3 | 👥TS.S.TWS.TA | ⏰WH.40.WS.9-17 | 🧠LS.A.PS.L | 💬FS.D.AP.A | 🔄SM.H | 💡IL.H.PP.L | 💻SYS.M
```

### Przykład 2: Profil osoby preferującej pracę hybrydową w startupie

```
🧬ORG.S.WF.HE | 📍LOC.KRK.MOB.F4 | 👥TS.M.TWS.LL | ⏰WH.35.WS.F | 🧠LS.V.PS.C | 💬FS.C.AP.S | 🔄SM.M | 💡IL.I.PP.S | 💻SYS.A
```

## Zalety formatu DNA

1. **Zwięzłość** - Format DNA jest bardziej zwięzły niż poprzedni format, co ułatwia jego przechowywanie i udostępnianie.
2. **Czytelność** - Dzięki użyciu emotikonów i krótkich kodów, format DNA jest bardziej czytelny i łatwiejszy do interpretacji.
3. **Elastyczność** - Format DNA jest bardziej elastyczny i może być łatwo rozszerzony o nowe segmenty i obszary aplikacji.
4. **Strukturyzacja** - Format DNA grupuje segmenty według obszarów aplikacji, co ułatwia ich organizację i zrozumienie.
5. **Wizualizacja** - Format DNA może być łatwo wizualizowany, co ułatwia jego interpretację.

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
