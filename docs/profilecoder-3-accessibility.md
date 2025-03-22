# ProfileMatrix 3.0 - Dostępność i Alternatywne Reprezentacje

*Dokument implementacyjny dla patchy PC3.0-2029-03 i PC3.0-2029-04*

## 1. Wprowadzenie

Zależność od emoji w oryginalnym standardzie ProfileMatrix 3.0 tworzy istotne bariery dostępności i problemy z niespójnością wyświetlania między platformami. Niniejszy dokument definiuje rozwiązania alternatywnych reprezentacji tekstowych oraz wytyczne dostępności dla implementacji standardu.

## 2. Alternatywne kodowanie tekstowe (PC3.0-2029-03)

### 2.1 Format kodowania tekstowego

Format tekstowy ProfileMatrix 3.0 stosuje następujące konwencje:

1. **Kategorii segmentów**: Identyfikatory UPPERCASE (np. ENV zamiast 💼)
2. **Właściwości**: Identyfikatory UPPERCASE (np. DRESS zamiast 👔)
3. **Wartości**: Identyfikatory UPPERCASE (np. CASUAL zamiast 👕)
4. **Pozostałe ograniczniki**: Pozostają bez zmian (▪, @, ^, ;, +, ,)

Przykład porównawczy:

**Format oparty na emoji:**
```
💼{👔=👕^2;🏢=🏠^5} ▪ 📱{📱=📧^Medium+📞^High}
```

**Równoważny format tekstowy:**
```
ENV{DRESS=CASUAL^2;LOCATION=REMOTE^5} ▪ COMM{CHANNEL=EMAIL^Medium+PHONE^High}
```

### 2.2 Pełne mapowanie kodów tekstowych

Poniżej przedstawiamy standardowe mapowanie między emoji a kodami tekstowymi dla wszystkich głównych kategorii:

| Kategoria | Emoji | Kod tekstowy |
|-----------|-------|--------------|
| Środowisko pracy | 💼 | ENV |
| Wartości i granice | 💕 | REL |
| Lokalizacja i mobilność | 📍 | LOC |
| Struktura zespołu | 👥 | TEAM |
| Zarządzanie czasem | ⏰ | TIME |
| Styl pracy | 📊 | STYLE |
| Cele zawodowe | ❤️ | GOALS |
| Technologia | 💻 | TECH |
| Komunikacja | 📱 | COMM |
| Zarządzanie energią | ⚡ | ENERGY |
| Kreatywność | 🎨 | CREATE |
| Kompetencje | 🏅 | SKILLS |
| Metadane profilu | 📄 | META |
| Kontekst kulturowy | 🌐 | CULTURE |

### 2.3 Algorytm konwersji dwukierunkowej

Poniżej przedstawiamy pseudokod do konwersji między formatami:

```typescript
type EmojiMap = {[key: string]: string};
type ReverseMap = {[key: string]: string};

// Mapy konwersji (emoji -> tekst i tekst -> emoji)
const categoryMap: EmojiMap = {
  "💼": "ENV",
  "💕": "REL",
  "📍": "LOC",
  "👥": "TEAM",
  "⏰": "TIME",
  "📊": "STYLE",
  "❤️": "GOALS",
  "💻": "TECH",
  "📱": "COMM",
  "⚡": "ENERGY",
  "🎨": "CREATE",
  "🏅": "SKILLS",
  "📄": "META",
  "🌐": "CULTURE"
};

// Mapy dla właściwości i wartości (uproszczone dla przykładu)
const propertyMaps: {[category: string]: EmojiMap} = {
  "ENV": {
    "👔": "DRESS",
    "🏢": "LOCATION",
    "👂": "NOISE"
    // ... więcej właściwości
  },
  // ... więcej kategorii
};

const valueMaps: {[category: string]: {[property: string]: EmojiMap}} = {
  "ENV": {
    "DRESS": {
      "👕": "CASUAL",
      "👔": "FORMAL",
      "🎽": "SPORTY"
      // ... więcej wartości
    },
    // ... więcej właściwości
  },
  // ... więcej kategorii
};

// Generowanie map odwrotnych
function generateReverseMaps() {
  const reverseCategoryMap: ReverseMap = {};
  const reversePropertyMaps: {[category: string]: ReverseMap} = {};
  const reverseValueMaps: {[category: string]: {[property: string]: ReverseMap}} = {};
  
  // Odwróć mapę kategorii
  for (const [emoji, text] of Object.entries(categoryMap)) {
    reverseCategoryMap[text] = emoji;
  }
  
  // Odwróć mapy właściwości i wartości
  for (const [category, propMap] of Object.entries(propertyMaps)) {
    reversePropertyMaps[category] = {};
    
    for (const [emoji, text] of Object.entries(propMap)) {
      reversePropertyMaps[category][text] = emoji;
    }
    
    reverseValueMaps[category] = {};
    
    for (const [property, valueMap] of Object.entries(valueMaps[category] || {})) {
      reverseValueMaps[category][property] = {};
      
      for (const [emoji, text] of Object.entries(valueMap)) {
        reverseValueMaps[category][property][text] = emoji;
      }
    }
  }
  
  return {
    reverseCategoryMap,
    reversePropertyMaps,
    reverseValueMaps
  };
}

// Funkcja konwertująca z emoji na tekst
function convertEmojiToText(emojiProfile: string): string {
  let textProfile = emojiProfile;
  
  // Konwersja kategorii
  for (const [emoji, text] of Object.entries(categoryMap)) {
    textProfile = textProfile.replace(new RegExp(emoji, 'g'), text);
  }
  
  // Konwersja właściwości i wartości wymagałaby parsera
  // Tutaj uproszczona implementacja dla przykładu
  
  return textProfile;
}

// Funkcja konwertująca z tekstu na emoji
function convertTextToEmoji(textProfile: string): string {
  const reverseMaps = generateReverseMaps();
  let emojiProfile = textProfile;
  
  // Konwersja kategorii
  for (const [text, emoji] of Object.entries(reverseMaps.reverseCategoryMap)) {
    emojiProfile = emojiProfile.replace(new RegExp(text, 'g'), emoji);
  }
  
  // Konwersja właściwości i wartości wymagałaby parsera
  // Tutaj uproszczona implementacja dla przykładu
  
  return emojiProfile;
}
```

### 2.4 Rozszerzona implementacja referencyjny

Pełna implementacja powinna używać parsera ProfileMatrix 3.0 do analizy struktury przed konwersją:

```typescript
/**
 * Konwertuje profil z formatu emoji na format tekstowy
 */
function convertProfile(profile: Profile, targetFormat: 'emoji' | 'text'): Profile {
  const convertedProfile = new Profile();
  
  for (const segment of profile.segments) {
    const convertedSegment = new Segment();
    
    // Konwertuj kategorię
    convertedSegment.category = convertCategory(segment.category, targetFormat);
    
    // Zachowaj kontekst bez zmian
    convertedSegment.context = segment.context;
    
    // Konwertuj właściwości
    for (const property of segment.properties) {
      const convertedProperty = new Property();
      
      convertedProperty.key = convertPropertyKey(
        property.key, 
        segment.category, 
        targetFormat
      );
      
      // Konwertuj wartości (pojedyncze lub wielokrotne)
      if (Array.isArray(property.value)) {
        convertedProperty.value = property.value.map(value => 
          convertPropertyValue(
            value, 
            segment.category, 
            property.key, 
            targetFormat
          )
        );
      } else {
        convertedProperty.value = convertPropertyValue(
          property.value, 
          segment.category, 
          property.key, 
          targetFormat
        );
      }
      
      // Zachowaj wagę, pewność i kontekst bez zmian
      convertedProperty.weight = property.weight;
      convertedProperty.confidence = property.confidence;
      convertedProperty.context = property.context;
      
      convertedSegment.properties.push(convertedProperty);
    }
    
    convertedProfile.segments.push(convertedSegment);
  }
  
  return convertedProfile;
}
```

### 2.5 Przykłady konwersji dla złożonych profili

#### Przykład 1: Profil ze złożonymi kontekstami

**Format emoji:**
```
💼@Work{👔=👕^2;🏢=🏠^5} ▪ 💼@Work.Meeting{👔=👔^4}
```

**Format tekstowy:**
```
ENV@Work{DRESS=CASUAL^2;LOCATION=REMOTE^5} ▪ ENV@Work.Meeting{DRESS=FORMAL^4}
```

#### Przykład 2: Profil z wieloma wartościami

**Format emoji:**
```
📱{📱=📧^3+📞^4;⏱️=⏰^High}
```

**Format tekstowy:**
```
COMM{CHANNEL=EMAIL^3+PHONE^4;RESPONSE=QUICK^High}
```

## 3. Ulepszenia dostępności (PC3.0-2029-04)

### 3.1 Wytyczne dostępności dla interfejsów ProfileMatrix

#### 3.1.1 Podstawowe zasady

1. **Alternatywne teksty**: Każde emoji w interfejsie powinno mieć powiązany alternatywny tekst.
2. **Semantyczne HTML**: Interfejsy powinny używać semantycznych elementów HTML.
3. **Kontrast**: Zapewnij wystarczający kontrast dla elementów interfejsu.
4. **Responsywność**: Interfejsy powinny być dostosowane do różnych rozmiarów ekranu i narzędzi asystujących.
5. **Klawiatura**: Pełna funkcjonalność powinna być dostępna przy użyciu tylko klawiatury.

#### 3.1.2 Wzorzec implementacji dla dostępnych preferencji

```tsx
// Przykład w React z pełnym wsparciem dostępności
function AccessiblePreferenceSelector({
  category,
  property,
  value,
  onChange
}: PreferenceSelectorProps) {
  // Pobierz dane mapowania
  const textCategory = getTextCode(category);
  const textProperty = getTextPropertyCode(category, property);
  const textValue = getTextValueCode(category, property, value);
  
  return (
    <div className="preference-selector" role="group" aria-labelledby={`pref-${textProperty}`}>
      <label id={`pref-${textProperty}`} className="preference-label">
        <span className="emoji" role="img" aria-label={textProperty}>
          {property}
        </span>
        <span className="sr-only">{textProperty}</span>
      </label>
      
      <div className="preference-options">
        {availableValues.map(option => (
          <button
            key={option.value}
            className={`preference-option ${value === option.value ? 'selected' : ''}`}
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            aria-label={`${textProperty}: ${getTextValueCode(category, property, option.value)}`}
          >
            <span className="emoji" role="img" aria-hidden="true">
              {option.value}
            </span>
            <span className="sr-only">{getTextValueCode(category, property, option.value)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

### 3.2 Optymalizacje dla czytników ekranu

#### 3.2.1 Strategia oznaczania zawartości

```css
/* CSS do ukrywania treści wizualnie, ale zachowującego ją dla czytników ekranu */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* CSS dla trybu wysokiego kontrastu */
@media (forced-colors: active) {
  .preference-option.selected {
    outline: 3px solid CanvasText;
  }
}
```

#### 3.2.2 Nawigacja tabelaryczna

```tsx
function AccessibleProfileViewer({ profile }: { profile: Profile }) {
  const segments = convertToAccessibleSegments(profile);
  
  return (
    <div className="profile-viewer">
      {segments.map((segment, index) => (
        <div key={index} className="profile-segment">
          <h3 id={`segment-${index}`}>
            <span className="emoji" role="img" aria-hidden="true">{segment.categoryEmoji}</span>
            <span>{segment.categoryText}</span>
            {segment.context && <span className="context">@{segment.context}</span>}
          </h3>
          
          <table aria-labelledby={`segment-${index}`}>
            <thead>
              <tr>
                <th>Preferencja</th>
                <th>Wartość</th>
                <th>Waga</th>
              </tr>
            </thead>
            <tbody>
              {segment.properties.map((property, propIndex) => (
                <tr key={propIndex}>
                  <td>
                    <span className="emoji" role="img" aria-hidden="true">{property.keyEmoji}</span>
                    <span className="sr-only">{property.keyText}</span>
                  </td>
                  <td>
                    <span className="emoji" role="img" aria-hidden="true">{property.valueEmoji}</span>
                    <span className="sr-only">{property.valueText}</span>
                  </td>
                  <td>{property.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
```

### 3.3 Alternatywne reprezentacje sensoryczne

ProfileMatrix 3.0 powinien wspierać alternatywne reprezentacje sensoryczne dla różnych potrzeb użytkowników:

#### 3.3.1 Reprezentacje dźwiękowe

```typescript
// Funkcja konwertująca profil na reprezentację dźwiękową
function generateAudioRepresentation(profile: Profile): AudioDescription[] {
  const audioDescriptions: AudioDescription[] = [];
  
  for (const segment of profile.segments) {
    // Dodaj dźwięk kategorii
    audioDescriptions.push({
      type: 'category',
      name: getCategoryTextName(segment.category),
      pitch: getCategoryPitch(segment.category),
      duration: 1.0
    });
    
    // Dodaj dźwięk kontekstu, jeśli istnieje
    if (segment.context) {
      audioDescriptions.push({
        type: 'context',
        name: `context ${segment.context.name}`,
        pitch: getContextPitch(segment.context),
        duration: 0.7
      });
    }
    
    // Dodaj dźwięki dla każdej właściwości
    for (const property of segment.properties) {
      audioDescriptions.push({
        type: 'property',
        name: getPropertyTextName(segment.category, property.key),
        value: getValueTextName(segment.category, property.key, property.value),
        weight: property.weight,
        pitch: getPropertyPitch(property.key),
        valuePitch: getValuePitch(property.value),
        duration: 0.5 + (property.weight / 10) // Dłuższy dźwięk dla wyższych wag
      });
    }
  }
  
  return audioDescriptions;
}
```

#### 3.3.2 Reprezentacje dotykowe

```typescript
// Definicja wzorców haptycznych dla różnych elementów profilu
const hapticPatterns = {
  categories: {
    'ENV': { intensity: 0.8, pattern: [100, 50, 100] },
    'COMM': { intensity: 0.7, pattern: [50, 100, 50, 100] },
    // ... inne kategorie
  },
  
  weights: {
    1: { intensity: 0.2, pattern: [50] },
    2: { intensity: 0.4, pattern: [50, 50] },
    3: { intensity: 0.6, pattern: [50, 50, 50] },
    4: { intensity: 0.8, pattern: [50, 50, 50, 50] },
    5: { intensity: 1.0, pattern: [50, 50, 50, 50, 50] },
    'Low': { intensity: 0.3, pattern: [100] },
    'Medium': { intensity: 0.6, pattern: [100, 100] },
    'High': { intensity: 0.9, pattern: [100, 100, 100] }
  }
};

// Funkcja konwertująca profil na wzorce haptyczne
function generateHapticRepresentation(profile: Profile): HapticPattern[] {
  const hapticSequence: HapticPattern[] = [];
  
  // Implementacja sekwencji haptycznej...
  
  return hapticSequence;
}
```

#### 3.3.3 Wizualizacje wysokiego kontrastu

```tsx
// Komponenty z wysokim kontrastem, paletami kolorów dla daltonistów
// i zmiennymi rozmiarami
function HighContrastProfileViewer({ profile, colorMode, fontSize }: {
  profile: Profile,
  colorMode: 'default' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'highContrast',
  fontSize: 'small' | 'medium' | 'large' | 'extraLarge'
}) {
  const colorPalette = getAccessibleColorPalette(colorMode);
  const fontSizeClass = getFontSizeClass(fontSize);
  
  return (
    <div className={`profile-viewer ${colorMode} ${fontSizeClass}`}>
      {/* Implementacja wizualizacji profilu */}
    </div>
  );
}
```

## 4. Pełna implementacja interaktywnego i dostępnego edytora ProfileMatrix

Poniżej przedstawiamy przykład kompletnego, dostępnego edytora:

```tsx
function AccessibleProfileEditor({ 
  initialProfile,
  onChange
}: ProfileEditorProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [displayFormat, setDisplayFormat] = useState<'emoji' | 'text'>('emoji');
  const [accessibilityPreferences, setAccessibilityPreferences] = useState({
    highContrast: false,
    largeText: false,
    screenReader: false,
    reduceMotion: false
  });
  
  // Konwertowany profil na podstawie wybranego formatu wyświetlania
  const displayProfile = useMemo(() => {
    return displayFormat === 'emoji' 
      ? profile 
      : convertProfile(profile, 'text');
  }, [profile, displayFormat]);
  
  function handlePropertyChange(
    segmentIndex: number,
    propertyIndex: number,
    newValue: string | string[]
  ) {
    const newProfile = { ...profile };
    newProfile.segments[segmentIndex].properties[propertyIndex].value = newValue;
    setProfile(newProfile);
    onChange(newProfile);
  }
  
  function handleWeightChange(
    segmentIndex: number,
    propertyIndex: number,
    newWeight: number | string
  ) {
    const newProfile = { ...profile };
    newProfile.segments[segmentIndex].properties[propertyIndex].weight = newWeight;
    setProfile(newProfile);
    onChange(newProfile);
  }
  
  return (
    <div className={`profile-editor ${getAccessibilityClasses(accessibilityPreferences)}`}>
      <div className="editor-toolbar" role="toolbar" aria-label="Profile editor options">
        <fieldset>
          <legend>Display Format</legend>
          <div className="radio-group">
            <input
              type="radio"
              id="format-emoji"
              name="display-format"
              value="emoji"
              checked={displayFormat === 'emoji'}
              onChange={() => setDisplayFormat('emoji')}
            />
            <label htmlFor="format-emoji">Emoji Format</label>
            
            <input
              type="radio"
              id="format-text"
              name="display-format"
              value="text"
              checked={displayFormat === 'text'}
              onChange={() => setDisplayFormat('text')}
            />
            <label htmlFor="format-text">Text Format</label>
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Accessibility Options</legend>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="high-contrast"
              checked={accessibilityPreferences.highContrast}
              onChange={(e) => setAccessibilityPreferences({
                ...accessibilityPreferences,
                highContrast: e.target.checked
              })}
            />
            <label htmlFor="high-contrast">High Contrast</label>
            
            <input
              type="checkbox"
              id="large-text"
              checked={accessibilityPreferences.largeText}
              onChange={(e) => setAccessibilityPreferences({
                ...accessibilityPreferences,
                largeText: e.target.checked
              })}
            />
            <label htmlFor="large-text">Large Text</label>
            
            <input
              type="checkbox"
              id="screen-reader"
              checked={accessibilityPreferences.screenReader}
              onChange={(e) => setAccessibilityPreferences({
                ...accessibilityPreferences,
                screenReader: e.target.checked
              })}
            />
            <label htmlFor="screen-reader">Screen Reader Optimized</label>
            
            <input
              type="checkbox"
              id="reduce-motion"
              checked={accessibilityPreferences.reduceMotion}
              onChange={(e) => setAccessibilityPreferences({
                ...accessibilityPreferences,
                reduceMotion: e.target.checked
              })}
            />
            <label htmlFor="reduce-motion">Reduce Motion</label>
          </div>
        </fieldset>
      </div>
      
      <div className="profile-segments">
        {displayProfile.segments.map((segment, segmentIndex) => (
          <div key={segmentIndex} className="profile-segment" role="region" aria-labelledby={`segment-${segmentIndex}`}>
            <h3 id={`segment-${segmentIndex}`}>
              {displayFormat === 'emoji' ? (
                <span role="img" aria-hidden="true">{segment.category}</span>
              ) : (
                <span>{segment.category}</span>
              )}
              
              {segment.context && <span className="context">@{segment.context.name}</span>}
            </h3>
            
            <div className="segment-properties">
              {segment.properties.map((property, propertyIndex) => (
                <div key={propertyIndex} className="property-editor">
                  <AccessiblePropertyEditor
                    property={property}
                    displayFormat={displayFormat}
                    category={segment.category}
                    onValueChange={(newValue) => handlePropertyChange(
                      segmentIndex, 
                      propertyIndex, 
                      newValue
                    )}
                    onWeightChange={(newWeight) => handleWeightChange(
                      segmentIndex, 
                      propertyIndex, 
                      newWeight
                    )}
                  />
                </div>
              ))}
              
              <button
                className="add-property"
                aria-label={`Add new property to ${getSegmentName(segment, displayFormat)}`}
                onClick={() => handleAddProperty(segmentIndex)}
              >
                Add Property
              </button>
            </div>
          </div>
        ))}
        
        <button
          className="add-segment"
          aria-label="Add new segment"
          onClick={handleAddSegment}
        >
          Add Segment
        </button>
      </div>
      
      <div className="profile-preview" aria-live="polite">
        <h3 id="preview-heading">Profile Preview</h3>
        <div className="preview-content" aria-labelledby="preview-heading">
          <pre>{formatProfile(profile, displayFormat)}</pre>
        </div>
      </div>
    </div>
  );
}
```

## 5. Rekomendacje implementacyjne

1. **Proaktywne wykrywanie**: Implementacje powinny automatycznie wykrywać potrzeby dostępności użytkownika (np. poprzez media query `prefers-reduced-motion`).

2. **Pamięć preferencji**: Zapisuj preferencje dostępności użytkownika między sesjami.

3. **Testowanie z użytkownikami**: Testuj implementacje z użytkownikami korzystającymi z technologii wspomagających.

4. **Dokumentacja dostępności**: Dodaj dokumentację dotyczącą dostępności do wszystkich implementacji.

5. **Konsekwencja w alternatywach**: Zapewnij spójne mapowanie między reprezentacjami emoji i tekstowymi we wszystkich implementacjach.

6. **Wsparcie przeglądarek i systemów**: Testuj we wszystkich głównych przeglądarkach i systemach operacyjnych, aby zapewnić spójne renderowanie i odczytywanie.

## 6. Wnioski

Implementacja alternatywnych formatów tekstowych i ulepszeń dostępności znacząco poszerza użyteczność standardu ProfileMatrix 3.0, czyniąc go bardziej inkluzywnym i uniwersalnym. Te ulepszenia są niezbędne nie tylko dla zgodności z przepisami dostępności, ale również dla zwiększenia adopcji standardu w organizacjach i systemach, które muszą zapewnić dostępność dla wszystkich użytkowników.

Niniejszy dokument dostarcza kompleksowych wytycznych implementacyjnych dla alternatywnego kodowania tekstowego (PC3.0-2029-03) oraz ulepszeń dostępności (PC3.0-2029-04), stanowiąc kluczowy element pakietu poprawek do standardu ProfileMatrix 3.0.
