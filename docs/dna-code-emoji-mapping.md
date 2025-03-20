# Dokumentacja Systemu Mapowania Emoji dla Segmentów DNA

## Spis treści
1. [Wprowadzenie](#wprowadzenie)
2. [Struktura systemu](#struktura-systemu)
3. [Funkcje główne](#funkcje-główne)
4. [Mapowanie emoji dla segmentów](#mapowanie-emoji-dla-segmentów)
5. [Generowanie kodów DNA](#generowanie-kodów-dna)
6. [Przykłady użycia](#przykłady-użycia)
7. [Rozszerzanie systemu](#rozszerzanie-systemu)

## Wprowadzenie

System mapowania emoji dla segmentów DNA jest odpowiedzialny za przypisywanie unikalnych emoji i kodów do różnych segmentów profilu użytkownika. Umożliwia to wizualną reprezentację złożonych danych w formie łatwej do zrozumienia i zapamiętania.

Główne cele systemu:
- Zapewnienie unikalnej wizualnej reprezentacji dla każdego segmentu DNA
- Automatyczne generowanie kodów dla nowych segmentów
- Spójne mapowanie wartości segmentów na odpowiednie emoji
- Wsparcie dla różnych kategorii segmentów (lokalizacja, organizacja, format pracy, itp.)

## Struktura systemu

System składa się z następujących komponentów:

1. **Interfejs DNACodeMapping** - definicja struktury mapowania segmentów
2. **Statyczne mapowania** - predefiniowane mapowania dla znanych segmentów
3. **Funkcje generujące** - funkcje do tworzenia nowych mapowań i emoji
4. **Funkcje pomocnicze** - narzędzia do obsługi i aktualizacji mapowań

### Interfejs DNACodeMapping

```typescript
interface DNACodeMapping {
  segmentId: string;      // Unikalny identyfikator segmentu
  code: string;           // Kod DNA dla segmentu
  emoji: string;          // Podstawowe emoji dla segmentu
  segmentEmoji?: string;  // Emoji specyficzne dla segmentu (opcjonalne)
  areaId: string;         // Identyfikator obszaru, do którego należy segment
  description: string;    // Opis segmentu
  valueMap?: Record<string, string>; // Mapowanie wartości na kody (opcjonalne)
  scaleType?: string;     // Typ skali dla wartości liczbowych (opcjonalne)
  formatTemplate?: string; // Szablon formatowania wartości (opcjonalne)
}
```

## Funkcje główne

### ensureSegmentEmojis

Funkcja zapewniająca, że wszystkie segmenty mają przypisane emoji.

```typescript
export function ensureSegmentEmojis(): DNACodeMapping[] {
  // Najpierw wywołaj funkcję aktualizującą emoji
  const mappings = updateSegmentEmojis()
  
  // Dla każdego mappingu, który nie ma segmentEmoji, użyj emoji
  mappings.forEach(mapping => {
    if (!mapping.segmentEmoji) {
      mapping.segmentEmoji = mapping.emoji || '🔹'
    }
  })
  
  return mappings
}
```

### updateSegmentEmojis

Funkcja aktualizująca emoji dla wszystkich segmentów.

```typescript
function updateSegmentEmojis() {
  // Funkcja pomocnicza do bezpiecznego ustawiania emoji
  const safeSetEmoji = (segmentId: string, emoji: string) => {
    const mapping = dnaCodeMappings.find(m => m.segmentId === segmentId)
    if (mapping) {
      mapping.segmentEmoji = emoji
    } else {
      console.warn(`Mapping not found for segment: ${segmentId}`)
    }
  }
  
  // Ustawienie emoji dla różnych kategorii segmentów
  // ...
  
  return dnaCodeMappings
}
```

### generateUniqueEmojiForSegment

Funkcja generująca unikalne emoji dla segmentu na podstawie jego ID.

```typescript
function generateUniqueEmojiForSegment(segmentId: string): string {
  // Tablica różnych emoji do użycia jako drugiego emoji
  const emojiOptions = ['💡', '📝', '🔧', '📊', '🔍', '📈', '⚙️', '🧩', '🔄', '📱', '💻', '📚', '🔔', '📢']
  
  // Wybierz emoji na podstawie segmentId - używaj deterministycznego wyboru
  const charSum = segmentId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const selectedEmoji = emojiOptions[charSum % emojiOptions.length]
  
  return selectedEmoji
}
```

### getDNAMappingForSegment

Funkcja pobierająca mapowanie dla konkretnego segmentu.

```typescript
export function getDNAMappingForSegment(segmentId: string): DNACodeMapping | undefined {
  // Najpierw sprawdź w statycznych mapowaniach
  const staticMapping = dnaCodeMappings.find(mapping => mapping.segmentId === segmentId)
  if (staticMapping) {
    // Jeśli nie ma segmentEmoji, wygeneruj je
    if (!staticMapping.segmentEmoji) {
      staticMapping.segmentEmoji = `${staticMapping.emoji}${generateUniqueEmojiForSegment(segmentId)}`
    }
    return staticMapping
  }
  
  // Jeśli nie znaleziono, wygeneruj dynamiczne mapowanie
  // ...
}
```

## Mapowanie emoji dla segmentów

System wykorzystuje kilka kategorii segmentów, każda z własnymi emoji:

### Kategorie segmentów i ich emoji

| Kategoria | Emoji | Przykłady segmentów |
|-----------|-------|---------------------|
| Lokalizacja | 📍 | continent, country, region, city, district |
| Organizacja | 🏢 | organization-type, organizational-culture, office-space |
| Format pracy | 🏠 | work-format, work-schedule, work-hours |
| Komunikacja | 💬 | communication-frequency, preferred-communication |
| Zespół | 👥 | team-work-style, team-size, team-structure |
| Rozwój | 🔄 | adaptability-speed, improvement-focus, creativity-level |
| Technologia | 💻 | tech-stack, hosting |

### Specyficzne emoji dla wartości

System zawiera również mapowanie konkretnych wartości na emoji:

#### Lokalizacje
- Europa: 🇪🇺
- Ameryka Północna: 🇺🇸
- Azja: 🇯🇵
- Polska: 🇵🇱
- Warszawa: WAW
- Kraków: KRK

#### Format pracy
- Zdalnie: 🏠
- Hybrydowo: 🏠🏢
- Stacjonarnie: 🏢

#### Technologie
- React: ⚛️
- Node.js: 📦
- TypeScript: ✏️
- JavaScript: ☕
- Python: 🐍

## Generowanie kodów DNA

### getDNACodeForValue

Funkcja konwertująca wartości segmentów na kody DNA.

```typescript
export function getDNACodeForValue(segmentId: string, value: string | number): string {
  const mapping = getDNAMappingForSegment(segmentId)
  if (!mapping) return value.toString()
  
  // Jeśli wartość jest pusta lub undefined, zwróć pusty string
  if (value === undefined || value === null || value === '') return ''
  
  // Różne strategie generowania kodu...
  
  // W przeciwnym razie zwróć oryginalną wartość
  return value.toString()
}
```

### Strategie generowania kodów

1. **Mapowanie wartości** - jeśli segment ma zdefiniowane mapowanie wartości, użyj go
2. **Typ skali** - dla wartości liczbowych, dodaj prefiks typu skali
3. **Szablon formatowania** - użyj zdefiniowanego szablonu formatowania
4. **Skrót dla długich tekstów**:
   - Dla pojedynczego słowa: pierwsze 3 litery (wielkie)
   - Dla wielu słów: pierwsze litery każdego słowa (maks. 3)

## Przykłady użycia

### Pobieranie emoji dla segmentu

```typescript
// Pobierz mapowanie dla segmentu
const mapping = getDNAMappingForSegment('work-format')

// Wyświetl emoji segmentu
console.log(mapping?.segmentEmoji) // np. "🏠📊"
```

### Generowanie kodu DNA dla wartości

```typescript
// Generuj kod DNA dla wartości segmentu
const dnaCode = getDNACodeForValue('work-format', 'remote')
console.log(dnaCode) // np. "🏠"

// Dla złożonej wartości
const complexCode = getDNACodeForValue('organization-type', 'Small Technology Startup')
console.log(complexCode) // np. "STS"
```

### Aktualizacja emoji dla wszystkich segmentów

```typescript
// Zaktualizuj emoji dla wszystkich segmentów
const updatedMappings = ensureSegmentEmojis()
console.log(`Zaktualizowano ${updatedMappings.length} mapowań`)
```

## Rozszerzanie systemu

Aby rozszerzyć system o nowe segmenty lub wartości:

1. **Dodaj nowe segmenty** do tablicy `dnaCodeMappings`
2. **Dodaj nowe wartości** do obiektu `valueToEmojiMap`
3. **Zaktualizuj kategorie** w funkcji `generateUniqueEmojiForSegment` jeśli potrzeba
4. **Wywołaj** `ensureSegmentEmojis()` aby zaktualizować wszystkie emoji

### Przykład dodawania nowego segmentu

```typescript
// Dodaj nowy segment
dnaCodeMappings.push({
  segmentId: 'project-complexity',
  code: 'PC',
  emoji: '🧩',
  areaId: 'project',
  description: 'Poziom złożoności projektu',
  scaleType: 'C'
})

// Zaktualizuj emoji dla wszystkich segmentów
ensureSegmentEmojis()
```

### Przykład dodawania nowych wartości

```typescript
// Dodaj nowe wartości do mapowania
Object.assign(valueToEmojiMap, {
  'bardzo niski': '⬇️⬇️',
  'niski': '⬇️',
  'średni': '➡️',
  'wysoki': '⬆️',
  'bardzo wysoki': '⬆️⬆️'
})
```
