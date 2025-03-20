# Dobre praktyki kodowania w projekcie ProfileCoder

## Renderowanie komponentów React

### Ikony i komponenty React
- **Problem**: Błąd `Objects are not valid as a React child (found: object with keys {$$typeof, render})`
- **Rozwiązanie**: Zawsze sprawdzaj, czy obiekt jest prawidłowym elementem React przed renderowaniem:
  ```tsx
  // ❌ Źle - może spowodować błąd, jeśli icon nie jest elementem React
  {icon}
  
  // ✅ Dobrze - sprawdza, czy icon jest prawidłowym elementem React
  {React.isValidElement(icon) ? icon : null}
  ```

- **Tworzenie ikon**: Używaj `React.createElement()` zamiast bezpośredniego przekazywania komponentu:
  ```tsx
  // ❌ Źle - zwraca komponent, a nie element
  function getIconComponent(iconName: string): React.ReactNode {
    return Icons[iconName] || Icons.HelpCircle;
  }
  
  // ✅ Dobrze - zwraca element React
  function getIconComponent(iconName: string): React.ReactNode {
    const IconComponent = Icons[iconName] || Icons.HelpCircle;
    return React.createElement(IconComponent);
  }
  ```

## Typy TypeScript

### Unikanie typu `any`
- **Problem**: Używanie `any` omija sprawdzanie typów
- **Rozwiązanie**: Używaj bardziej precyzyjnych typów:
  ```tsx
  // ❌ Źle
  const [selections, setSelections] = useState<Record<string, any>>({});
  
  // ✅ Dobrze
  const [selections, setSelections] = useState<Record<string, string | number>>({});
  ```

### Obsługa opcjonalnych właściwości
- **Problem**: Brak sprawdzania, czy opcjonalne właściwości istnieją
- **Rozwiązanie**: Zawsze sprawdzaj istnienie opcjonalnych właściwości:
  ```tsx
  // ❌ Źle - może spowodować błąd, jeśli category.options nie istnieje
  category.options.map(option => ...)
  
  // ✅ Dobrze - sprawdza, czy options istnieje
  category.options?.map(option => ...) || null
  ```

## Obsługa danych

### Sprawdzanie poprawności danych
- **Problem**: Brak sprawdzania, czy dane mają wszystkie wymagane właściwości
- **Rozwiązanie**: Dodaj funkcje sprawdzające poprawność danych:
  ```tsx
  // Sprawdź, czy wszystkie segmenty mają wymagane właściwości
  segments.forEach(segment => {
    if (!segment.type) {
      console.error(`Segment ${segment.name} (${segment.id}) has no type property`);
    }
    if (segment.type !== 'input' && segment.type !== 'slider' && !segment.options) {
      console.error(`Segment ${segment.name} (${segment.id}) has no options property`);
    }
  });
  ```

### Obsługa przypadków brzegowych
- **Problem**: Brak obsługi przypadków, gdy dane nie są zgodne z oczekiwaniami
- **Rozwiązanie**: Zawsze dodawaj obsługę przypadków brzegowych:
  ```tsx
  // ❌ Źle - brak obsługi przypadku, gdy segment nie ma typu ani opcji
  {category.type === "input" ? (
    <Input ... />
  ) : category.type === "slider" ? (
    <Slider ... />
  ) : category.options ? (
    <ToggleGroup ... />
  ) : null}
  
  // ✅ Dobrze - obsługa wszystkich przypadków
  {category.type === "input" ? (
    <Input ... />
  ) : category.type === "slider" ? (
    <Slider ... />
  ) : category.options ? (
    <ToggleGroup ... />
  ) : (
    <p className="text-red-500">Brak opcji dla tego segmentu</p>
  )}
  ```

## Debugowanie

### Logowanie
- Używaj `console.log` do debugowania, ale pamiętaj o usunięciu tych wpisów przed produkcją
- Loguj pełne obiekty, aby zobaczyć ich strukturę:
  ```tsx
  console.log('Rendering category:', category);
  ```

### Sprawdzanie typów w czasie wykonania
- Używaj `typeof` i `instanceof` do sprawdzania typów w czasie wykonania:
  ```tsx
  if (typeof value === 'string') {
    // Obsługa ciągu znaków
  } else if (typeof value === 'number') {
    // Obsługa liczby
  }
  ```

## Struktura kodu

### Separacja logiki
- Oddzielaj logikę biznesową od komponentów UI
- Używaj funkcji pomocniczych do powtarzalnych operacji

### Spójne nazewnictwo
- Używaj spójnych konwencji nazewnictwa (camelCase dla zmiennych i funkcji, PascalCase dla komponentów)
- Używaj opisowych nazw, które jasno określają cel zmiennej lub funkcji

## Obsługa błędów

### Graceful degradation
- Zawsze zapewniaj alternatywne renderowanie w przypadku braku danych:
  ```tsx
  {data ? <DataComponent data={data} /> : <LoadingOrErrorComponent />}
  ```

### Komunikaty o błędach
- Używaj jasnych i pomocnych komunikatów o błędach
- Loguj błędy w konsoli z odpowiednim poziomem (error, warn, info)

## Design i UI

### Spójny system kolorów
- Używaj predefiniowanych kolorów z palety projektu:
  ```tsx
  // ❌ Źle - hardcodowane kolory
  <div className="bg-[#1e293b] text-[#f8fafc]">...</div>
  
  // ✅ Dobrze - używanie zmiennych Tailwind
  <div className="bg-slate-900 text-slate-50">...</div>
  ```

### Responsywność
- Projektuj mobile-first, używając klas Tailwind do responsywności:
  ```tsx
  // ✅ Dobrze - responsywny design
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">...</div>
  ```

### Dostępność (a11y)
- Zawsze dodawaj odpowiednie atrybuty dostępności:
  ```tsx
  // ❌ Źle - brak atrybutów dostępności
  <button onClick={handleClick}>
    <svg>...</svg>
  </button>
  
  // ✅ Dobrze - z atrybutami dostępności
  <button 
    onClick={handleClick}
    aria-label="Zamknij"
    role="button"
  >
    <svg aria-hidden="true">...</svg>
  </button>
  ```

### Komponenty UI
- Używaj komponentów Shadcn UI zamiast tworzenia własnych:
  ```tsx
  // ❌ Źle - własna implementacja
  <div className="border rounded p-2">
    <input type="text" className="border-0 focus:outline-none" />
  </div>
  
  // ✅ Dobrze - używanie komponentów Shadcn
  <Input placeholder="Wpisz tekst" />
  ```

### Obsługa stanów UI
- Uwzględniaj wszystkie stany komponentów:
  - Domyślny
  - Hover
  - Focus
  - Active
  - Disabled
  - Error
  - Loading

  ```tsx
  // ✅ Dobrze - obsługa różnych stanów
  <Button 
    disabled={isLoading}
    variant={hasError ? "destructive" : "default"}
  >
    {isLoading ? <Spinner className="mr-2" /> : null}
    {buttonText}
  </Button>
  ```

### Konsystencja interfejsu
- Zachowaj spójny układ i styl w całej aplikacji:
  - Jednolite marginesy i paddingi
  - Spójna typografia (rozmiary fontów, wagi, kolory)
  - Powtarzalne wzorce UI dla podobnych funkcjonalności

### Ciemny i jasny motyw
- Wspieraj oba motywy używając klas Tailwind:
  ```tsx
  // ✅ Dobrze - obsługa ciemnego i jasnego motywu
  <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
    ...
  </div>
  ```

### Animacje i przejścia
- Używaj subtelnych animacji dla lepszego UX:
  ```tsx
  // ✅ Dobrze - subtelne animacje
  <div className="transition-all duration-300 hover:scale-105">
    ...
  </div>
  ```

### Komunikaty zwrotne
- Zawsze informuj użytkownika o wyniku jego akcji:
  ```tsx
  // ✅ Dobrze - informacja zwrotna
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await saveData()
      toast({
        title: "Sukces",
        description: "Dane zostały zapisane",
        variant: "success"
      })
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać danych",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }
  ```

### Formularze
- Używaj bibliotek do walidacji formularzy (np. Zod, react-hook-form):
  ```tsx
  // ✅ Dobrze - walidacja formularza
  const formSchema = z.object({
    name: z.string().min(2, "Imię musi mieć co najmniej 2 znaki"),
    email: z.string().email("Niepoprawny adres email")
  })
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: ""
    }
  })
  ```

### Ikony i ilustracje
- Używaj spójnego zestawu ikon (np. Lucide):
  ```tsx
  // ✅ Dobrze - spójne ikony
  import { User, Mail, Lock } from "lucide-react"
  
  // Używaj ikon z odpowiednimi rozmiarami
  <User className="h-4 w-4" />
  <Mail className="h-4 w-4" />
  ```

## Wytyczne designu dla ProfileCoder

### Paleta kolorów

#### Podstawowe kolory
- **Zielony (akcent)**: 
  - Główny: `bg-green-700` - używany dla przycisków akcji i elementów aktywnych
  - Tło aktywne: `bg-green-900 bg-opacity-30` - używany dla wybranych elementów
  - Obramowanie: `border-green-700` - używany dla obramowań elementów

- **Czarny/Ciemny**:
  - Tło główne: `bg-black` - używany jako domyślne tło
  - Tło alternatywne: `bg-slate-900` - używany jako tło dla sekcji

- **Biały/Jasny**:
  - Tekst: `text-white` - używany dla głównego tekstu
  - Tekst drugorzędny: `text-gray-300` - używany dla mniej istotnego tekstu

#### Kolory statusów
- **Sukces**: `text-green-500`, `bg-green-500 bg-opacity-20`
- **Błąd**: `text-red-500`, `bg-red-500 bg-opacity-20`
- **Ostrzeżenie**: `text-yellow-500`, `bg-yellow-500 bg-opacity-20`
- **Informacja**: `text-blue-500`, `bg-blue-500 bg-opacity-20`

### Typografia

#### Czcionki
- **Główna czcionka**: Inter (sans-serif) - używana dla całej aplikacji
- **Alternatywna czcionka**: system-ui - używana jako fallback

#### Rozmiary tekstu
- **Nagłówki**:
  - H1: `text-3xl font-bold` - główne nagłówki stron
  - H2: `text-2xl font-bold` - nagłówki sekcji
  - H3: `text-xl font-medium` - nagłówki podsekcji
  - H4: `text-lg font-medium` - nagłówki elementów

- **Tekst**:
  - Podstawowy: `text-base` - główny tekst
  - Mały: `text-sm` - tekst pomocniczy
  - Bardzo mały: `text-xs` - etykiety, przypisy

#### Wagi czcionek
- **Bold**: `font-bold` - używany dla nagłówków i ważnych elementów
- **Medium**: `font-medium` - używany dla podtytułów i elementów wyróżnionych
- **Regular**: `font-normal` - używany dla zwykłego tekstu
- **Light**: `font-light` - używany dla tekstu drugorzędnego

### Odstępy i układ

#### Marginesy i paddingi
- **Mały**: `p-2 m-2` - używany dla elementów kompaktowych
- **Średni**: `p-4 m-4` - używany dla większości elementów
- **Duży**: `p-6 m-6` - używany dla sekcji i kontenerów

#### Odstępy między elementami
- **Mały**: `gap-2 space-y-2 space-x-2` - używany dla elementów blisko siebie
- **Średni**: `gap-4 space-y-4 space-x-4` - używany dla większości elementów
- **Duży**: `gap-6 space-y-6 space-x-6` - używany dla oddzielenia sekcji

#### Układy
- **Flex**: `flex flex-col` lub `flex flex-row` - używany dla większości układów
- **Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` - używany dla kart i list
- **Kontenery**: `container mx-auto px-4` - używany dla centrowania zawartości

### Komponenty UI

#### Przyciski
```tsx
// Przycisk główny
<Button variant="default" className="bg-green-700 hover:bg-green-600">
  Zapisz
</Button>

// Przycisk drugorzędny
<Button variant="outline" className="border-green-700 text-green-700">
  Anuluj
</Button>

// Przycisk destrukcyjny
<Button variant="destructive">
  Usuń
</Button>
```

#### Karty i kontenery
```tsx
// Karta
<div className="border border-gray-700 rounded-md p-4 bg-black">
  <h3 className="text-lg font-medium mb-2">Tytuł karty</h3>
  <p className="text-gray-300">Zawartość karty</p>
</div>

// Kontener sekcji
<div className="space-y-4 mb-6">
  <h2 className="text-xl font-bold">Tytuł sekcji</h2>
  <div className="border-t border-gray-700 pt-4">
    {/* Zawartość sekcji */}
  </div>
</div>
```

#### Formularze
```tsx
// Pole tekstowe
<div className="space-y-2">
  <Label htmlFor="name">Nazwa</Label>
  <Input id="name" placeholder="Wprowadź nazwę" />
</div>

// Przełącznik
<div className="flex items-center space-x-2">
  <Switch id="active" />
  <Label htmlFor="active">Aktywny</Label>
</div>

// Wybór opcji
<div className="space-y-2">
  <Label htmlFor="type">Typ</Label>
  <Select>
    <SelectTrigger id="type">
      <SelectValue placeholder="Wybierz typ" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Opcja 1</SelectItem>
      <SelectItem value="option2">Opcja 2</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### Ikony i obrazy

#### Ikony
- Używaj biblioteki Lucide React dla spójności
- Standardowy rozmiar ikon: `h-5 w-5` lub `h-6 w-6`
- Ikony w przyciskach: `h-4 w-4 mr-2`

```tsx
import { Save, Trash, Edit } from "lucide-react"

// Ikona w przycisku
<Button>
  <Save className="h-4 w-4 mr-2" />
  Zapisz
</Button>

// Ikona samodzielna
<Edit className="h-5 w-5 text-green-700" />
```

#### Obrazy i awatary
- Zawsze dodawaj atrybuty `alt` dla dostępności
- Używaj `object-cover` dla zachowania proporcji
- Dodawaj `loading="lazy"` dla optymalizacji wydajności

```tsx
// Awatar
<img 
  src="/avatar.jpg" 
  alt="Avatar użytkownika" 
  className="h-10 w-10 rounded-full object-cover"
  loading="lazy"
/>

// Obraz w karcie
<img 
  src="/image.jpg" 
  alt="Opis obrazu" 
  className="w-full h-48 object-cover rounded-t-md"
  loading="lazy"
/>
```
