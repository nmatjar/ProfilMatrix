# Plan Implementacji Formatu Kodu DNA

## Przegląd

Ten dokument przedstawia plan przeprogramowania obecnego systemu generowania kodu profilu w aplikacji ProfileMatrix do formatu DNA. Plan zakłada etapowe wdrożenie, minimalizację ryzyka i zachowanie kompatybilności wstecznej.

## Fazy Implementacji

### Faza 1: Analiza i Przygotowanie (2 tygodnie)

#### 1.1 Mapowanie Obecnych Segmentów do Formatu DNA
- Utworzenie tabeli mapującej istniejące segmenty na nowe kody DNA
- Definiowanie standardowych kodów dla każdej kategorii i wartości
- Określenie standardowych skal dla wartości liczbowych

#### 1.2 Projektowanie Struktury Danych
- Zaprojektowanie nowych interfejsów TypeScript dla formatu DNA
- Rozszerzenie istniejących typów danych o pola potrzebne w nowym formacie
- Stworzenie schematów walidacji dla nowego formatu

#### 1.3 Dokumentacja Formatu
- Opracowanie pełnej dokumentacji formatu DNA
- Stworzenie "słownika kodów" dla wszystkich segmentów
- Przygotowanie wizualnych przykładów i objaśnień

#### 1.4 Prototypowanie
- Stworzenie prostego prototypu generatora kodu DNA
- Testowanie różnych wariantów formatu
- Zbieranie informacji zwrotnych od zespołu

### Faza 2: Implementacja Podstawowa (3 tygodnie)

#### 2.1 Rozszerzenie Modelu Danych
```typescript
// Przykładowy interfejs dla segmentu DNA
interface DNASegment {
  id: string;
  emoji: string;
  code: string;
  values: DNAValue[];
  format: string;
  description: string;
}

interface DNAValue {
  id: string;
  code: string;
  value: string | number;
  description: string;
  scaleType?: 'P' | 'T' | 'F' | 'C' | 'A' | 'S';
  scaleMin?: number;
  scaleMax?: number;
}
```

#### 2.2 Implementacja Generatora Kodu DNA
- Stworzenie nowej funkcji `generateDNACode` w oddzielnym module
- Implementacja algorytmów formatowania dla różnych typów segmentów
- Dodanie obsługi mikrosegmentów i rozszerzeń

#### 2.3 Implementacja Parsera Kodu DNA
- Stworzenie funkcji `parseDNACode` do interpretacji kodu DNA
- Implementacja walidacji formatu
- Obsługa różnych wariantów składni (z nawiasami i bez)

#### 2.4 Integracja z Istniejącym Kodem
- Dodanie nowych funkcji do istniejących modułów
- Zachowanie obecnego generatora kodu jako opcji
- Implementacja przełącznika między formatami

### Faza 3: Rozszerzenie UI (2 tygodnie)

#### 3.1 Aktualizacja Komponentów Formularza
- Dostosowanie komponentów do obsługi nowych typów danych
- Dodanie komponentów dla skal ocen (P0-100, T1-5, itp.)
- Implementacja walidacji formularzy dla nowego formatu

#### 3.2 Wizualizacja Kodu DNA
- Stworzenie komponentu do wizualnej prezentacji kodu DNA
- Implementacja interaktywnych tooltipów wyjaśniających znaczenie kodów
- Dodanie możliwości kopiowania kodu w różnych formatach

#### 3.3 Edytor Kodu DNA
- Implementacja edytora umożliwiającego bezpośrednią edycję kodu DNA
- Dodanie funkcji autouzupełniania i podpowiedzi
- Implementacja walidacji w czasie rzeczywistym

#### 3.4 Widok Porównawczy
- Stworzenie widoku do porównywania dwóch kodów DNA
- Implementacja wizualizacji podobieństw i różnic
- Dodanie funkcji obliczania "kompatybilności" między profilami

### Faza 4: Testowanie i Optymalizacja (2 tygodnie)

#### 4.1 Testy Jednostkowe
- Napisanie testów dla generatora kodu DNA
- Napisanie testów dla parsera kodu DNA
- Testowanie edge cases i obsługi błędów

#### 4.2 Testy Integracyjne
- Testowanie integracji nowego formatu z istniejącym kodem
- Weryfikacja kompatybilności wstecznej
- Testowanie migracji danych

#### 4.3 Testy Wydajnościowe
- Analiza wydajności generowania i parsowania kodu DNA
- Optymalizacja algorytmów dla dużych zbiorów danych
- Testowanie w różnych środowiskach

#### 4.4 Testy Użyteczności
- Zbieranie informacji zwrotnych od użytkowników
- Identyfikacja problemów z UX
- Iteracyjne udoskonalanie interfejsu

### Faza 5: Wdrożenie i Dokumentacja (1 tydzień)

#### 5.1 Migracja Danych
- Implementacja narzędzi do migracji istniejących profili
- Testowanie procesu migracji
- Przygotowanie planów awaryjnych

#### 5.2 Aktualizacja Dokumentacji
- Aktualizacja dokumentacji technicznej
- Stworzenie przewodników dla użytkowników
- Przygotowanie materiałów szkoleniowych

#### 5.3 Wdrożenie Produkcyjne
- Wdrożenie nowego formatu jako opcji w wersji beta
- Zbieranie informacji zwrotnych
- Stopniowe przejście na nowy format jako domyślny

## Szczegóły Techniczne

### Modyfikacje Struktury Plików

1. **Nowe Pliki**
   - `src/lib/dna-code-generator.ts` - Generator kodu DNA
   - `src/lib/dna-code-parser.ts` - Parser kodu DNA
   - `src/lib/dna-segment-data.ts` - Definicje segmentów DNA
   - `src/components/DNACodeEditor.tsx` - Komponent edytora kodu DNA
   - `src/components/DNACodeVisualizer.tsx` - Komponent wizualizacji kodu DNA

2. **Modyfikacje Istniejących Plików**
   - `src/lib/segment-data.ts` - Rozszerzenie o mapowanie do kodów DNA
   - `src/pages/Index.tsx` - Dodanie obsługi formatu DNA
   - `src/pages/SegmentManagerPage.tsx` - Rozszerzenie o zarządzanie kodami DNA

### Przykładowa Implementacja Generatora Kodu DNA

```typescript
// src/lib/dna-code-generator.ts

import { DNASegment, DNAValue, ActiveSegment } from '../types';
import { dnaSegments } from './dna-segment-data';

interface DNACodeOptions {
  useSquareBrackets?: boolean;
  includeMicroSegments?: boolean;
  formatType?: 'compact' | 'readable';
}

export function generateDNACode(
  activeSegments: ActiveSegment[],
  selections: Record<string, any>,
  options: DNACodeOptions = {}
): string {
  const {
    useSquareBrackets = false,
    includeMicroSegments = true,
    formatType = 'compact'
  } = options;

  // Filtruj tylko widoczne segmenty
  const visibleSegments = activeSegments.filter(s => s.visible);
  
  // Grupuj segmenty według głównych kategorii DNA
  const groupedSegments = groupSegmentsByDNACategory(visibleSegments);
  
  // Generuj kod dla każdej grupy
  const codeSegments = Object.entries(groupedSegments).map(([category, segments]) => {
    const dnaCategory = dnaSegments.find(s => s.id === category);
    if (!dnaCategory) return '';
    
    const values = segments.map(segment => {
      const dnaValue = getDNAValueForSegment(segment, selections);
      return dnaValue ? dnaValue.code : '';
    }).filter(Boolean);
    
    if (values.length === 0) return '';
    
    const valuesStr = values.join('.');
    const openBracket = useSquareBrackets ? '[' : '';
    const closeBracket = useSquareBrackets ? ']' : '';
    
    return `${dnaCategory.emoji}${openBracket}${valuesStr}${closeBracket}`;
  }).filter(Boolean);
  
  // Dodaj mikrosegmenty jeśli opcja włączona
  if (includeMicroSegments) {
    const microSegments = generateMicroSegments(activeSegments, selections);
    if (microSegments) {
      codeSegments.push(microSegments);
    }
  }
  
  // Połącz wszystkie segmenty
  return codeSegments.join(' | ');
}

function groupSegmentsByDNACategory(segments: ActiveSegment[]): Record<string, ActiveSegment[]> {
  // Implementacja grupowania segmentów według kategorii DNA
  // ...
}

function getDNAValueForSegment(segment: ActiveSegment, selections: Record<string, any>): DNAValue | null {
  // Implementacja mapowania wartości segmentu na kod DNA
  // ...
}

function generateMicroSegments(segments: ActiveSegment[], selections: Record<string, any>): string {
  // Implementacja generowania mikrosegmentów
  // ...
}
```

### Przykładowa Implementacja Parsera Kodu DNA

```typescript
// src/lib/dna-code-parser.ts

import { DNASegment, DNAValue } from '../types';
import { dnaSegments } from './dna-segment-data';

interface ParsedDNACode {
  segments: {
    category: string;
    emoji: string;
    values: {
      code: string;
      value: string | number;
      description: string;
    }[];
  }[];
  microSegments: {
    type: string;
    code: string;
    value: string | number;
  }[];
  raw: string;
}

export function parseDNACode(code: string): ParsedDNACode | null {
  if (!code) return null;
  
  try {
    // Rozdziel kod na segmenty
    const segments = code.split(' | ');
    
    const parsedSegments = [];
    const parsedMicroSegments = [];
    
    // Parsuj każdy segment
    for (const segment of segments) {
      // Sprawdź czy to mikrosegment
      if (isMicroSegment(segment)) {
        const parsed = parseMicroSegment(segment);
        if (parsed) {
          parsedMicroSegments.push(parsed);
        }
        continue;
      }
      
      // Parsuj normalny segment
      const parsed = parseSegment(segment);
      if (parsed) {
        parsedSegments.push(parsed);
      }
    }
    
    return {
      segments: parsedSegments,
      microSegments: parsedMicroSegments,
      raw: code
    };
  } catch (error) {
    console.error('Error parsing DNA code:', error);
    return null;
  }
}

function isMicroSegment(segment: string): boolean {
  // Implementacja sprawdzania czy segment jest mikrosegmentem
  // ...
}

function parseMicroSegment(segment: string): any {
  // Implementacja parsowania mikrosegmentu
  // ...
}

function parseSegment(segment: string): any {
  // Implementacja parsowania normalnego segmentu
  // ...
}
```

## Integracja z UI

### Modyfikacje w Index.tsx

Główne zmiany w komponencie Index.tsx będą obejmować:

1. Dodanie przełącznika formatu kodu
2. Integrację generatora kodu DNA
3. Aktualizację wyświetlania wygenerowanego kodu

```tsx
// Fragment kodu do dodania w Index.tsx

const [codeFormat, setCodeFormat] = useState<'legacy' | 'dna'>('legacy');

// Funkcja generująca kod profilu
const generateProfile = () => {
  if (codeFormat === 'dna') {
    const dnaCode = generateDNACode(activeSegments, selections, {
      useSquareBrackets: false,
      includeMicroSegments: true
    });
    setProfile(dnaCode);
  } else {
    // Istniejąca logika generowania kodu
    let profileCode = "";
    
    Object.entries(selections).forEach(([key, value]) => {
      if (value) {
        profileCode += `${key}:${value} `;
      }
    });
    
    setProfile(profileCode.trim());
  }
};

// Komponent przełącznika formatu
const renderFormatToggle = () => {
  return (
    <div className="flex items-center space-x-2 mt-4">
      <span>Format kodu:</span>
      <button
        onClick={() => setCodeFormat('legacy')}
        className={`px-3 py-1 rounded ${
          codeFormat === 'legacy' 
            ? 'bg-green-700 text-black' 
            : 'border border-green-700'
        }`}
      >
        Klasyczny
      </button>
      <button
        onClick={() => setCodeFormat('dna')}
        className={`px-3 py-1 rounded ${
          codeFormat === 'dna' 
            ? 'bg-green-700 text-black' 
            : 'border border-green-700'
        }`}
      >
        DNA
      </button>
    </div>
  );
};
```

## Harmonogram i Zasoby

### Szacunkowy Harmonogram
- **Faza 1 (Analiza i Przygotowanie)**: 2 tygodnie
- **Faza 2 (Implementacja Podstawowa)**: 3 tygodnie
- **Faza 3 (Rozszerzenie UI)**: 2 tygodnie
- **Faza 4 (Testowanie i Optymalizacja)**: 2 tygodnie
- **Faza 5 (Wdrożenie i Dokumentacja)**: 1 tydzień
- **Całkowity czas**: 10 tygodni

### Potrzebne Zasoby
- 1 programista TypeScript/React (pełny etat)
- 1 projektant UX (pół etatu)
- 1 tester (pół etatu)

### Kamienie Milowe
1. **Tydzień 2**: Ukończona dokumentacja formatu DNA i prototyp generatora
2. **Tydzień 5**: Działający generator i parser kodu DNA
3. **Tydzień 7**: Ukończony interfejs użytkownika dla formatu DNA
4. **Tydzień 9**: Zakończone testy i optymalizacja
5. **Tydzień 10**: Wdrożenie produkcyjne

## Ryzyko i Mitygacja

### Potencjalne Ryzyka
1. **Złożoność formatu**: Format DNA może okazać się zbyt złożony dla użytkowników
   - *Mitygacja*: Stopniowe wprowadzanie, dobra dokumentacja, tooltips w UI
   
2. **Problemy z kompatybilnością**: Istniejące profile mogą nie mapować się dobrze na nowy format
   - *Mitygacja*: Zachowanie starego formatu jako opcji, dokładne testowanie migracji
   
3. **Wydajność**: Generowanie i parsowanie złożonego formatu może wpływać na wydajność
   - *Mitygacja*: Optymalizacja algorytmów, caching, testowanie wydajnościowe
   
4. **Złożoność UI**: Interfejs dla formatu DNA może być trudny w obsłudze
   - *Mitygacja*: Iteracyjne projektowanie UX, testy użyteczności

## Wnioski

Implementacja formatu kodu DNA to znacząca zmiana w aplikacji ProfileMatrix, która oferuje wiele korzyści w zakresie standaryzacji, gęstości informacji i potencjału algorytmicznego. Plan zakłada etapowe wdrożenie z zachowaniem kompatybilności wstecznej, co minimalizuje ryzyko i pozwala na iteracyjne udoskonalanie.

Kluczem do sukcesu będzie dokładna dokumentacja formatu, intuicyjny interfejs użytkownika i solidne testowanie. Wdrożenie powinno być poprzedzone fazą beta, w której użytkownicy mogą wypróbować nowy format i dostarczyć informacji zwrotnych.

Po pełnym wdrożeniu, format DNA otworzy nowe możliwości dla aplikacji, takie jak zaawansowane dopasowywanie profili, analiza kompatybilności i wizualizacje danych.
