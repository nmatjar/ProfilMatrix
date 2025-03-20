# Dokumentacja Generowania Kodu Profilu

## Wprowadzenie

Ten dokument opisuje mechanizm generowania kodu profilu w aplikacji ProfileCoder. Kod profilu to zwięzła reprezentacja wyborów użytkownika dotyczących różnych aspektów jego preferencji zawodowych, stylu pracy i innych cech.

## Przechowywanie Danych

### Stany Aplikacji

1. **selections**
   - Obiekt przechowujący wybory użytkownika
   - Klucze: ID segmentów
   - Wartości: wybrane opcje (string, number)
   - Przykład: `{ 'workplace': '🏢', 'teamSize': 'S', 'workHours': 40 }`

2. **activeSegments**
   - Tablica obiektów reprezentujących aktywne segmenty
   - Każdy obiekt zawiera:
     - `id`: unikalny identyfikator (np. `active-workplace`)
     - `segmentId`: ID segmentu (np. `workplace`)
     - `value`: wybrana wartość (string)
     - `visible`: czy segment jest widoczny (boolean)
     - `order`: kolejność wyświetlania (number)
   - Przykład:
     ```javascript
     [
       {
         id: 'active-workplace',
         segmentId: 'workplace',
         value: '🏢',
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

1. **Suwaki (handleSliderChange)**
   ```javascript
   const handleSliderChange = (value: number[], categoryId: string) => {
     setSelections(prev => ({
       ...prev,
       [categoryId]: value[0]
     }));
     
     // Aktualizacja activeSegments
     const updatedSegments = [...activeSegments];
     const segmentIndex = updatedSegments.findIndex(s => s.segmentId === categoryId);
     
     if (segmentIndex >= 0) {
       updatedSegments[segmentIndex] = {
         ...updatedSegments[segmentIndex],
         value: value[0].toString()
       };
     } else {
       updatedSegments.push({
         id: `active-${categoryId}`,
         segmentId: categoryId,
         value: value[0].toString(),
         visible: true,
         order: updatedSegments.length
       });
     }
     
     setActiveSegments(updatedSegments);
     localStorage.setItem('activeSegments', JSON.stringify(updatedSegments));
   };
   ```

2. **Pola tekstowe (handleInputChange)**
   ```javascript
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
     const value = e.target.value;
     
     setSelections(prev => ({
       ...prev,
       [categoryId]: value
     }));
     
     // Aktualizacja activeSegments
     // (podobny kod jak w handleSliderChange)
   };
   ```

### Synchronizacja Stanów

- Efekt `useEffect` obserwuje zmiany w `selections` i aktualizuje `activeSegments`
- Konwersja wartości liczbowych na string przy zapisie do `activeSegments`
- Zapisanie zaktualizowanych segmentów do localStorage

## Generowanie Kodu Profilu

### Grupy Kategorii

Predefiniowane grupy kategorii w tablicy `groupDefinitions`:

```javascript
const groupDefinitions = [
  // ŚRODOWISKO PRACY
  { 
    name: 'environment', 
    categories: ['workplace', 'officeType', 'culture'], 
    emoji: '🏢', 
    format: '{workplace}{officeType}·{culture}',
    description: 'Środowisko pracy'
  },
  
  // ZESPÓŁ
  { 
    name: 'team', 
    categories: ['teamSize', 'communicationStyle', 'availability'], 
    emoji: '👥', 
    format: '{teamSize}·{communicationStyle}·{availability}',
    description: 'Zespół i współpraca'
  },
  
  // ... pozostałe grupy
];
```

Każda grupa zawiera:
- `name`: nazwa grupy
- `categories`: tablica ID segmentów należących do grupy
- `emoji`: emoji reprezentujące grupę
- `format`: szablon formatowania kodu dla grupy
- `description`: opis grupy

### Proces Generowania Kodu

1. **Identyfikacja aktywnych segmentów**
   ```javascript
   const activeSegmentIds = new Set(
     activeSegments.filter(s => s.visible).map(s => s.segmentId)
   );
   ```

2. **Sprawdzenie aktywnych kategorii w grupach**
   ```javascript
   const hasActiveCategories = (categories) => {
     return categories.some(category => 
       activeSegmentIds.has(category) && 
       selections[category] && 
       selections[category].toString().trim() !== ''
     );
   };
   ```

3. **Formatowanie kodu dla każdej grupy**
   ```javascript
   const formatGroupCode = (group) => {
     let format = group.format;
     
     // Zastąp placeholdery wartościami
     group.categories.forEach(category => {
       const value = selections[category] || "";
       format = format.replace(`{${category}}`, value);
     });
     
     // Usuń puste wartości i popraw separatory
     format = format
       .replace(/·+/g, '·')         // Zamień wielokrotne kropki na jedną
       .replace(/^·|·$/g, '')       // Usuń kropki na początku i końcu
       .replace(/·+$/g, '')         // Usuń kropki na końcu
       .replace(/^·+/, '')          // Usuń kropki na początku
       .replace(/·+/g, '·');        // Jeszcze raz upewnij się, że nie ma podwójnych kropek
     
     return `${group.emoji} ${format}`;
   };
   ```

4. **Generowanie kodu dla każdej grupy**
   ```javascript
   groupDefinitions.forEach(group => {
     if (hasActiveCategories(group.categories)) {
       const groupCode = formatGroupCode(group);
       if (groupCode.trim() !== group.emoji) { // Dodaj tylko jeśli nie jest to sam emoji
         codeSegments.push(groupCode);
       }
     }
   });
   ```

5. **Obsługa kategorii spoza zdefiniowanych grup**
   ```javascript
   const definedCategories = new Set(
     groupDefinitions.flatMap(group => group.categories)
   );
   
   const otherActiveCategories = Array.from(activeSegmentIds)
     .filter(category => 
       !definedCategories.has(category) && 
       selections[category] && 
       selections[category].toString().trim() !== ''
     );
   
   if (otherActiveCategories.length > 0) {
     const otherCode = otherActiveCategories
       .map(category => `${category.charAt(0).toUpperCase()}${selections[category]}`)
       .join('·');
     
     codeSegments.push(`⚙️ ${otherCode}`);
   }
   ```

6. **Łączenie segmentów kodu**
   ```javascript
   const code = codeSegments.filter(Boolean).join(" | ");
   ```

## Struktura Wynikowego Kodu Profilu

Format: `[EMOJI_GRUPY] [WARTOŚCI_GRUPY] | [EMOJI_GRUPY] [WARTOŚCI_GRUPY] | ...`

Przykłady:
- `🏢 C·C3 | 👥 S·D·4 | ⏱️ 40h·9-17·⚡`
- `🏢 O·C3 | 👥 S·D·4 | ⏱️ 40h·9-17·⚡ | 🧠 🛠️·🔍·🧠 | 💬 🎯·A`

Gdzie:
- Sekcje są oddzielone separatorem ` | `
- Każda sekcja zaczyna się od emoji grupy
- Wartości wewnątrz sekcji są oddzielone kropką (·)
- Kategorie spoza zdefiniowanych grup są oznaczone emoji ⚙️

## Obszary do Potencjalnej Optymalizacji

1. **Aktualizacja grup kategorii**
   - Dodanie nowych segmentów do odpowiednich grup
   - Weryfikacja przypisań istniejących segmentów

2. **Format kodu**
   - Poprawa czytelności i intuicyjności
   - Dodanie legendy lub wyjaśnień znaczenia symboli

3. **Obsługa nowych typów segmentów**
   - Zapewnienie poprawnej obsługi wszystkich typów segmentów

4. **Wydajność**
   - Optymalizacja generowania kodu przy dużej liczbie segmentów

5. **Zarządzanie stanem**
   - Eliminacja potencjalnych niespójności między `selections` i `activeSegments`
