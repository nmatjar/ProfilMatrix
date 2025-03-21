# Dokumentacja Generowania Kodu Profilu

## Wprowadzenie

Ten dokument opisuje mechanizm generowania kodu profilu (kodu DNA) w aplikacji ProfileCoder. Kod DNA to zwięzła reprezentacja wyborów użytkownika dotyczących różnych aspektów jego preferencji zawodowych, stylu pracy, wartości i innych cech osobistych.

## Przechowywanie Danych

### Stany Aplikacji

1. **selections**
   - Obiekt przechowujący wybory użytkownika
   - Klucze: ID segmentów
   - Wartości: wybrane opcje (string, number)
   - Przykład: `{ 'work-purpose': '💰', 'work-ethics': '✅', 'workHours': 40 }`

2. **activeSegments**
   - Tablica obiektów reprezentujących aktywne segmenty
   - Każdy obiekt zawiera:
     - `id`: unikalny identyfikator (np. `active-work-purpose`)
     - `segmentId`: ID segmentu (np. `work-purpose`)
     - `value`: wybrana wartość (string lub number)
     - `visible`: czy segment jest widoczny (boolean)
     - `order`: kolejność wyświetlania (number)
   - Przykład:
     ```javascript
     [
       {
         id: 'active-work-purpose',
         segmentId: 'work-purpose',
         value: '💰',
         visible: true,
         order: 0
       }
     ]
     ```

### Persystencja Danych

- Dane są zapisywane w `localStorage` pod kluczem `activeSegments`
- Zapisywanie następuje:
  - Po inicjalizacji domyślnych segmentów
  - Po każdej zmianie wyboru użytkownika
  - Po aktualizacji stanu `selections`

## Aktualizacja Wyborów

### Obsługa Zmian Użytkownika

Aplikacja obsługuje różne typy segmentów, w tym:

1. **Segmenty typu toggle (przełączniki)**
   ```javascript
   const handleToggleChange = (value: string, segmentId: string) => {
     // Znajdź segment w danych
     const segment = findSegmentById(segmentId);
     // Znajdź odpowiadający emoji dla wybranej wartości
     const mappedValue = segment.valueMap[value];
     
     // Aktualizacja stanu selections
     setSelections(prev => ({
       ...prev,
       [segmentId]: mappedValue
     }));
     
     // Aktualizacja activeSegments
     updateActiveSegment(segmentId, mappedValue);
   };
   ```

2. **Segmenty typu slider (suwaki)**
   ```javascript
   const handleSliderChange = (value: number[], segmentId: string) => {
     const numericValue = value[0];
     
     // Aktualizacja stanu selections
     setSelections(prev => ({
       ...prev,
       [segmentId]: numericValue
     }));
     
     // Aktualizacja activeSegments
     updateActiveSegment(segmentId, numericValue.toString());
   };
   ```

3. **Pomocnicza funkcja aktualizująca activeSegments**
   ```javascript
   const updateActiveSegment = (segmentId: string, value: string) => {
     const updatedSegments = [...activeSegments];
     const segmentIndex = updatedSegments.findIndex(s => s.segmentId === segmentId);
     
     if (segmentIndex >= 0) {
       // Aktualizacja istniejącego segmentu
       updatedSegments[segmentIndex] = {
         ...updatedSegments[segmentIndex],
         value
       };
     } else {
       // Dodanie nowego segmentu
       updatedSegments.push({
         id: `active-${segmentId}`,
         segmentId,
         value,
         visible: true,
         order: updatedSegments.length
       });
     }
     
     // Aktualizacja stanu i localStorage
     setActiveSegments(updatedSegments);
     localStorage.setItem('activeSegments', JSON.stringify(updatedSegments));
   };
   ```

### Synchronizacja Stanów

- Efekt `useEffect` obserwuje zmiany w `selections` i aktualizuje `activeSegments`
- Dla wartości liczbowych, wartości są konwertowane na string przy zapisie do `activeSegments`
- Dla segmentów typu toggle, używane są wartości z mapy `valueMap` segmentu

## Generowanie Kodu DNA

### Struktura Kodu DNA

Kod DNA jest generowany według następującego formatu:

```
[emoji_obszaru]{[emoji_segmentu][kod_segmentu][wartość];[emoji_segmentu][kod_segmentu][wartość]...}▪[emoji_obszaru]{...}
```

Gdzie:
- `[emoji_obszaru]` - emoji reprezentujące obszar (np. ❤️ dla "Wartości Zawodowe")
- `[emoji_segmentu]` - emoji reprezentujące segment (np. 🎯 dla "Cel Pracy")
- `[kod_segmentu]` - 2-literowy kod segmentu (np. "WP" dla "Work Purpose")
- `[wartość]` - wartość wybrana przez użytkownika (emoji lub tekst)

### Proces Generowania Kodu DNA

1. **Grupowanie segmentów według obszarów**
   ```javascript
   // Funkcja z dna-code-mapping.ts
   function groupSegmentsByArea(activeSegments, allSegments, areas) {
     const result = {};
     
     // Dla każdego aktywnego segmentu
     activeSegments.forEach(activeSeg => {
       // Znajdź pełną definicję segmentu
       const segment = allSegments.find(s => s.id === activeSeg.segmentId);
       if (!segment) return;
       
       // Pobierz obszar do którego należy segment
       const areaId = segment.areaId;
       
       // Dodaj segment do odpowiedniego obszaru
       if (!result[areaId]) {
         result[areaId] = [];
       }
       
       result[areaId].push({
         segmentId: activeSeg.segmentId,
         value: activeSeg.value
       });
     });
     
     return result;
   }
   ```

2. **Tworzenie kodu dla każdego segmentu**
   ```javascript
   // Dla każdego segmentu w obszarze
   function createSegmentCodes(segmentsInArea, allSegments) {
     return segmentsInArea.map(activeSeg => {
       // Znajdź pełną definicję segmentu
       const segment = allSegments.find(s => s.id === activeSeg.segmentId);
       if (!segment) return '';
       
       // Stwórz kod segmentu: [emoji][kod][wartość]
       return `${segment.emoji}${segment.code}${activeSeg.value}`;
     }).join(';'); // Połącz segmenty średnikami
   }
   ```

3. **Generowanie pełnego kodu DNA**
   ```javascript
   function generateDNACode(activeSegments, allSegments, areas) {
     // Grupowanie segmentów według obszarów
     const groupedSegments = groupSegmentsByArea(activeSegments, allSegments, areas);
     
     // Generowanie kodu dla każdego obszaru
     const areaCodes = Object.entries(groupedSegments).map(([areaId, segments]) => {
       // Znajdź obszar
       const area = areas.find(a => a.id === areaId);
       if (!area) return '';
       
       // Generuj kod segmentów dla tego obszaru
       const segmentCodes = createSegmentCodes(segments, allSegments);
       
       // Format: [emoji_obszaru]{segmenty}
       return `${area.emoji}{${segmentCodes}}`;
     });
     
     // Połącz obszary znakiem ▪
     return areaCodes.join('▪');
   }
   ```

### Obsługa wartości w kodzie DNA

Dla każdego segmentu, wartość użytkownika jest mapowana na odpowiadający jej kod:

```javascript
// Przykład segmentu z work-values.json
{
  "id": "work-purpose",
  "code": "WP",
  "valueMap": {
    "Finansowy": "💰",
    "Kariera": "📈",
    "Pasja": "❤️",
    "Wpływ": "🌍"
  }
}
```

Gdy użytkownik wybiera "Finansowy" jako cel pracy, w kodzie DNA pojawi się: `🎯WP💰`

## Przykład Pełnego Procesu

1. **Użytkownik wybiera wartości w obszarze "Wartości Zawodowe"**
   - Cel Pracy: Finansowy (💰)
   - Etyka Pracy: Uczciwość (✅)

2. **Aktualizacja stanu `selections`**
   ```javascript
   { 
     'work-purpose': '💰', 
     'work-ethics': '✅'
   }
   ```

3. **Aktualizacja stanu `activeSegments`**
   ```javascript
   [
     {
       id: 'active-work-purpose',
       segmentId: 'work-purpose',
       value: '💰',
       visible: true,
       order: 0
     },
     {
       id: 'active-work-ethics',
       segmentId: 'work-ethics',
       value: '✅',
       visible: true,
       order: 1
     }
   ]
   ```

4. **Grupowanie segmentów według obszarów**
   ```javascript
   {
     'work-values': [
       { segmentId: 'work-purpose', value: '💰' },
       { segmentId: 'work-ethics', value: '✅' }
     ]
   }
   ```

5. **Tworzenie kodu dla obszaru "Wartości Zawodowe"**
   - Segment "Cel Pracy": `🎯WP💰`
   - Segment "Etyka Pracy": `🛡️WE✅`
   - Kod obszaru: `❤️{🎯WP💰;🛡️WE✅}`

6. **Finalny kod DNA**
   ```
   ❤️{🎯WP💰;🛡️WE✅}
   ```
   
   Jeśli użytkownik wybierze również segmenty z innych obszarów, zostaną one dodane z odpowiednimi separatorami:
   ```
   ❤️{🎯WP💰;🛡️WE✅}▪📊{📊WS⚡;⏱️WH40}
   ```

## Dekodowanie Kodu DNA

Dekodowanie (parsowanie) kodu DNA to proces odwrotny do generowania, umożliwiający wyświetlenie pełnych informacji na podstawie kompaktowego kodu.

### Proces Dekodowania

1. **Podział kodu na obszary**
   ```javascript
   // Funkcja z dna-code-mapping.ts
   function parseDNACode(dnaCode, allSegments) {
     // Podział kodu na obszary (po znaku ▪)
     const dnaSegments = dnaCode.split('▪');
     
     // Tablica na wyniki parsowania
     const result = [];
     
     // Dla każdego obszaru
     dnaSegments.forEach(segment => {
       // Wyodrębnij emoji obszaru i zawartość w {}
       const areaMatch = segment.match(/(.+?)\{(.+?)\}/);
       if (!areaMatch) return;
       
       const [_, areaEmoji, segmentsContent] = areaMatch;
       
       // Podziel segmenty w obszarze (po znaku ;)
       const segmentParts = segmentsContent.split(';');
       
       // Parsuj każdy segment
       segmentParts.forEach(segmentPart => {
         // Znajdź segment na podstawie emoji i kodu
         const segmentMatch = segmentPart.match(/(.)(..)(.+)/);
         if (!segmentMatch) return;
         
         const [__, segmentEmoji, segmentCode, value] = segmentMatch;
         
         // Znajdź definicję segmentu w danych
         const segmentDef = allSegments.find(s => 
           s.code === segmentCode && s.emoji === segmentEmoji
         );
         
         if (segmentDef) {
           // Dodaj zdekodowany segment do wyniku
           result.push({
             segmentId: segmentDef.id,
             segmentName: segmentDef.name,
             areaEmoji,
             code: segmentCode,
             value,
             displayValue: segmentDef.reverseValueMap?.[value] || value
           });
         }
       });
     });
     
     return result;
   }
   ```

2. **Dekodowanie wartości**
   
   Wartości w kodzie DNA są dekodowane przy użyciu `reverseValueMap` segmentu:
   ```javascript
   // Przykładowy reverseValueMap z segmentu
   "reverseValueMap": {
     "💰": "Finansowy",
     "📈": "Kariera",
     "❤️": "Pasja",
     "🌍": "Wpływ"
   }
   ```

3. **Wyświetlanie zdekodowanych danych**
   
   Zdekodowane segmenty są wyświetlane w postaci czytelnej listy z podziałem na obszary, pokazując pełne nazwy segmentów i ich wartości.

## Wizualizacja Kodu DNA

Kod DNA jest wizualizowany w interfejsie użytkownika jako kolorowy, sformatowany tekst:

- Każdy obszar ma własny kolor tła
- Emoji obszarów są wyraźnie wyświetlane
- Segmenty są zaznaczone z użyciem emoji
- Kody DNA można kopiować i udostępniać
- Strona dekodowania DNA pozwala na wklejenie kodu i wyświetlenie pełnych informacji

Implementacja wizualizacji znajduje się w:
- `src/components/DNACodeDisplay.tsx` - wyświetlanie kodu DNA
- `src/pages/DNADecoderPage.tsx` - strona do dekodowania kodu DNA

## Podsumowanie

Mechanizm generowania i dekodowania kodu DNA w ProfileCoder pozwala na kompaktową reprezentację preferencji użytkownika. Kod jest czytelny zarówno dla ludzi, jak i dla maszyn, co ułatwia jego udostępnianie i analizowanie. System jest elastyczny i można go łatwo rozszerzać o nowe obszary i segmenty.

Główne zalety nowego formatu kodu DNA:

1. **Przejrzysta struktura** - podział na obszary i segmenty ułatwia czytanie i interpretację kodu
2. **Rozszerzalność** - dodawanie nowych obszarów i segmentów nie wymaga zmian w architekturze formatu
3. **Wizualna czytelność** - zastosowanie emoji dla obszarów i segmentów ułatwia szybką interpretację
4. **Spójność mapowania** - każdy segment ma jednoznaczne mapowanie w obu kierunkach (valueMap i reverseValueMap)
5. **Efektywne dekodowanie** - format umożliwia łatwe parsowanie i odtworzenie pełnych informacji

Dzięki temu rozwiązaniu, użytkownicy mogą łatwo udostępniać swoje profile, a aplikacja może efektywnie przechowywać i analizować preferencje użytkowników.
