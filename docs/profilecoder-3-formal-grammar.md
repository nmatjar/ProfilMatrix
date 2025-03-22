# ProfileMatrix 3.0 - Formalna Gramatyka i Algorytmy Parsera

*Dokument implementacyjny dla patcha PC3.0-2029-01*

## 1. Formalna Gramatyka (EBNF)

Poniższa gramatyka w formie rozszerzonej notacji Backusa-Naura (EBNF) formalizuje składnię ProfileMatrix 3.0 z obsługą błędów:

```ebnf
(* Główna struktura profilu *)
Profile = Segment { SegmentDelimiter Segment } ;

(* Segment profilu *)
Segment = Category [ Context ] "{" PropertyList "}" ;

(* Lista właściwości *)
PropertyList = Property { PropertyDelimiter Property } ;

(* Pojedyncza właściwość *)
Property = PropertyKey "=" PropertyValue [ "^" Weight ] [ "!" Confidence ] [ Context ] ;

(* Klucz właściwości *)
PropertyKey = EmojiCode | TextCode ;

(* Wartość właściwości *)
PropertyValue = SingleValue | MultiValue ;

(* Pojedyncza wartość *)
SingleValue = EmojiValue | TextValue ;

(* Wiele wartości *)
MultiValue = SingleValue { "+" SingleValue } ;

(* Kontekst *)
Context = "@" ContextName [ "." SubContext ] ;

(* Kategoria *)
Category = EmojiCode | TextCode ;

(* Kod Emoji *)
EmojiCode = UnicodeEmoji ;

(* Kod tekstowy *)
TextCode = AlphaNumeric { AlphaNumeric } ;

(* Wartość Emoji *)
EmojiValue = UnicodeEmoji ;

(* Wartość tekstowa *)
TextValue = AlphaNumeric { AlphaNumeric } | QuotedString ;

(* String w cudzysłowie *)
QuotedString = '"' { Character - '"' | '\\"' } '"' ;

(* Waga *)
Weight = NumericWeight | TextWeight ;

(* Waga numeryczna *)
NumericWeight = Digit | Digit "." Digit { Digit } ;

(* Waga tekstowa *)
TextWeight = "High" | "Medium" | "Low" | "VeryHigh" | "VeryLow" ;

(* Pewność *)
Confidence = "H" | "M" | "L" | "U" ;

(* Nazwa kontekstu *)
ContextName = AlphaNumeric { AlphaNumeric } ;

(* Subkontekst *)
SubContext = AlphaNumeric { AlphaNumeric } ;

(* Ogranicznik segmentu *)
SegmentDelimiter = "▪" ;

(* Ogranicznik właściwości *)
PropertyDelimiter = ";" ;

(* Znaki alfanumeryczne *)
AlphaNumeric = ? Standardowe znaki alfanumeryczne ASCII ? ;

(* Cyfra *)
Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;

(* Emoji Unicode *)
UnicodeEmoji = ? Dowolny znak Emoji Unicode ? ;

(* Dowolny znak z sekwencją ucieczki *)
Character = ? Dowolny znak ? | EscapeSequence ;

(* Sekwencja ucieczki dla znaków specjalnych *)
EscapeSequence = "\\u" HexDigit HexDigit HexDigit HexDigit | "\\" SpecialChar ;

(* Cyfra szesnastkowa *)
HexDigit = Digit | "A" | "B" | "C" | "D" | "E" | "F" | "a" | "b" | "c" | "d" | "e" | "f" ;

(* Znaki specjalne wymagające escape *)
SpecialChar = "▪" | "@" | "^" | ";" | "+" | "," | "{" | "}" | "=" | "!" | "." | "\\";
```

## 2. Algorytm parsera z obsługą błędów

Poniżej przedstawiamy pseudokod opisujący algorytm parsera ProfileMatrix 3.0 z rozbudowaną obsługą błędów:

```
FUNCTION ParseProfile(input)
    profile = NEW Profile()
    currentPos = 0
    errorList = []
    
    WHILE currentPos < length(input)
        TRY
            result = ParseSegment(input, currentPos)
            IF result.success THEN
                profile.AddSegment(result.segment)
                currentPos = result.newPos
                
                // Sprawdź czy następny znak to ogranicznik segmentu
                IF currentPos < length(input) AND input[currentPos] IS NOT SegmentDelimiter THEN
                    errorList.Add(NEW Error("Brak ogranicznika segmentu", currentPos))
                    // Próba odzyskania - znajdź następny ogranicznik lub początek segmentu
                    currentPos = FindNextSegmentStart(input, currentPos)
                ELSE
                    // Przesuń poza ogranicznik
                    currentPos = currentPos + 1
                END IF
            ELSE
                errorList.Add(result.error)
                // Próba odzyskania - znajdź następny ogranicznik lub początek segmentu
                currentPos = FindNextSegmentStart(input, currentPos)
            END IF
        CATCH Exception e
            errorList.Add(NEW Error("Nieoczekiwany błąd parsowania", currentPos, e))
            // Znajdź następny możliwy początek segmentu
            currentPos = FindNextSegmentStart(input, currentPos)
        END TRY
    END WHILE
    
    RETURN {
        profile: profile,
        errors: errorList,
        success: errorList.IsEmpty()
    }
END FUNCTION

FUNCTION ParseSegment(input, startPos)
    currentPos = startPos
    segment = NEW Segment()
    
    // Parsuj kategorię
    categoryResult = ParseCategory(input, currentPos)
    IF NOT categoryResult.success THEN
        RETURN {success: false, error: categoryResult.error}
    END IF
    
    segment.category = categoryResult.category
    currentPos = categoryResult.newPos
    
    // Sprawdź czy występuje kontekst
    IF currentPos < length(input) AND input[currentPos] == '@' THEN
        contextResult = ParseContext(input, currentPos)
        IF contextResult.success THEN
            segment.context = contextResult.context
            currentPos = contextResult.newPos
        ELSE
            RETURN {success: false, error: contextResult.error}
        END IF
    END IF
    
    // Sprawdź otwarcie nawiasu
    IF currentPos >= length(input) OR input[currentPos] != '{' THEN
        RETURN {
            success: false, 
            error: NEW Error("Oczekiwano '{' po kategorii/kontekście", currentPos)
        }
    END IF
    
    currentPos = currentPos + 1  // Przejdź za '{'
    
    // Parsuj listę właściwości
    propertiesResult = ParsePropertyList(input, currentPos)
    IF NOT propertiesResult.success THEN
        RETURN {success: false, error: propertiesResult.error}
    END IF
    
    segment.properties = propertiesResult.properties
    currentPos = propertiesResult.newPos
    
    // Sprawdź zamknięcie nawiasu
    IF currentPos >= length(input) OR input[currentPos] != '}' THEN
        RETURN {
            success: false, 
            error: NEW Error("Oczekiwano '}' na końcu segmentu", currentPos)
        }
    END IF
    
    currentPos = currentPos + 1  // Przejdź za '}'
    
    RETURN {
        success: true,
        segment: segment,
        newPos: currentPos
    }
END FUNCTION

// Inne funkcje parsujące (ParseCategory, ParseContext, ParsePropertyList, itd.)
// z podobnymi mechanizmami obsługi błędów...

FUNCTION FindNextSegmentStart(input, startPos)
    // Szukaj albo następnego ogranicznika segmentu, albo początku nowego segmentu
    pos = startPos
    
    WHILE pos < length(input)
        // Jeśli znajdziemy ogranicznik segmentu, rozpocznij od następnego znaku
        IF input[pos] == SegmentDelimiter THEN
            RETURN pos + 1
        END IF
        
        // Jeśli znajdziemy potencjalny początek segmentu (emoji lub kod tekstowy)
        IF IsValidCategoryStart(input[pos]) THEN
            // Zapisz obecną pozycję
            checkPos = pos
            // Sprawdź czy to rzeczywiście wygląda na początek segmentu
            categoryResult = TryParseCategory(input, checkPos)
            IF categoryResult.success THEN
                // To może być dobry początek segmentu
                RETURN pos
            END IF
        END IF
        
        pos = pos + 1
    END WHILE
    
    // Nie znaleziono więcej możliwych początków - wróć koniec wejścia
    RETURN length(input)
END FUNCTION

FUNCTION IsValidCategoryStart(char)
    // Sprawdza czy znak może być początkiem kategorii (emoji lub kod tekstowy)
    RETURN IsEmoji(char) OR IsAlphabeticChar(char)
END FUNCTION

// Funkcja próbująca parsować kategorię bez zmiany stanu
FUNCTION TryParseCategory(input, startPos)
    // Podobna do ParseCategory ale nie zgłasza błędów, tylko zwraca czy udało się sparsować
    // ...
END FUNCTION
```

## 3. Obsługa sekwencji ucieczki

Sekwencje ucieczki są kluczowym elementem zapewniającym bezpieczne osadzanie dowolnych danych tekstowych w profilu:

```
FUNCTION EscapeSpecialCharacters(value)
    result = ""
    
    FOR EACH char IN value
        IF IsSpecialChar(char) THEN
            // Dla znaków specjalnych (▪@^;+,{}=!.\)
            result = result + "\\" + char
        ELSE IF IsControlChar(char) OR IsNonPrintable(char) THEN
            // Dla znaków kontrolnych i nieprintowalnych - użyj kodowania Unicode
            hexValue = ToHexString(char.CodePoint())
            result = result + "\\u" + hexValue
        ELSE
            result = result + char
        END IF
    END FOR
    
    RETURN result
END FUNCTION

FUNCTION UnescapeSpecialCharacters(value)
    result = ""
    i = 0
    
    WHILE i < length(value)
        IF value[i] == '\\' AND i + 1 < length(value) THEN
            IF value[i+1] == 'u' AND i + 5 < length(value) THEN
                // Unicode escape sequence \uXXXX
                hexValue = value.Substring(i+2, 4)
                IF IsValidHexString(hexValue) THEN
                    codePoint = FromHexString(hexValue)
                    result = result + CharFromCodePoint(codePoint)
                    i = i + 6  // Przejdź za całą sekwencję \uXXXX
                ELSE
                    // Nieprawidłowa sekwencja \u
                    result = result + value[i]
                    i = i + 1
                END IF
            ELSE IF IsSpecialChar(value[i+1]) THEN
                // Escaped special character
                result = result + value[i+1]
                i = i + 2  // Przejdź za znaki \X
            ELSE
                // Nieprawidłowa sekwencja escape
                result = result + value[i]
                i = i + 1
            END IF
        ELSE
            result = result + value[i]
            i = i + 1
        END IF
    END WHILE
    
    RETURN result
END FUNCTION
```

## 4. Strategie odzyskiwania po błędach

Poniżej przedstawiamy klasy błędów oraz strategie ich obsługi:

### 4.1 Klasyfikacja błędów

```
CLASS ParserError
    type         // Typ błędu: SYNTAX, SEMANTIC, STRUCTURE, ENCODING
    severity     // Ważność: ERROR, WARNING, INFO
    position     // Pozycja w tekście źródłowym
    message      // Komunikat opisujący błąd
    context      // Kontekst błędu (otaczający tekst)
    suggestion   // Sugerowana poprawka, jeśli dostępna
END CLASS
```

### 4.2 Strategie odzyskiwania

```
FUNCTION RecoverFromError(error, input, currentPos)
    SWITCH error.type
        CASE SYNTAX:
            RETURN RecoverFromSyntaxError(error, input, currentPos)
        CASE SEMANTIC:
            RETURN RecoverFromSemanticError(error, input, currentPos)
        CASE STRUCTURE:
            RETURN RecoverFromStructureError(error, input, currentPos)
        CASE ENCODING:
            RETURN RecoverFromEncodingError(error, input, currentPos)
        DEFAULT:
            // Domyślna strategia odzyskiwania
            RETURN FindNextSegmentStart(input, currentPos)
    END SWITCH
END FUNCTION

FUNCTION RecoverFromSyntaxError(error, input, currentPos)
    // Różne strategie w zależności od kontekstu syntaktycznego
    IF error.context.IsPropertyKey THEN
        // Przejdź do następnego ogranicznika właściwości lub końca segmentu
        RETURN FindNextDelimiter(input, currentPos, [';', '}'])
    ELSE IF error.context.IsPropertyValue THEN
        // Przejdź do następnego ogranicznika właściwości lub końca segmentu
        RETURN FindNextDelimiter(input, currentPos, [';', '}'])
    ELSE IF error.context.IsContext THEN
        // Przejdź do początku właściwości lub segmentu
        RETURN FindNextDelimiter(input, currentPos, ['{', '}', '▪'])
    ELSE
        // Domyślnie szukaj początku następnego segmentu
        RETURN FindNextSegmentStart(input, currentPos)
    END IF
END FUNCTION

// Podobne funkcje dla innych typów błędów...
```

## 5. Kanoniczna implementacja referencyjna (pseudokod)

```typescript
class ProfileMatrixParser {
    private input: string;
    private position: number = 0;
    private errors: ParserError[] = [];
    
    constructor(input: string) {
        this.input = input;
    }
    
    public parse(): ProfileResult {
        const profile = new Profile();
        
        try {
            while (this.position < this.input.length) {
                const segmentResult = this.parseSegment();
                
                if (segmentResult.success) {
                    profile.segments.push(segmentResult.segment);
                    
                    // Sprawdź ogranicznik segmentu, jeśli nie znajdujemy się na końcu
                    if (this.position < this.input.length) {
                        if (this.input[this.position] === '▪') {
                            this.position++; // Przejdź za ogranicznik
                        } else {
                            this.addError(
                                'SYNTAX', 
                                'ERROR',
                                `Oczekiwano ogranicznika segmentu '▪' na pozycji ${this.position}`
                            );
                            this.recoverFromError();
                        }
                    }
                } else {
                    // Błąd został już dodany w parseSegment()
                    this.recoverFromError();
                }
            }
            
            return {
                profile,
                errors: this.errors,
                success: this.errors.length === 0
            };
        } catch (e) {
            this.addError(
                'UNEXPECTED', 
                'ERROR',
                `Nieoczekiwany błąd: ${e.message || e}`
            );
            
            return {
                profile,
                errors: this.errors,
                success: false
            };
        }
    }
    
    private parseSegment(): SegmentResult {
        const startPosition = this.position;
        const segment = new Segment();
        
        // Parsuj kategorię
        const categoryResult = this.parseCategory();
        if (!categoryResult.success) {
            return { success: false };
        }
        
        segment.category = categoryResult.value;
        
        // Parsuj kontekst, jeśli istnieje
        if (this.position < this.input.length && this.input[this.position] === '@') {
            const contextResult = this.parseContext();
            if (contextResult.success) {
                segment.context = contextResult.value;
            } else {
                return { success: false };
            }
        }
        
        // Sprawdź otwarcie nawiasu
        if (this.position >= this.input.length || this.input[this.position] !== '{') {
            this.addError(
                'SYNTAX', 
                'ERROR',
                `Oczekiwano '{' po kategorii/kontekście na pozycji ${this.position}`
            );
            return { success: false };
        }
        
        this.position++; // Przejdź za '{'
        
        // Parsuj właściwości
        const propertiesResult = this.parsePropertyList();
        if (!propertiesResult.success) {
            return { success: false };
        }
        
        segment.properties = propertiesResult.properties;
        
        // Sprawdź zamknięcie nawiasu
        if (this.position >= this.input.length || this.input[this.position] !== '}') {
            this.addError(
                'SYNTAX', 
                'ERROR',
                `Oczekiwano '}' na końcu segmentu na pozycji ${this.position}`
            );
            return { success: false };
        }
        
        this.position++; // Przejdź za '}'
        
        return {
            success: true,
            segment
        };
    }
    
    // Implementacje innych metod parsujących...
    
    private addError(type: string, severity: string, message: string): void {
        this.errors.push({
            type,
            severity,
            position: this.position,
            message,
            context: this.getErrorContext(),
            suggestion: this.getSuggestion(type, this.position)
        });
    }
    
    private recoverFromError(): void {
        const lastError = this.errors[this.errors.length - 1];
        this.position = this.findNextSegmentStart(this.position);
    }
    
    private findNextSegmentStart(fromPosition: number): number {
        // Implementacja jak opisano wcześniej...
    }
    
    private getErrorContext(): string {
        // Zwraca fragment tekstu wokół bieżącej pozycji dla kontekstu błędu
        const start = Math.max(0, this.position - 10);
        const end = Math.min(this.input.length, this.position + 10);
        return this.input.substring(start, end);
    }
    
    private getSuggestion(errorType: string, position: number): string {
        // Implementacja sugestii poprawek...
    }
}
```

## 6. Przykłady obsługi błędów

Poniżej przedstawiamy przykłady typowych błędów i jak parser będzie je obsługiwać:

### 6.1 Brak ogranicznika segmentu

**Wejście**: `💼{👔=👕^2🏢=🏠^5}`

**Problem**: Brak średnika `;` między właściwościami.

**Raportowany błąd**:
```
{
  "type": "SYNTAX",
  "severity": "ERROR",
  "position": 9,
  "message": "Brak ogranicznika właściwości ';' między '👔=👕^2' a '🏢'",
  "context": "=👕^2🏢=🏠^",
  "suggestion": "Dodaj ';' między '👔=👕^2' a '🏢=🏠^5'"
}
```

**Strategia odzyskiwania**: Parser przejdzie do następnego rozpoznawalnego początku właściwości (w tym przypadku `🏢`) i będzie kontynuować parsowanie.

### 6.2 Nieprawidłowa wartość wagi

**Wejście**: `💼{👔=👕^A;🏢=🏠^5}`

**Problem**: Waga musi być liczbą lub standardowym słowem kluczowym, a nie pojedynczą literą.

**Raportowany błąd**:
```
{
  "type": "SEMANTIC",
  "severity": "ERROR",
  "position": 9,
  "message": "Nieprawidłowa wartość wagi 'A'. Waga musi być liczbą (1-5) lub słowem kluczowym (Low, Medium, High)",
  "context": "👕^A;🏢=",
  "suggestion": "Zmień 'A' na liczbę lub standardowe słowo kluczowe"
}
```

**Strategia odzyskiwania**: Parser zignoruje nieprawidłową wagę i przyjmie wartość domyślną, kontynuując parsowanie od następnego ogranicznika właściwości.

### 6.3 Niezbalansowane nawiasy

**Wejście**: `💼{👔=👕^2;🏢=🏠^5`

**Problem**: Brak zamykającego nawiasu `}` na końcu segmentu.

**Raportowany błąd**:
```
{
  "type": "STRUCTURE",
  "severity": "ERROR",
  "position": 19,
  "message": "Brak zamykającego nawiasu '}' na końcu segmentu",
  "context": "🏠^5",
  "suggestion": "Dodaj '}' na końcu segmentu"
}
```

**Strategia odzyskiwania**: Parser doda wirtualne zamknięcie segmentu i będzie kontynuować od następnego segmentu lub końca wejścia.

## 7. Testy walidacyjne i przykłady

Ta sekcja zawiera komplet testów weryfikujących poprawność implementacji:

```typescript
// Przypadki pozytywne
const validTestCases = [
  // Standardowy przypadek
  {
    input: "💼{👔=👕^2;🏢=🏠^5} ▪ 📱{📱=📧^3}",
    expectedSegments: 2,
    expectedProperties: 3
  },
  
  // Z kontekstem na poziomie segmentu
  {
    input: "💼@Office{👔=👕^High} ▪ 💼@Remote{🏢=🏠^VeryHigh}",
    expectedSegments: 2,
    expectedProperties: 2
  },
  
  // Z kontekstem na poziomie właściwości
  {
    input: "💼{👔=👕^2@Meeting;🏢=🏠^5}",
    expectedSegments: 1,
    expectedProperties: 2
  },
  
  // Z kodami tekstowymi
  {
    input: "ENV{DRESS=CASUAL^4;LOCATION=REMOTE^5}",
    expectedSegments: 1,
    expectedProperties: 2
  },
  
  // Z wieloma wartościami
  {
    input: "💼{👔=👕+👔^2;🏢=🏠^5}",
    expectedSegments: 1,
    expectedProperties: 2
  },
  
  // Z sekwencjami ucieczki
  {
    input: "💼{👔=\"Value with \\u002B plus\";🏢=🏠^5}",
    expectedSegments: 1,
    expectedProperties: 2
  },
  
  // Ze wskaźnikami pewności
  {
    input: "💼{👔=👕^2!H;🏢=🏠^5!M}",
    expectedSegments: 1,
    expectedProperties: 2
  }
];

// Przypadki negatywne z oczekiwanym odzyskaniem
const errorRecoveryTestCases = [
  // Brak ogranicznika właściwości
  {
    input: "💼{👔=👕^2🏢=🏠^5}",
    expectedSegments: 1,
    expectedProperties: 2,
    expectedErrors: 1
  },
  
  // Niezbalansowane nawiasy
  {
    input: "💼{👔=👕^2;🏢=🏠^5",
    expectedSegments: 1,
    expectedProperties: 2,
    expectedErrors: 1
  },
  
  // Nieprawidłowa wartość wagi
  {
    input: "💼{👔=👕^A;🏢=🏠^5}",
    expectedSegments: 1,
    expectedProperties: 2,
    expectedErrors: 1
  },
  
  // Niekompletny segment
  {
    input: "💼@",
    expectedSegments: 0,
    expectedProperties: 0,
    expectedErrors: 1
  },
  
  // Mieszane błędy z wieloma segmentami
  {
    input: "💼{👔=👕^2;🏢=🏠^5 ▪ 📱{📱=📧^3;⏱️=⏰^}",
    expectedSegments: 2,
    expectedProperties: 4,
    expectedErrors: 2
  }
];
```

## 8. Wnioski i zalecenia implementacyjne

1. **Priorytet wdrażania**: Implementacja powinna zacząć się od podstawowej gramatyki, następnie dodać obsługę błędów i na koniec strategie odzyskiwania.

2. **Efektywność**: Chociaż obsługa błędów zwiększa złożoność parsera, jej wdrożenie jest kluczowe dla solidności i odporności systemów wykorzystujących ProfileMatrix 3.0.

3. **Testowanie**: Ekstensywne testowanie, zwłaszcza z przypadkami brzegowymi i błędnymi wejściami, jest niezbędne do zapewnienia niezawodnej implementacji.

4. **Dokumentacja błędów**: Systemy implementujące parser powinny udostępniać szczegółowe informacje o błędach, aby ułatwić rozwiązywanie problemów przez programistów.

5. **Progresywne ulepszenia**: Implementacja może ewoluować od podstawowej obsługi błędów do bardziej zaawansowanych strategii odzyskiwania, w miarę jak standard dojrzewa.

Niniejszy dokument stanowi kompletną specyfikację formalizującą gramatykę ProfileMatrix 3.0 oraz algorytmy parsowania z obsługą błędów, zgodnie z wymaganiami określonymi w poprawce PC3.0-2029-01.
