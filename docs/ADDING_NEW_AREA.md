# Instrukcja dodawania nowego obszaru do ProfileMatrix

## 1. Struktura plików
Aby dodać nowy obszar do aplikacji, należy zmodyfikować następujące pliki:
- `/src/data/areas.json` - definicja obszaru
- `/src/data/segments/[area-name].json` - segmenty dla obszaru
- `/src/lib/data-loader.ts` - import i ładowanie segmentów

## 2. Tworzenie pliku segmentów
1. Utwórz nowy plik `/src/data/segments/[area-name].json`
2. Struktura segmentu:
```json
[
  {
    "id": "segment-id",
    "name": "Nazwa Segmentu",
    "iconName": "IconName",
    "emoji": "🔵",
    "type": "toggle",
    "options": [
      {
        "id": "option-id",
        "label": "🔵 Etykieta",
        "value": "Wartość",
        "description": "Opis opcji"
      }
    ],
    "areaId": "area-id",
    "description": "Opis segmentu",
    "code": "XX",
    "valueMap": {
      "Wartość": "X"
    },
    "reverseValueMap": {
      "X": "Wartość"
    }
  }
]
```

## 3. Dodawanie obszaru
1. Dodaj definicję obszaru w `/src/data/areas.json`:
```json
{
  "id": "area-id",
  "name": "Nazwa Obszaru",
  "iconName": "IconName",
  "emoji": "🔵",
  "description": "Opis obszaru"
}
```

## 4. Aktualizacja data-loader.ts
1. Dodaj import nowego pliku segmentów:
```typescript
import newAreaSegments from '../data/segments/[area-name].json'
```

2. Dodaj segmenty do tablicy `allSegments`:
```typescript
const allSegments = [
  ...existingSegments,
  ...newAreaSegments,
  // ...
]
```

## 5. Konwencje nazewnictwa
- ID obszaru: kebab-case (np. `work-intimacy`)
- ID segmentów: kebab-case (np. `workplace-relationships`)
- Kody segmentów: 2 wielkie litery (np. `WR`)
- Kody wartości: 1 wielka litera (np. `N`, `O`, `S`)

## 6. Ikony i emoji
- Ikony: używaj nazw z biblioteki lucide-react
- Emoji: użyj jednego emoji dla obszaru i odpowiednich dla opcji

## 7. Testowanie
1. Sprawdź, czy nowy obszar pojawia się w menu
2. Sprawdź, czy wszystkie segmenty się wyświetlają
3. Sprawdź, czy kod DNA jest generowany poprawnie
4. Sprawdź, czy opcje działają prawidłowo

## 8. Wskazówki
- Zachowaj spójną strukturę z istniejącymi obszarami
- Używaj opisowych nazw i wartości
- Dodawaj szczegółowe opisy dla opcji
- Unikaj duplikowania kodów między segmentami
- Pamiętaj o tłumaczeniach (wszystkie teksty po polsku)

## 9. Przykład
Przykład dodania nowego obszaru "Relacje i Granice":
1. Utworzono `/src/data/segments/work-intimacy.json`
2. Dodano obszar w `areas.json`
3. Zaktualizowano `data-loader.ts`
4. Dodano segmenty: relacje, granice, flirt, atrakcyjność

## 10. Ważne uwagi
- Każdy segment musi mieć unikalny kod w ramach całej aplikacji
- Wartości w `valueMap` muszą być unikalne w ramach segmentu
- Opisy powinny być jasne i zwięzłe
- Emoji powinny być odpowiednio dobrane do kontekstu
