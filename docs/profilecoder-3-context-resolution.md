# ProfileMatrix 3.0 - Algorytm Rozwiązywania Kontekstu

*Dokument implementacyjny dla patcha PC3.0-2029-06*

## 1. Wprowadzenie do hierarchii kontekstów

Hierarchia kontekstów to kluczowy element standardu ProfileMatrix 3.0, umożliwiający precyzyjne określanie preferencji w różnych sytuacjach zawodowych. Niniejszy dokument formalizuje strukturę hierarchii, reguły dziedziczenia oraz algorytmy rozwiązywania konfliktów kontekstowych.

### 1.1 Struktura hierarchii kontekstów

Konteksty w ProfileMatrix 3.0 są organizowane w hierarchiczną strukturę drzewa, gdzie bardziej szczegółowe konteksty są potomkami kontekstów bardziej ogólnych:

```
@Work
  ├── @Work.Meeting
  │     ├── @Work.Meeting.Client
  │     ├── @Work.Meeting.Internal
  │     └── @Work.Meeting.Team
  ├── @Work.Project
  │     ├── @Work.Project.Planning
  │     └── @Work.Project.Execution
  └── @Work.Personal
        ├── @Work.Personal.Focus
        └── @Work.Personal.Development
```

### 1.2 Priorytetyzacja kontekstów specjalnych

Niektóre konteksty mają przypisane specjalne priorytety, które zawsze zastępują konteksty standardowe:

| Typ kontekstu | Priorytet | Przykłady |
|--------------|-----------|-----------|
| Kryzysowy | 100 | @Crisis, @Emergency |
| Krytyczny | 80 | @Deadline, @Critical |
| Ważny | 60 | @Important, @Client |
| Standardowy | 40 | @Work, @Personal |
| Elastyczny | 20 | @Flexible, @Leisure |

## 2. Algorytm rozwiązywania kontekstów

Poniżej przedstawiamy formalny algorytm do rozwiązywania preferencji w przypadku nakładających się kontekstów:

```typescript
/**
 * Główna funkcja rozwiązywania kontekstu dla preferencji
 * 
 * @param property Nazwa właściwości, dla której rozwiązujemy preferencję
 * @param profile Pełny profil użytkownika
 * @param activeContexts Aktualnie aktywne konteksty
 * @returns Rozwiązana wartość preferencji lub null, jeśli nie znaleziono
 */
function resolveContextualPreference(
  property: string,
  profile: Profile,
  activeContexts: Context[]
): PreferenceValue | null {
  // Sortujemy aktywne konteksty według priorytetu i specyficzności
  const sortedContexts = sortContextsByPriorityAndSpecificity(activeContexts);
  
  // Dla każdego kontekstu, szukamy preferencji w kolejności priorytetów
  for (const context of sortedContexts) {
    // 1. Sprawdź dokładne dopasowanie kontekstu dla tej właściwości
    const exactMatch = findExactPropertyContextMatch(property, profile, context);
    if (exactMatch) return exactMatch;
    
    // 2. Sprawdź konteksty nadrzędne dla tego kontekstu
    const parentMatch = findMatchInParentContexts(property, profile, context);
    if (parentMatch) return parentMatch;
  }
  
  // 3. Jeśli nie znaleziono dopasowania, szukaj w kontekście globalnym (bez kontekstu)
  const globalMatch = findGlobalPropertyMatch(property, profile);
  if (globalMatch) return globalMatch;
  
  // 4. Nie znaleziono żadnej pasującej preferencji
  return null;
}

/**
 * Sortuje konteksty według priorytetu i specyficzności
 */
function sortContextsByPriorityAndSpecificity(contexts: Context[]): Context[] {
  return [...contexts].sort((a, b) => {
    // Najpierw sortuj według priorytetów kontekstów
    const priorityDiff = getContextPriority(b) - getContextPriority(a);
    if (priorityDiff !== 0) return priorityDiff;
    
    // Przy równych priorytetach, bardziej specyficzne konteksty mają pierwszeństwo
    return getContextSpecificity(b) - getContextSpecificity(a);
  });
}

/**
 * Zwraca priorytet kontekstu na podstawie jego typu
 */
function getContextPriority(context: Context): number {
  const contextPriorities: {[key: string]: number} = {
    'Crisis': 100,
    'Emergency': 100,
    'Deadline': 80,
    'Critical': 80,
    'Important': 60,
    'Client': 60,
    'Work': 40,
    'Personal': 40,
    'Flexible': 20,
    'Leisure': 20
  };
  
  // Sprawdź czy kontekst lub jego prefiks ma przypisany priorytet
  for (const [prefix, priority] of Object.entries(contextPriorities)) {
    if (context.name === prefix || context.name.startsWith(`${prefix}.`)) {
      return priority;
    }
  }
  
  // Domyślny priorytet dla nieznanych kontekstów
  return 30;
}

/**
 * Oblicza specyficzność kontekstu na podstawie głębokości w hierarchii
 */
function getContextSpecificity(context: Context): number {
  // Więcej poziomów zagnieżdżenia oznacza wyższą specyficzność
  return context.name.split('.').length;
}

/**
 * Znajduje dokładne dopasowanie właściwości w danym kontekście
 */
function findExactPropertyContextMatch(
  property: string,
  profile: Profile,
  context: Context
): PreferenceValue | null {
  for (const segment of profile.segments) {
    for (const prop of segment.properties) {
      if (prop.key === property && 
          prop.context && 
          prop.context.name === context.name) {
        return prop.value;
      }
    }
  }
  return null;
}

/**
 * Znajduje dopasowanie w kontekstach nadrzędnych
 */
function findMatchInParentContexts(
  property: string,
  profile: Profile,
  context: Context
): PreferenceValue | null {
  // Generuj wszystkie konteksty nadrzędne (np. dla Work.Meeting.Client -> [Work.Meeting, Work])
  const parts = context.name.split('.');
  const parentContexts: string[] = [];
  
  for (let i = parts.length - 1; i > 0; i--) {
    parentContexts.push(parts.slice(0, i).join('.'));
  }
  
  // Sprawdź każdy kontekst nadrzędny w kolejności od najbardziej do najmniej specyficznego
  for (const parentName of parentContexts) {
    for (const segment of profile.segments) {
      for (const prop of segment.properties) {
        if (prop.key === property && 
            prop.context && 
            prop.context.name === parentName) {
          return prop.value;
        }
      }
    }
  }
  
  return null;
}

/**
 * Znajduje globalne dopasowanie właściwości (bez kontekstu)
 */
function findGlobalPropertyMatch(
  property: string,
  profile: Profile
): PreferenceValue | null {
  for (const segment of profile.segments) {
    for (const prop of segment.properties) {
      if (prop.key === property && !prop.context) {
        return prop.value;
      }
    }
  }
  return null;
}
```

## 3. Reguły dziedziczenia kontekstowego

Hierarchia kontekstów w ProfileMatrix 3.0 podlega następującym regułom dziedziczenia:

### 3.1 Podstawowe reguły

1. **Dziedziczenie w dół**: Konteksty potomne dziedziczą preferencje z kontekstów nadrzędnych, jeśli nie posiadają własnej definicji.

2. **Przesłanianie**: Konteksty potomne mogą przesłaniać preferencje z kontekstów nadrzędnych poprzez zdefiniowanie własnych wartości.

3. **Wielopoziomowe dziedziczenie**: Dziedziczenie działa przez dowolną liczbę poziomów hierarchii.

### 3.2 Przykład dziedziczenia

```
// Podstawowe preferencje dla pracy
💼@Work{👔=👕^3;🏢=🏠^4;👂=🔊^3}

// Specyficzne dla spotkań - przesłaniają część preferencji, a inne dziedziczą
💼@Work.Meeting{👔=👔^4;👂=🔇^5}

// Specyficzne dla spotkań z klientami - jeszcze bardziej specyficzne przesłonięcia
💼@Work.Meeting.Client{👔=👔^5}
```

W tym przykładzie:
- W kontekście `@Work.Meeting.Client`:
  - Preferencja ubioru (`👔`) będzie `👔^5` (zdefiniowana lokalnie)
  - Preferencja hałasu (`👂`) będzie `🔇^5` (dziedziczona z `@Work.Meeting`)
  - Preferencja lokalizacji (`🏢`) będzie `🏠^4` (dziedziczona z `@Work`)

## 4. Rozwiązywanie konfliktów kontekstowych

Przy nakładających się lub konkurujących kontekstach stosuje się następujące strategie rozwiązywania konfliktów:

### 4.1 Priorytetyzacja według wagi

Gdy ta sama właściwość jest zdefiniowana w wielu aktywnych kontekstach, wartość z kontekstu o najwyższej wadze jest wybierana. Dotyczy to również sytuacji, gdy konteksty mają te same priorytety i specyficzność:

```typescript
/**
 * Rozwiązuje konflikty między kontekstami o tym samym priorytecie i specyficzności
 */
function resolveConflictsByWeight(
  property: string,
  profile: Profile,
  equalContexts: Context[]
): PreferenceValue | null {
  let maxWeight = -1;
  let bestValue = null;
  
  for (const context of equalContexts) {
    const propValue = findExactPropertyContextMatch(property, profile, context);
    
    if (propValue && propValue.weight > maxWeight) {
      maxWeight = propValue.weight;
      bestValue = propValue;
    }
  }
  
  return bestValue;
}
```

### 4.2 Agregacja wartości z wielu kontekstów

W niektórych przypadkach, wartości z wielu kontekstów mogą być łączone zamiast wybierania jednej z nich:

```typescript
/**
 * Agreguje wartości z wielu kontekstów dla właściwości wielowartościowych
 */
function aggregateMultiValuePreferences(
  property: string,
  profile: Profile,
  contexts: Context[]
): PreferenceValue[] | null {
  const aggregatedValues: {value: string, weight: number}[] = [];
  const seenValues = new Set<string>();
  
  // Sortuj konteksty według priorytetu i specyficzności
  const sortedContexts = sortContextsByPriorityAndSpecificity(contexts);
  
  // Zbierz unikalne wartości ze wszystkich kontekstów
  for (const context of sortedContexts) {
    const propValue = findExactPropertyContextMatch(property, profile, context);
    
    if (propValue) {
      // Obsługa wielu wartości w pojedynczej preferencji
      const values = Array.isArray(propValue.values) 
        ? propValue.values 
        : [propValue.value];
      
      for (const val of values) {
        if (!seenValues.has(val)) {
          seenValues.add(val);
          aggregatedValues.push({
            value: val,
            weight: propValue.weight
          });
        }
      }
    }
  }
  
  // Sortuj według wagi i zwróć tylko wartości
  return aggregatedValues
    .sort((a, b) => b.weight - a.weight)
    .map(item => item.value);
}
```

## 5. Przypadki testowe rozwiązywania kontekstów

Poniżej przedstawiamy przykłady rozwiązywania preferencji w różnych scenariuszach kontekstowych:

### 5.1 Podstawowe przypadki testowe

```typescript
// Profil testowy
const testProfile = {
  segments: [
    {
      category: "💼",
      properties: [
        { key: "👔", value: "👕", context: null }, // Domyślny, bez kontekstu
        { key: "👔", value: "👔", context: { name: "Work" }, weight: 3 },
        { key: "👔", value: "👔", context: { name: "Work.Meeting" }, weight: 4 },
        { key: "👔", value: "👔", context: { name: "Work.Meeting.Client" }, weight: 5 },
        { key: "🏢", value: "🏠", context: { name: "Work" }, weight: 4 },
        { key: "👂", value: "🔊", context: { name: "Work" }, weight: 3 },
        { key: "👂", value: "🔇", context: { name: "Work.Meeting" }, weight: 5 }
      ]
    }
  ]
};

// Przypadki testowe
const testCases = [
  {
    name: "Single active context",
    property: "👔",
    activeContexts: [{ name: "Work" }],
    expectedValue: "👔" // Z kontekstu Work
  },
  {
    name: "Hierarchy - child overrides parent",
    property: "👔",
    activeContexts: [{ name: "Work.Meeting" }],
    expectedValue: "👔" // Z kontekstu Work.Meeting (zastępuje Work)
  },
  {
    name: "Hierarchy - parent used when not in child",
    property: "🏢",
    activeContexts: [{ name: "Work.Meeting" }],
    expectedValue: "🏠" // Dziedziczone z Work, ponieważ nie zdefiniowano w Work.Meeting
  },
  {
    name: "Multiple contexts - most specific wins",
    property: "👔",
    activeContexts: [{ name: "Work" }, { name: "Work.Meeting" }],
    expectedValue: "👔" // Z Work.Meeting (bardziej specyficzny)
  },
  {
    name: "Multiple contexts with same specificity - highest weight wins",
    property: "👂",
    activeContexts: [{ name: "Personal" }, { name: "Work" }],
    expectedValue: "🔊" // Z Work (Personal nie ma tej właściwości)
  },
  {
    name: "Fallback to global preference",
    property: "👔",
    activeContexts: [{ name: "Personal" }],
    expectedValue: "👕" // Globalna preferencja (bez kontekstu)
  },
  {
    name: "Special priority overrides specificity",
    property: "👔",
    activeContexts: [{ name: "Work.Meeting" }, { name: "Client" }],
    expectedValue: "👔" // Work.Meeting jest bardziej specyficzne, ale Client ma wyższy priorytet
  }
];
```

### 5.2 Złożone przypadki testowe

```typescript
// Przypadki złożone z nakładającymi się kontekstami
const complexTestCases = [
  {
    name: "Multiple active hierarchical contexts",
    property: "👔",
    activeContexts: [
      { name: "Work" }, 
      { name: "Work.Meeting" }, 
      { name: "Work.Meeting.Client" }
    ],
    expectedValue: "👔", // Z Work.Meeting.Client (najbardziej specyficzny)
  },
  {
    name: "Conflict between high-priority and specific contexts",
    property: "👔",
    activeContexts: [
      { name: "Work.Meeting.Client" }, // Najbardziej specyficzny
      { name: "Deadline" }            // Wysoki priorytet
    ],
    expectedValue: "👔", // Deadline ma wyższy priorytet (80) niż Work.Meeting.Client (40-60)
  },
  {
    name: "Emergency overrides everything",
    property: "👔",
    activeContexts: [
      { name: "Work.Meeting.Client" },
      { name: "Deadline" },
      { name: "Emergency" }
    ],
    expectedValue: "👔", // Emergency ma najwyższy priorytet (100)
  }
];
```

## 6. Zalecenia implementacyjne

1. **Wydajność**: Algorytm rozwiązywania kontekstów może być kosztowny dla dużych profili z wieloma kontekstami. Rozważ użycie buforowania i indeksowania do optymalizacji.

2. **Debugowanie**: Implementuj szczegółowe informacje diagnostyczne dla deweloperów, pokazujące jak zostały rozwiązane poszczególne preferencje.

3. **Dynamiczne konteksty**: Umożliw dynamiczne definiowanie i aktywowanie kontekstów, zwłaszcza w środowiskach adaptacyjnych.

4. **Konflikty**: Implementuj strategie rozwiązywania konfliktów z możliwością konfiguracji przez użytkownika.

5. **Skalowalność**: Projektuj z myślą o rozszerzaniu struktury kontekstów, dodawaniu nowych typów i priorytetów.

## 7. Integracja z istniejącymi systemami

Algorytm rozwiązywania kontekstów może być wdrożony w istniejących systemach poprzez:

1. **API adaptacyjne**: Udostępnianie interfejsu API, który przyjmuje aktywne konteksty i zwraca rozwiązane preferencje.

2. **Middleware kontekstowe**: Implementacja warstwy pośredniczącej, która automatycznie wykrywa kontekst i dostosowuje preferencje.

3. **Buforowanie profilów kontekstowych**: Generowanie i buforowanie rozwiązanych profili dla często używanych kombinacji kontekstów.

4. **Debugowanie**: Narzędzia analizujące i wizualizujące proces rozwiązywania kontekstów, pomagające zarówno użytkownikom jak i deweloperom.

Niniejszy dokument stanowi kompleksową specyfikację algorytmu rozwiązywania kontekstów dla standardu ProfileMatrix 3.0, zgodnie z wymaganiami określonymi w poprawce PC3.0-2029-06.
