import { Segment, SegmentOption } from './segment-types'
import { getAllSegments, getAllAreas, getSegmentById } from './segment-service'
import { areas } from './segment-data'

// Pozyskujemy segmenty za pomocą funkcji zamiast bezpośredniego importu
// co pomaga uniknąć cyklicznych zależności
const allSegments = getAllSegments()

// Interfejs dla sparsowanego segmentu DNA
export interface ParsedDNASegment {
  area: string
  areaName: string
  emoji: string
  codes: {
    code: string
    value: string
    decodedValue: string
    description: string
    segmentEmoji?: string
  }[]
}

// Główne obszary aplikacji używane jako kategorie DNA
export const dnaCategories = areas.map(area => ({
  id: area.id,
  name: area.name,
  emoji: area.emoji || '❓'
}))

// Funkcja do dekodowania wartości kodu DNA
export function decodeDNAValue(code: string, value: string): string {
  // Znajdź segment z odpowiednim kodem
  const segment = allSegments.find(s => s.code === code)
  if (!segment) return value // Jeśli nie znaleziono segmentu, zwróć oryginalną wartość
  
  // Sprawdź, czy to multiselect z wartościami rozdzielonymi znakiem +
  if (value.includes('+') && segment.type === 'multiselect') {
    const values = value.split('+')
    if (segment.reverseValueMap) {
      // Dekoduj każdą wartość i połącz je przecinkami
      const decodedValues = values.map(val => segment.reverseValueMap?.[val] || val)
      return decodedValues.join(', ')
    }
    return values.join(', ')
  }
  
  // Jeśli istnieje reverseValueMap, użyj go do dekodowania
  if (segment.reverseValueMap && segment.reverseValueMap[value]) {
    return segment.reverseValueMap[value]
  }
  
  return value // Jeśli nie ma mapowania, zwróć oryginalną wartość
}

// Funkcja do grupowania segmentów według obszarów
export function groupSegmentsByArea(
  activeSegments: { id: string, segmentId: string, value: string | string[], visible: boolean, order?: number }[]
): Record<string, { segmentId: string, value: string | number | string[] }[]> {
  const result: Record<string, { segmentId: string, value: string | number | string[] }[]> = {}
  
  // Inicjalizuj kategorie
  dnaCategories.forEach(category => {
    result[category.id] = []
  })
  
  // Grupowanie aktywnych segmentów
  let skippedSegments = 0
  
  // Grupuj aktywne segmenty według obszarów
  activeSegments.filter(s => s.visible).forEach(segment => {
    const segmentData = allSegments.find(s => s.id === segment.segmentId)
    
    if (!segmentData) {
      // Brak danych dla segmentu
      skippedSegments++
      return
    }
    
    const areaId = segmentData.areaId
    if (!result[areaId]) result[areaId] = []
    
    result[areaId].push({
      segmentId: segment.segmentId,
      value: segment.value
    })
  })
  
  // Pominięto segmenty z powodu brakujących danych
  
  return result
}

// Funkcja do parsowania kodu DNA
export function parseDNACode(dnaCode: string): ParsedDNASegment[] {
  if (!dnaCode) return []
  
  const result: ParsedDNASegment[] = []
  const tmpParsedCodes: Record<string, Array<{
    code: string;
    value: string;
    decodedValue: string;
    description: string;
    segmentEmoji?: string;
  }>> = {}
  
  // Podziel kod DNA na segmenty (obszary)
  const dnaSegments = dnaCode.split('▪')
  // Podzielone segmenty DNA
  
  dnaSegments.forEach(segmentStr => {
    try {
      // Przetwarzanie segmentu
      // Wyodrębnij emoji obszaru i zawartość w nawiasach klamrowych
      const areaMatch = segmentStr.match(/^\s*([\p{Emoji}\p{Emoji_Presentation}\uFE0F]+)\{(.+)\}\s*$/u)
      if (!areaMatch) {
        // Brak dopasowania dla obszaru
        return
      }
      
      const [, areaEmoji, codesStr] = areaMatch
      // Znaleziono emoji obszaru i kody
      
      // Znajdź obszar na podstawie emoji
      const area = areas.find(a => a.emoji === areaEmoji.trim())
      if (!area) {
        // Brak obszaru dla emoji
        return
      }
      
      // Podziel kody na segmenty oddzielone średnikiem
      const segmentCodes = codesStr.split(';')
      // Podzielone kody segmentów
      
      const parsedCodes = []
      
      for (const segmentCodeStr of segmentCodes) {
        // Przetwarzanie kodu segmentu
        // Wyodrębnij emoji segmentu, kod segmentu i wartość
        // Wzorce: 
        // 1. emoji + kod + wartość (np. 🏟️WPF)
        // 2. emoji = wartość (np. 🏟️=F)
        let segmentEmoji, segmentCode, segmentValue
        
        // Obsługujemy trzy formaty:
        // 1. emoji=emoji (np. 🛡️=👨‍💼) - nowy format z emoji dla wartości
        // 2. emoji=kod (np. 🏟️=F) - format z literowym kodem wartości
        // 3. emojikodwartość (np. 🏟️WPF) - stary format
        
        // Próbujemy najpierw format emoji=emoji lub emoji=emoji+emoji+emoji (multiselect)
        const emojiValueMatch = segmentCodeStr.match(/\s*([\p{Emoji}\p{Emoji_Presentation}\uFE0F]+)\s*=\s*([\p{Emoji}\p{Emoji_Presentation}\uFE0F\u200D\+]+)\s*/u)
        
        if (emojiValueMatch) {
          // Format emoji=emoji lub emoji=emoji+emoji+emoji
          [, segmentEmoji, segmentValue] = emojiValueMatch
          // Znaleziono format emoji=emoji

          // Sprawdzamy czy mamy multiselect z +
          const isMultiSelect = segmentValue.includes('+')
          
          // Szukamy segmentu na podstawie emoji
          const segmentsForArea = allSegments.filter(s => s.areaId === area.id)
          const matchingSegment = segmentsForArea.find(s => s.emoji === segmentEmoji)
          
          if (matchingSegment) {
            segmentCode = matchingSegment.code
            
            // Jeśli to multiselect, dodajemy każdą wartość jako osobny element
            if (isMultiSelect) {
              // Wykryto multiselect w emoji=emoji
              const valuesList = segmentValue.split('+');
              
              for (const singleValue of valuesList) {
                // Przetwarzanie wartości multiselect
                
                // Pobieramy zdekodowane wartości dla każdego pojedynczego emoji
                let singleDecodedValue = singleValue;
                let singleDescription = "Brak opisu";
                
                // Dekodowanie wartości multiselect
                
                // Pobieramy pełną definicję segmentu z wszystkimi opcjami
                const fullSegment = allSegments.find(s => s.code === segmentCode);
                
                if (fullSegment) {
                  // Jeśli segment ma reverseValueMap, użyjemy go do dekodowania
                  if (fullSegment.reverseValueMap && fullSegment.reverseValueMap[singleValue]) {
                    singleDecodedValue = fullSegment.reverseValueMap[singleValue];
                    // Zdekodowano wartość
                    
                    // Próbujemy znaleźć opis w opcjach segmentu
                    const option = fullSegment.options?.find(o => 
                      o.value === singleDecodedValue || o.id === singleDecodedValue.toLowerCase());
                      
                    if (option) {
                      singleDescription = option.description || "Brak opisu";
                      // Znaleziono opis
                    }
                  }
                } else {
                  // Brak pełnej definicji segmentu
                }
                
                parsedCodes.push({
                  code: segmentCode,
                  value: singleValue,
                  decodedValue: singleDecodedValue,
                  description: singleDescription,
                  segmentEmoji: segmentEmoji
                });
              }
              // Przechodzimy do kolejnego segmentu, bo już dodaliśmy wszystkie wartości
              continue;
            }
          } else {
            console.log(`Nie znaleziono segmentu dla emoji: ${segmentEmoji} w obszarze: ${area.id}`)
            continue
          }
        } else {
          // Próbujemy format emoji=kod
          const textValueMatch = segmentCodeStr.match(/\s*([\p{Emoji}\p{Emoji_Presentation}\uFE0F]+)\s*=\s*([A-Z0-9]+)\s*/u)
          
          if (textValueMatch) {
            // Format emoji=kod
            [, segmentEmoji, segmentValue] = textValueMatch
            // Znaleziono format emoji=kod
            
            // Szukamy segmentu na podstawie emoji
            const segmentsForArea = allSegments.filter(s => s.areaId === area.id)
            const matchingSegment = segmentsForArea.find(s => s.emoji === segmentEmoji)
            
            if (matchingSegment) {
              segmentCode = matchingSegment.code
            } else {
              // Brak segmentu dla emoji w obszarze
              continue
            }
          } else {
            // Próbujemy stary format: emoji + kod + wartość
            const oldFormatMatch = segmentCodeStr.match(/\s*([\p{Emoji}\p{Emoji_Presentation}\uFE0F]+)([A-Z]+)([A-Z0-9]+)\s*/u)
            if (!oldFormatMatch) {
              // Brak dopasowania dla kodu segmentu
              continue
            }
            [, segmentEmoji, segmentCode, segmentValue] = oldFormatMatch
            // Znaleziono stary format
          }
        }
        
        // Informacja o kodzie segmentu i jego wartości
        
        // Znajdź segment na podstawie kodu
        const foundSegment = allSegments.find(s => s.code === segmentCode)
        
        if (foundSegment) {
          let decodedValue = segmentValue
          let description = "Brak opisu"
          
          // Sprawdź, czy to multiselect z wartościami rozdzielonymi znakiem +
          if (segmentValue.includes('+')) {
            // Wykryto wartość multiselect z separatorem +
            
            // Podziel wartość na poszczególne elementy
            const values = segmentValue.split('+');
            
            // Czyścimy tablicę parsedCodes jeśli to pierwszy multiselect dla tego segmentu
            // aby uniknąć duplikatów kodów dla tego samego segmentu
            const existingCodesForThisSegment = parsedCodes.filter(pc => pc.code === segmentCode);
            if (existingCodesForThisSegment.length > 0) {
              console.log(`Usunięto ${existingCodesForThisSegment.length} istniejących kodów dla segmentu ${segmentCode}`);
              // Usuń istniejące kody dla tego segmentu - modyfikujemy zamiast przypisywać
              // czyścimy array bez tworzenia nowego
              parsedCodes.splice(0, parsedCodes.length, ...parsedCodes.filter(pc => pc.code !== segmentCode));
            }
            
            // Zamiast dodawać pojedynczy wpis dla całego segmentu,
            // dodaj osobny wpis dla każdej wartości w multiselect
            for (const val of values) {
              let singleDecodedValue = val;
              let singleDescription = "";
              
              // Sprawdź czy wartość jest emoji i czy segment ma reverseValueMap
              if (foundSegment.reverseValueMap && /[\p{Emoji}\p{Emoji_Presentation}\uFE0F\u200D]/u.test(val)) {
                // Jeśli mamy reverseValueMap, to odkoduj emoji wartości na tekst
                if (foundSegment.reverseValueMap[val]) {
                  singleDecodedValue = foundSegment.reverseValueMap[val];
                  
                  // Znajdź opis w opcjach
                  const option = foundSegment.options?.find(o => o.value === singleDecodedValue || 
                                                              o.id === singleDecodedValue.toLowerCase());
                  if (option) {
                    singleDescription = option.description || "Brak opisu";
                  }
                }
              } else {
                // Dla wartości tekstowych, szukaj bezpośrednio w options
                const option = foundSegment.options?.find(o => 
                  o.id === val.toLowerCase() || o.value === val);
                
                if (option) {
                  singleDecodedValue = option.value || option.label || val;
                  singleDescription = option.description || "Brak opisu";
                }
              }
              
              // Dodaj tę wartość jako osobny wpis w parsedCodes
              parsedCodes.push({
                code: segmentCode,
                value: val, // Zachowaj oryginalne kodowanie dla pojedynczej wartości
                decodedValue: singleDecodedValue,
                description: singleDescription,
                segmentEmoji: segmentEmoji
              });
              
              console.log(`Dodano kod multiselect: ${segmentCode}, wartość: ${val}, zdekodowana: ${singleDecodedValue}`);
            }
            
            // Nie dodawaj zbiorczo wszystkich wartości - każda jest już dodana osobno
            // To powoduje, że dla każdej wartości będzie osobny kafelek w wizualizacji
            continue;
          } else {
            // Standardowa obsługa dla pojedynczych wartości
            // Sprawdź czy wartość jest emoji i czy segment ma reverseValueMap
            if (foundSegment.reverseValueMap && /[\p{Emoji}\p{Emoji_Presentation}\uFE0F\u200D]/u.test(segmentValue)) {
              // Jeśli mamy reverseValueMap, to odkoduj emoji wartości na tekst
              if (foundSegment.reverseValueMap[segmentValue]) {
                decodedValue = foundSegment.reverseValueMap[segmentValue];
                
                // Znajdź opis w opcjach
                const option = foundSegment.options?.find(o => o.value === decodedValue || o.id === decodedValue.toLowerCase());
                if (option) {
                  description = option.description || "Brak opisu";
                }
              }
            } else {
              // Dla wartości tekstowych, szukaj bezpośrednio w options
              const option = foundSegment.options?.find(o => 
                o.id === segmentValue.toLowerCase() || 
                o.value === segmentValue);
              
              if (option) {
                decodedValue = option.value || option.label || segmentValue;
                description = option.description || "Brak opisu";
              }
            }
          }
          
          parsedCodes.push({
            code: segmentCode,
            value: segmentValue,
            decodedValue: decodedValue,
            description: description,
            segmentEmoji: segmentEmoji
          })
        } else {
          console.log(`Nie znaleziono segmentu dla kodu: ${segmentCode}`)
        }
      }
      
      if (parsedCodes.length > 0) {
        // Zamiast dodawać od razu do wyniku, zapisujemy do tymczasowej struktury
        // aby później połączyć wszystkie segmenty tego samego obszaru
        if (!tmpParsedCodes[area.id]) {
          tmpParsedCodes[area.id] = [];
        }
        // Dodajemy wszystkie kody do tymczasowej struktury
        tmpParsedCodes[area.id].push(...parsedCodes);
      }
    } catch (error) {
      console.error('Błąd podczas parsowania kodu DNA:', error)
    }
  })
  
  // Teraz budujemy ostateczną strukturę wynikową na podstawie tymczasowych danych
  for (const [areaId, codes] of Object.entries(tmpParsedCodes)) {
    if (codes.length > 0) {
      const areaInfo = areas.find(a => a.id === areaId);
      if (!areaInfo) continue;
      
      result.push({
        area: areaId,
        areaName: areaInfo.name,
        emoji: areaInfo.emoji || '❓',
        codes: codes
      });
    }
  }
  
  return result
}

// Funkcja do pobierania kodu DNA dla wartości segmentu
export function getDNACodeForValue(segmentId: string, value: string | number | string[]): string {
  // Generacja kodu DNA dla segmentu
  
  const segment = allSegments.find(s => s.id === segmentId)
  
  if (!segment) {
    // Nie znaleziono segmentu
    return value.toString()
  }
  
  // Znaleziono segment
  
  // Jeśli wartość jest pusta lub undefined, zwróć pusty string
  if (value === undefined || value === null || value === '') {
    // Wartość jest pusta
    return ''
  }
  
  // Obsługa tablicy wartości dla multiselect
  if (Array.isArray(value)) {
    // Przetwarzanie tablicy wartości
    
    if (value.length === 0) {
      // Pusta tablica wartości
      return ''
    }
    
    // Wartość segmentu
    
    // Mapuj każdą wartość i łącz je znakiem +
    if (segment.valueMap) {
      // Wykorzystanie valueMap dla segmentu
      
      // Dodajemy sortowanie, żeby wyniki były zawsze w tej samej kolejności
      const mappedValues = value.map(v => {
        const mappedValue = segment.valueMap?.[v] || v;
        // Mapowanie wartości na emoji
        return {
          original: v,
          mapped: mappedValue
        };
      });
      
      // Sprawdzamy, czy wszystkie wartości zostały poprawnie zmapowane
      if (mappedValues.some(item => item.mapped === item.original && segment.valueMap && Object.keys(segment.valueMap).includes(item.original))) {
        // Niektóre wartości nie zostały zmapowane
      }
      
      // Sortujemy według oryginalnej wartości, aby zachować stabilną kolejność
      mappedValues.sort((a, b) => a.original.localeCompare(b.original));
      
      // Łączymy posortowane wartości znakiem +
      const result = mappedValues.map(item => {
        // Finalne mapowanie wartości
        return item.mapped;
      }).join('+');
      
      // Finalny wynik dla multiselect
      return result;
    }
    
    // Jeśli nie ma valueMap, po prostu sortujemy i łączymy wartości
    // Brak valueMap, użycie bezpośrednich wartości
    const result = [...value].sort().join('+');
    // Wynik łączenia wartości;
    return result
  }
  
  // Jeśli istnieje mapowanie wartości, użyj go
  if (segment.valueMap && typeof value === 'string' && segment.valueMap[value]) {
    return segment.valueMap[value]
  }
  
  // Jeśli istnieje typ skali, użyj go
  if (segment.scaleType && typeof value === 'number') {
    return `${segment.scaleType}${value}`
  }
  
  // Jeśli istnieje szablon formatowania, użyj go
  if (segment.formatTemplate) {
    return segment.formatTemplate.replace('{value}', value.toString())
  }
  
  // Jeśli wartość jest stringiem i zawiera spacje lub jest dłuższa niż 10 znaków,
  // wygeneruj skrócony kod na podstawie pierwszych liter słów
  if (typeof value === 'string' && (value.includes(' ') || value.length > 10)) {
    // Usuń znaki specjalne i podziel na słowa
    const words = value.replace(/[^\w\s]/gi, '').split(/\s+/)
    
    // Jeśli jest tylko jedno słowo, weź pierwsze 3 litery
    if (words.length === 1) {
      return words[0].substring(0, Math.min(3, words[0].length)).toUpperCase()
    }
    
    // Dla wielu słów, weź pierwsze litery każdego słowa (max 3)
    return words.slice(0, 3).map(word => word.charAt(0).toUpperCase()).join('')
  }
  
  // W przeciwnym razie zwróć oryginalną wartość
  return value.toString()
}

// Funkcja do generowania pełnego kodu DNA
export function generateDNACode(activeSegments: { id: string, segmentId: string, value: string | string[], visible: boolean, order?: number }[]): string {
  // Grupuj segmenty według obszarów
  const groupedSegments = groupSegmentsByArea(activeSegments)
  
  // Tablica na segmenty kodu DNA
  const dnaSegments = []
  
  // Dla każdego obszaru
  Object.entries(groupedSegments).forEach(([areaId, segmentList]) => {
    if (segmentList.length === 0) return
    
    // Znajdź obszar
    const area = areas.find(a => a.id === areaId)
    if (!area) return
    
    // Emoji obszaru
    const areaEmoji = area.emoji
    
    // Tablica na kody segmentów
    const segmentCodes = []
    
    // Dla każdego segmentu w obszarze
    segmentList.forEach(({ segmentId, value }) => {
      // Pobierz dane segmentu
      const segment = allSegments.find(s => s.id === segmentId)
      if (!segment) return
      
      // Emoji segmentu
      const segmentEmoji = segment.emoji
      if (!segmentEmoji) return
      
      // Kod segmentu
      const segmentCode = segment.code
      if (!segmentCode) return
      
      // Kod DNA dla wartości
      const dnaValue = getDNACodeForValue(segmentId, value)
      
      // Dodaj kod segmentu
      segmentCodes.push(`${segmentEmoji}${segmentCode}${dnaValue}`)
    })
    
    // Jeśli są jakieś kody segmentów, dodaj segment obszaru
    if (segmentCodes.length > 0) {
      dnaSegments.push(`${areaEmoji}{${segmentCodes.join(';')}}`)
    }
  })
  
  // Połącz wszystkie segmenty
  return dnaSegments.join('▪')
}

// Interfejs dla mapowania kodu DNA
export interface DNACodeMapping {
  segmentId: string
  emoji?: string
  segmentEmoji?: string // Emoji dla segmentu (może być inne niż emoji segmentu)
  code: string
  valueMap?: Record<string, string>
  reverseValueMap?: Record<string, string>
  scaleType?: 'P' | 'T' | 'F' | 'C' | 'A' | 'S'
  formatTemplate?: string
  areaId: string
  description?: string
}

// Funkcja zapewniająca, że wszystkie segmenty mają ustawione emoji
export function ensureSegmentEmojis(): DNACodeMapping[] {
  const mappings: DNACodeMapping[] = []
  
  // Dla każdego segmentu utwórz mapowanie
  allSegments.forEach(segment => {
    const mapping: DNACodeMapping = {
      segmentId: segment.id,
      emoji: segment.emoji,
      segmentEmoji: segment.emoji, // Użyj emoji segmentu jako domyślne
      code: segment.code || '',
      valueMap: segment.valueMap,
      reverseValueMap: segment.reverseValueMap,
      scaleType: segment.scaleType as any,
      formatTemplate: segment.formatTemplate,
      areaId: segment.areaId,
      description: segment.description
    }
    
    mappings.push(mapping)
  })
  
  return mappings
}

// Funkcje dla kompatybilności wstecznej
export function ensureAllSegmentsMapped(): DNACodeMapping[] {
  return []
}

export function getDNAMappingForSegment(segmentId: string): DNACodeMapping | undefined {
  const segment = allSegments.find(s => s.id === segmentId)
  if (!segment) return undefined
  
  return {
    segmentId: segment.id,
    emoji: segment.emoji,
    code: segment.code || '',
    valueMap: segment.valueMap,
    reverseValueMap: segment.reverseValueMap,
    scaleType: segment.scaleType as any,
    formatTemplate: segment.formatTemplate,
    areaId: segment.areaId,
    description: segment.description
  }
}
