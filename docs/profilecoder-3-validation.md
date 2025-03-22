# ProfileMatrix 3.0 - Walidacja i Weryfikacja

*Dokument implementacyjny dla patcha PC3.0-2029-05*

## 1. Wprowadzenie

Walidacja profili jest kluczowym aspektem zapewnienia spójności i zgodności ze standardem ProfileMatrix 3.0. Niniejszy dokument definiuje formalne zasady walidacji, algorytmy weryfikacji i strategie obsługi niezgodności dla implementacji korzystających ze standardu ProfileMatrix.

## 2. Poziomy walidacji

Standard ProfileMatrix 3.0 definiuje cztery poziomy walidacji, które mogą być stosowane w zależności od potrzeb implementacji:

### 2.1 Poziomy walidacyjne

| Poziom | Nazwa | Opis | Przeznaczenie |
|--------|-------|------|---------------|
| L1 | Walidacja składniowa | Weryfikuje poprawność składni zgodnie z gramatyką | Parsery, edytory |
| L2 | Walidacja strukturalna | Sprawdza poprawność struktury profilu i relacji między elementami | Analizatory, konwertery |
| L3 | Walidacja semantyczna | Weryfikuje semantykę wartości i ich zgodność z oczekiwanymi zakresami | Systemy przetwarzające |
| L4 | Walidacja kontekstowa | Sprawdza spójność między kontekstami i rozwiązuje konflikty | Zaawansowane aplikacje adaptacyjne |

### 2.2 Tryby walidacji

Każdy z poziomów walidacji może być stosowany w jednym z trzech trybów:

1. **Tryb ścisły (strict)**: Zatrzymuje przetwarzanie przy pierwszym błędzie.
2. **Tryb naprawczy (fix)**: Próbuje naprawić wykryte błędy i kontynuować.
3. **Tryb raportujący (report)**: Zbiera wszystkie błędy, ale nie zatrzymuje przetwarzania.

## 3. Walidacja składniowa (L1)

### 3.1 Kryteria walidacji składniowej

1. **Poprawność tokenów**: Wszystkie tokeny muszą być zgodne z gramatyką:
   - Ograniczniki segmentów: `▪` 
   - Ograniczniki kontekstu: `@`
   - Ograniczniki właściwości: `{`, `}`, `=`, `;`
   - Operatory wielokrotnych wartości: `+`
   - Operatory wagi: `^`

2. **Kompletność par**: Wszystkie otwierające tokeny muszą mieć odpowiadające im tokeny zamykające.

3. **Poprawność sekwencji**: Tokeny muszą występować w prawidłowej kolejności (np. kategoria → kontekst → właściwości).

### 3.2 Implementacja funkcji walidacji składniowej

```typescript
/**
 * Funkcja walidacji składniowej dla ProfileMatrix 3.0
 */
function validateSyntax(
  input: string, 
  mode: 'strict' | 'fix' | 'report' = 'strict'
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // Walidacja podstawowa - użyj parsera z gramatyki formalnej
  try {
    const tokens = tokenize(input);
    
    // Sprawdź poprawność sekwencji tokenów
    validateTokenSequence(tokens, errors);
    
    // Sprawdź kompletność par (nawiasy, etc.)
    validateTokenPairs(tokens, errors);
    
    // Sprawdź poprawność struktur składniowych
    validateSyntacticStructures(tokens, errors);
    
  } catch (error) {
    errors.push({
      type: 'SyntaxError',
      message: error.message,
      position: error.position,
      severity: 'error'
    });
    
    if (mode === 'strict') {
      return {
        valid: false,
        errors,
        warnings,
        fixedInput: null
      };
    }
  }
  
  // Jeśli jesteśmy w trybie naprawczym, spróbuj naprawić błędy
  let fixedInput = null;
  if (mode === 'fix' && errors.length > 0) {
    fixedInput = fixSyntaxErrors(input, errors);
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    fixedInput
  };
}
```

### 3.3 Algorytm naprawy błędów składniowych

```typescript
/**
 * Naprawia typowe błędy składniowe w profilu
 */
function fixSyntaxErrors(
  input: string, 
  errors: ValidationError[]
): string {
  let fixed = input;
  
  // Sortuj błędy od końca do początku, aby zachować poprawne pozycje
  errors.sort((a, b) => b.position - a.position);
  
  for (const error of errors) {
    switch (error.type) {
      case 'MissingClosingBrace':
        // Dodaj brakujący nawias zamykający
        fixed = insert(fixed, error.position, '}');
        break;
        
      case 'MissingEquals':
        // Dodaj brakujący znak równości
        fixed = insert(fixed, error.position, '=');
        break;
        
      case 'MissingSemicolon':
        // Dodaj brakujący średnik
        fixed = insert(fixed, error.position, ';');
        break;
        
      case 'InvalidToken':
        // Usuń nieprawidłowy token
        fixed = remove(fixed, error.position, error.length || 1);
        break;
        
      // ... inne przypadki naprawy błędów
    }
  }
  
  return fixed;
}
```

## 4. Walidacja strukturalna (L2)

### 4.1 Kryteria walidacji strukturalnej

1. **Unikalność segmentów**: Każda kategoria może wystąpić tylko raz w kontekście.

2. **Unikalność właściwości**: Każda właściwość może wystąpić tylko raz w segmencie.

3. **Poprawność referencji**: Wszystkie konteksty używane w profilu muszą być poprawnie zdefiniowane.

4. **Spójność zagnieżdżonych struktur**: Segmenty zagnieżdżone muszą być poprawnie powiązane z segmentami nadrzędnymi.

### 4.2 Implementacja funkcji walidacji strukturalnej

```typescript
/**
 * Funkcja walidacji strukturalnej dla ProfileMatrix 3.0
 */
function validateStructure(
  profile: Profile, 
  mode: 'strict' | 'fix' | 'report' = 'strict'
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // Sprawdź unikalność segmentów
  validateSegmentUniqueness(profile, errors);
  
  // Sprawdź unikalność właściwości w segmentach
  validatePropertyUniqueness(profile, errors);
  
  // Sprawdź poprawność referencji kontekstowych
  validateContextReferences(profile, errors, warnings);
  
  // Sprawdź spójność struktur zagnieżdżonych
  validateNestedStructures(profile, errors);
  
  // Jeśli jesteśmy w trybie naprawczym, spróbuj naprawić błędy
  let fixedProfile = null;
  if (mode === 'fix' && errors.length > 0) {
    fixedProfile = fixStructuralErrors(profile, errors);
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    fixedProfile
  };
}
```

### 4.3 Algorytm naprawy błędów strukturalnych

```typescript
/**
 * Naprawia typowe błędy strukturalne w profilu
 */
function fixStructuralErrors(
  profile: Profile, 
  errors: ValidationError[]
): Profile {
  const fixed = deepClone(profile);
  
  for (const error of errors) {
    switch (error.type) {
      case 'DuplicateSegment':
        // Połącz zduplikowane segmenty
        mergeDuplicateSegments(fixed, error.segmentIndices);
        break;
        
      case 'DuplicateProperty':
        // Zachowaj właściwość z wyższą wagą lub ostatnią zdefiniowaną
        removeDuplicateProperty(fixed, error.segmentIndex, error.propertyKey);
        break;
        
      case 'InvalidContextReference':
        // Usuń nieprawidłową referencję kontekstową
        removeInvalidContextReference(fixed, error.segmentIndex, error.propertyIndex);
        break;
        
      case 'InconsistentNestedStructure':
        // Napraw niespójną strukturę zagnieżdżoną
        fixNestedStructure(fixed, error.parentSegmentIndex, error.childSegmentIndex);
        break;
        
      // ... inne przypadki naprawy błędów
    }
  }
  
  return fixed;
}
```

## 5. Walidacja semantyczna (L3)

### 5.1 Kryteria walidacji semantycznej

1. **Zgodność kategorii**: Kategorie muszą być zgodne z zarejestrowanym zestawem.

2. **Zgodność właściwości**: Właściwości muszą należeć do odpowiednich kategorii.

3. **Zgodność wartości**: Wartości muszą należeć do zdefiniowanego zakresu dla danej właściwości.

4. **Zgodność wag**: Wagi muszą być prawidłowymi liczbami lub wartościami wymienionymi (Low, Medium, High).

### 5.2 Implementacja funkcji walidacji semantycznej

```typescript
/**
 * Funkcja walidacji semantycznej dla ProfileMatrix 3.0
 */
function validateSemantics(
  profile: Profile, 
  registry: ProfileRegistry,
  mode: 'strict' | 'fix' | 'report' = 'strict'
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // Sprawdź zgodność kategorii
  validateCategoryCompliance(profile, registry.categories, errors, warnings);
  
  // Sprawdź zgodność właściwości
  validatePropertyCompliance(profile, registry, errors, warnings);
  
  // Sprawdź zgodność wartości
  validateValueCompliance(profile, registry, errors, warnings);
  
  // Sprawdź zgodność wag
  validateWeightCompliance(profile, errors);
  
  // Jeśli jesteśmy w trybie naprawczym, spróbuj naprawić błędy
  let fixedProfile = null;
  if (mode === 'fix' && errors.length > 0) {
    fixedProfile = fixSemanticErrors(profile, registry, errors);
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    fixedProfile
  };
}
```

### 5.3 Algorytm naprawy błędów semantycznych

```typescript
/**
 * Naprawia typowe błędy semantyczne w profilu
 */
function fixSemanticErrors(
  profile: Profile, 
  registry: ProfileRegistry,
  errors: ValidationError[]
): Profile {
  const fixed = deepClone(profile);
  
  for (const error of errors) {
    switch (error.type) {
      case 'InvalidCategory':
        // Zastąp nieprawidłową kategorię najbliższym dopasowaniem
        replaceWithClosestCategory(fixed, error.segmentIndex, registry);
        break;
        
      case 'InvalidProperty':
        // Usuń nieprawidłową właściwość lub zamień na właściwość domyślną
        fixInvalidProperty(fixed, error.segmentIndex, error.propertyIndex, registry);
        break;
        
      case 'InvalidValue':
        // Zastąp nieprawidłową wartość najbliższym dopasowaniem
        replaceWithClosestValue(
          fixed, 
          error.segmentIndex, 
          error.propertyIndex, 
          registry
        );
        break;
        
      case 'InvalidWeight':
        // Napraw nieprawidłową wagę
        fixInvalidWeight(fixed, error.segmentIndex, error.propertyIndex);
        break;
        
      // ... inne przypadki naprawy błędów
    }
  }
  
  return fixed;
}
```

## 6. Walidacja kontekstowa (L4)

### 6.1 Kryteria walidacji kontekstowej

1. **Spójność kontekstów**: Konteksty muszą tworzyć spójną hierarchię bez konfliktów.

2. **Rozwiązywanie konfliktów**: Konflikty między kontekstami muszą być rozwiązywane zgodnie z regułami priorytetu.

3. **Kompletność kontekstu**: Wszystkie wymagane właściwości dla danego kontekstu muszą być zdefiniowane.

4. **Zgodność z ograniczeniami**: Wartości muszą spełniać ograniczenia zdefiniowane dla danego kontekstu.

### 6.2 Implementacja funkcji walidacji kontekstowej

```typescript
/**
 * Funkcja walidacji kontekstowej dla ProfileMatrix 3.0
 */
function validateContext(
  profile: Profile, 
  contextRegistry: ContextRegistry,
  mode: 'strict' | 'fix' | 'report' = 'strict'
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // Sprawdź spójność kontekstów
  validateContextCoherence(profile, contextRegistry, errors, warnings);
  
  // Sprawdź rozwiązywanie konfliktów kontekstowych
  validateContextConflictResolution(profile, errors, warnings);
  
  // Sprawdź kompletność kontekstów
  validateContextCompleteness(profile, contextRegistry, errors, warnings);
  
  // Sprawdź zgodność z ograniczeniami kontekstowymi
  validateContextConstraints(profile, contextRegistry, errors, warnings);
  
  // Jeśli jesteśmy w trybie naprawczym, spróbuj naprawić błędy
  let fixedProfile = null;
  if (mode === 'fix' && errors.length > 0) {
    fixedProfile = fixContextErrors(profile, contextRegistry, errors);
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    fixedProfile
  };
}
```

### 6.3 Algorytm naprawy błędów kontekstowych

```typescript
/**
 * Naprawia typowe błędy kontekstowe w profilu
 */
function fixContextErrors(
  profile: Profile, 
  contextRegistry: ContextRegistry,
  errors: ValidationError[]
): Profile {
  const fixed = deepClone(profile);
  
  for (const error of errors) {
    switch (error.type) {
      case 'ContextIncoherence':
        // Napraw niespójność kontekstów
        fixContextIncoherence(fixed, error.contexts, contextRegistry);
        break;
        
      case 'ContextConflict':
        // Rozwiąż konflikt kontekstowy
        resolveContextConflict(fixed, error.conflictingContexts, contextRegistry);
        break;
        
      case 'IncompleteContext':
        // Uzupełnij brakujące właściwości kontekstu
        completeContext(fixed, error.contextName, contextRegistry);
        break;
        
      case 'ContextConstraintViolation':
        // Napraw naruszenie ograniczeń kontekstowych
        fixConstraintViolation(
          fixed, 
          error.segmentIndex, 
          error.propertyIndex, 
          contextRegistry
        );
        break;
        
      // ... inne przypadki naprawy błędów
    }
  }
  
  return fixed;
}
```

## 7. Algorytmy porównawcze i fuzzy matching

ProfileMatrix 3.0 zawiera algorytmy porównawcze do obliczeń podobieństwa między profilami oraz mechanizmy fuzzy matching do obsługi nieprecyzyjnych danych:

### 7.1 Obliczanie podobieństwa profili

```typescript
/**
 * Oblicza podobieństwo między dwoma profilami
 * Zwraca wartość od 0 (całkowicie różne) do 1 (identyczne)
 */
function calculateProfileSimilarity(
  profileA: Profile, 
  profileB: Profile,
  options: SimilarityOptions = {}
): number {
  // Wektory cech dla obu profili
  const vectorA = createFeatureVector(profileA);
  const vectorB = createFeatureVector(profileB);
  
  // Normalizacja wektorów
  const normalizedA = normalizeVector(vectorA);
  const normalizedB = normalizeVector(vectorB);
  
  // Oblicz podobieństwo kosinusowe
  return calculateCosineSimilarity(normalizedA, normalizedB);
}
```

### 7.2 Fuzzy matching dla wartości

```typescript
/**
 * Znajduje najbardziej podobną wartość w rejestrze dla danej wartości wejściowej
 */
function findClosestValue(
  input: string,
  category: string,
  property: string,
  registry: ProfileRegistry
): string {
  const validValues = registry.getValidValues(category, property);
  let bestMatch = null;
  let highestSimilarity = -1;
  
  for (const value of validValues) {
    // Oblicz podobieństwo Levenshtein, Jaro-Winkler lub inne
    const similarity = calculateStringSimilarity(input, value);
    
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatch = value;
    }
  }
  
  // Zwróć najlepsze dopasowanie tylko jeśli jest wystarczająco podobne
  return (highestSimilarity > 0.7) ? bestMatch : null;
}
```

## 8. Integracja z implementacjami

### 8.1 Interfejs TypeScript dla walidatorów

```typescript
/**
 * Interfejs dla implementacji walidatora ProfileMatrix 3.0
 */
interface ProfileValidator {
  /**
   * Waliduje surowe dane wejściowe (tekst)
   */
  validateRawInput(
    input: string, 
    options?: ValidationOptions
  ): ValidationResult;
  
  /**
   * Waliduje obiekt profilu
   */
  validateProfile(
    profile: Profile, 
    options?: ValidationOptions
  ): ValidationResult;
  
  /**
   * Naprawia profil
   */
  fixProfile(
    profile: Profile | string, 
    errors: ValidationError[]
  ): Profile | string;
  
  /**
   * Porównuje profile
   */
  compareProfiles(
    profileA: Profile,
    profileB: Profile,
    options?: ComparisonOptions
  ): ComparisonResult;
}
```

### 8.2 Integracja z editorem React

```tsx
function ProfileEditor({ 
  initialProfile,
  onChange,
  validationMode = 'report'
}: ProfileEditorProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const validator = useProfileValidator();
  
  // Waliduj przy zmianie profilu
  useEffect(() => {
    const result = validator.validateProfile(profile, { mode: validationMode });
    setValidationResult(result);
    
    // Automatycznie naprawiaj w trybie 'fix'
    if (validationMode === 'fix' && !result.valid && result.fixedProfile) {
      setProfile(result.fixedProfile);
      onChange(result.fixedProfile);
    }
  }, [profile, validationMode]);
  
  function handleProfileChange(updatedProfile: Profile) {
    setProfile(updatedProfile);
    onChange(updatedProfile);
  }
  
  return (
    <div className="profile-editor">
      {/* Komponent edytora profilu */}
      
      {/* Wyświetlanie błędów walidacji */}
      {validationResult && !validationResult.valid && (
        <ValidationErrors errors={validationResult.errors} />
      )}
    </div>
  );
}
```

## 9. Zalecenia dla implementatorów

1. **Stopniowe walidowanie**: Implementuj walidację od poziomu L1 do L4, upewniając się, że każdy poziom działa poprawnie.

2. **Buforowanie wyników**: Buforuj wyniki walidacji, aby uniknąć powtarzania kosztownych operacji.

3. **Obsługa międzynarodowa**: Zapewnij obsługę wielu języków w komunikatach o błędach.

4. **Wsparcie użytkownika**: Zapewnij jasne i pomocne komunikaty o błędach z sugestiami naprawy.

5. **Monitorowanie**: Zbieraj dane o częstych błędach walidacji, aby ulepszyć standard i implementacje.

## 10. Zakończenie

Standard walidacji ProfileMatrix 3.0 zapewnia formalne ramy dla weryfikacji zgodności profili z oczekiwaną strukturą i semantyką. Implementacja tych algorytmów walidacyjnych jest kluczowym elementem każdego systemu korzystającego ze standardu ProfileMatrix, zwiększając jego niezawodność i interoperacyjność.
