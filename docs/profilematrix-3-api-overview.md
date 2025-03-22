# ProfileMatrix 3.0 - Standardy API

*Dokument implementacyjny dla patcha PC3.0-2029-07*

## 1. Wprowadzenie i Podstawowe Założenia

ProfileMatrix 3.0 definiuje spójny standard API dla interakcji z profilami, umożliwiający bezpieczną i wydajną komunikację między różnymi implementacjami. Ten dokument opisuje specyfikację API, która powinna być zaimplementowana przez wszystkie systemy używające standardu ProfileMatrix 3.0.

### 1.1 Kluczowe założenia API

- API oparte na REST z opcjonalnym wsparciem dla GraphQL
- Pełna obsługa CRUD dla profili i ich komponentów
- Bezpieczeństwo i prywatność w centrum architektury
- Kompatybilność wsteczna z poprzednimi wersjami
- Szczegółowa kontrola dostępu i uprawnienia
- Wsparcie zarówno dla formatu emoji jak i tekstowego
- Wielojęzyczność i internacjonalizacja
- Zgodność z GDPR, CCPA i innymi przepisami o ochronie danych

### 1.2 Struktura dokumentacji API

Dokumentacja API ProfileMatrix 3.0 jest podzielona na następujące sekcje:

1. **Przegląd i założenia** (ten dokument)
2. **Endpointy i operacje** (szczegółowy opis wszystkich zasobów i operacji)
3. **Modele danych** (szczegółowa specyfikacja struktury danych)
4. **Zabezpieczenia i uwierzytelnianie** (opis mechanizmów bezpieczeństwa)
5. **Licencjonowanie i użytkowanie** (zasady komercyjnego i niekomercyjnego wykorzystania)

## 2. Formaty Wymiany Danych

API ProfileMatrix 3.0 wspiera dwa główne formaty danych:

### 2.1 Format JSON (domyślny)

JSON jest domyślnym formatem dla wszystkich operacji API. Przykład:

```json
{
  "profile": {
    "id": "prof_289a7sd8f9",
    "name": "Przykładowy profil",
    "segments": [
      {
        "category": "ENV",
        "properties": [
          { "key": "DRESS", "value": "CASUAL", "weight": 3 },
          { "key": "LOCATION", "value": "REMOTE", "weight": 5 }
        ]
      },
      {
        "category": "COMM",
        "properties": [
          { 
            "key": "CHANNEL", 
            "values": ["EMAIL", "PHONE"], 
            "weights": [3, 4] 
          }
        ]
      }
    ]
  }
}
```

### 2.2 Format DNA

API wspiera również kompaktową reprezentację DNA w dwóch wariantach:

#### 2.2.1 Format DNA Emoji

```
💼{👔=👕^3;🏢=🏠^5} ▪ 📱{📱=📧^3+📞^4}
```

#### 2.2.2 Format DNA Tekstowy

```
ENV{DRESS=CASUAL^3;LOCATION=REMOTE^5} ▪ COMM{CHANNEL=EMAIL^3+PHONE^4}
```

### 2.3 Kontrola Formatu Odpowiedzi

Wszystkie endpointy oferują parametr `format`, który kontroluje format odpowiedzi:

- `format=json` (domyślnie)
- `format=dna-emoji`
- `format=dna-text`

## 3. Przegląd Obszarów API

API ProfileMatrix 3.0 dzieli się na następujące obszary funkcjonalne:

### 3.1 Zarządzanie Profilami

- `GET /api/v3/profiles` - Lista profili
- `POST /api/v3/profiles` - Tworzenie nowego profilu
- `GET /api/v3/profiles/{profileId}` - Pobranie szczegółów profilu
- `PUT /api/v3/profiles/{profileId}` - Aktualizacja profilu
- `DELETE /api/v3/profiles/{profileId}` - Usunięcie profilu

### 3.2 Walidacja i Weryfikacja

- `POST /api/v3/validation` - Walidacja surowego profilu
- `GET /api/v3/profiles/{profileId}/validate` - Walidacja istniejącego profilu
- `POST /api/v3/profiles/{profileId}/fix` - Naprawa błędów w profilu

### 3.3 Konteksty i Dostosowanie

- `GET /api/v3/contexts` - Lista dostępnych kontekstów
- `POST /api/v3/profiles/{profileId}/contexts` - Dodanie kontekstu do profilu
- `GET /api/v3/profiles/{profileId}/resolve` - Rozwiązanie preferencji dla kontekstów

### 3.4 Transformacje i Konwersje

- `POST /api/v3/convert` - Konwersja między formatami (emoji/tekstowy)
- `GET /api/v3/profiles/{profileId}/export` - Eksport profilu w różnych formatach
- `POST /api/v3/profiles/import` - Import profilu z zewnętrznego formatu

### 3.5 Wyszukiwanie i Analiza

- `GET /api/v3/profiles/search` - Wyszukiwanie profili
- `POST /api/v3/profiles/compare` - Porównanie dwóch lub więcej profili
- `GET /api/v3/profiles/{profileId}/analytics` - Analiza profilu

## 4. Zasady Projektowania API

### 4.1 Wersjonowanie

API jest wersjonowane w ścieżce URL:

- `/api/v3/` - Aktualna stabilna wersja (ProfileMatrix 3.0)
- `/api/v2/` - Poprzednia wersja (kompatybilność)
- `/api/beta/` - Wersja rozwojowa (niestabilna)

### 4.2 Paginacja

Zasoby zwracające listy obsługują paginację przez parametry:

- `limit` - Liczba elementów na stronę (domyślnie: 20, maksimum: 100)
- `offset` - Przesunięcie dla paginacji
- `page` - Numer strony (alternatywnie)

### 4.3 Filtrowanie

Filtrowanie kolekcji jest dostępne przez parametry zapytania:

- `filter[field]=value` - Filtrowanie po polu
- `filter[field][operator]=value` - Filtrowanie z operatorem
- `sort=field` lub `sort=-field` - Sortowanie

### 4.4 Rate Limiting

API stosuje limity zapytań:

- Podstawowy: 100 zapytań/minutę
- Premium: 500 zapytań/minutę
- Enterprise: Konfigurowalne limity

Informacje o limitach są przekazywane w nagłówkach:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

## 5. Uwagi Implementacyjne

### 5.1 Kompatybilność

Implementacje API powinny:

- Ignorować nieznane pola w zapytaniach
- Zawsze dostarczać wszystkie wymagane pola
- Obsługiwać wersjonowanie poprzez nagłówek `Accept`
- Sygnalizować przestarzałe endpointy przez nagłówek `Deprecation`

### 5.2 Hiperłącza i HATEOAS

Odpowiedzi API powinny zawierać hiperłącza do powiązanych zasobów:

```json
{
  "profile": {
    "id": "prof_1234",
    "name": "Przykład",
    "_links": {
      "self": "/api/v3/profiles/prof_1234",
      "validate": "/api/v3/profiles/prof_1234/validate",
      "contexts": "/api/v3/profiles/prof_1234/contexts"
    }
  }
}
```

### 5.3 Kontrola Błędów

API używa standardowych kodów odpowiedzi HTTP oraz strukturyzowanych komunikatów błędów:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Błąd walidacji profilu",
    "details": [
      {
        "field": "segments[0].properties[1].weight",
        "message": "Waga musi być między 1 a 5",
        "code": "INVALID_RANGE"
      }
    ],
    "documentation_url": "https://api.profilematrix.org/docs/errors#VALIDATION_ERROR"
  }
}
```

## 6. Podsumowanie

Standard API ProfileMatrix 3.0 dostarcza kompleksowy zestaw interfejsów do zarządzania profilami użytkowników. Został zaprojektowany z myślą o bezpieczeństwie, dostępności i rozszerzalności. Szczegółowe informacje o poszczególnych endpointach, modelach danych i zabezpieczeniach znajdują się w oddzielnych dokumentach.

Dalsza dokumentacja:
- [Endpointy i Operacje](/docs/profilematrix-3-api-endpoints.md)
- [Modele Danych](/docs/profilematrix-3-api-models.md)
- [Zabezpieczenia i Uwierzytelnianie](/docs/profilematrix-3-api-security.md)
- [Licencjonowanie i Użytkowanie](/docs/profilematrix-3-api-licensing.md)
