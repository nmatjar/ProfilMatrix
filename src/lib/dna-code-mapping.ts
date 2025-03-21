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
  
  console.log(`Grouping ${activeSegments.length} active segments`)
  let skippedSegments = 0
  
  // Grupuj aktywne segmenty według obszarów
  activeSegments.filter(s => s.visible).forEach(segment => {
    const segmentData = allSegments.find(s => s.id === segment.segmentId)
    
    if (!segmentData) {
      console.log(`No segment data found for segment: ${segment.segmentId}`)
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
  
  console.log(`Skipped ${skippedSegments} segments due to missing data`)
  
  return result
}

// Funkcja do parsowania kodu DNA
export function parseDNACode(dnaCode: string): ParsedDNASegment[] {
  if (!dnaCode) return []
  
  const result: ParsedDNASegment[] = []
  
  // Podziel kod DNA na segmenty (obszary)
  const dnaSegments = dnaCode.split('▪')
  console.log('Podzielone segmenty DNA:', dnaSegments)
  
  dnaSegments.forEach(segmentStr => {
    try {
      console.log('Przetwarzanie segmentu:', segmentStr)
      // Wyodrębnij emoji obszaru i zawartość w nawiasach klamrowych
      const areaMatch = segmentStr.match(/^\s*([\p{Emoji}\p{Emoji_Presentation}\uFE0F]+)\{(.+)\}\s*$/u)
      if (!areaMatch) {
        console.log('Nie znaleziono dopasowania dla obszaru:', segmentStr)
        return
      }
      
      const [, areaEmoji, codesStr] = areaMatch
      console.log('Znaleziono emoji obszaru:', areaEmoji, 'i kody:', codesStr)
      
      // Znajdź obszar na podstawie emoji
      const area = areas.find(a => a.emoji === areaEmoji.trim())
      if (!area) {
        console.log(`Nie znaleziono obszaru dla emoji: ${areaEmoji}`)
        return
      }
      
      // Podziel kody na segmenty oddzielone średnikiem
      const segmentCodes = codesStr.split(';')
      console.log('Podzielone kody segmentów:', segmentCodes)
      
      const parsedCodes = []
      
      for (const segmentCodeStr of segmentCodes) {
        console.log('Przetwarzanie kodu segmentu:', segmentCodeStr)
        // Wyodrębnij emoji segmentu, kod segmentu i wartość
        // Wzorce: 
        // 1. emoji + kod + wartość (np. 🏟️WPF)
        // 2. emoji = wartość (np. 🏟️=F)
        let segmentEmoji, segmentCode, segmentValue
        
        // Obsługujemy trzy formaty:
        // 1. emoji=emoji (np. 🛡️=👨‍💼) - nowy format z emoji dla wartości
        // 2. emoji=kod (np. 🏟️=F) - format z literowym kodem wartości
        // 3. emojikodwartość (np. 🏟️WPF) - stary format
        
        // Próbujemy najpierw format emoji=emoji
        const emojiValueMatch = segmentCodeStr.match(/\s*([\p{Emoji}\p{Emoji_Presentation}\uFE0F]+)\s*=\s*([\p{Emoji}\p{Emoji_Presentation}\uFE0F\u200D]+)\s*/u)
        
        if (emojiValueMatch) {
          // Format emoji=emoji
          [, segmentEmoji, segmentValue] = emojiValueMatch
          console.log('Znaleziono format emoji=emoji:', segmentEmoji, '=', segmentValue)
          
          // Szukamy segmentu na podstawie emoji
          const segmentsForArea = allSegments.filter(s => s.areaId === area.id)
          const matchingSegment = segmentsForArea.find(s => s.emoji === segmentEmoji)
          
          if (matchingSegment) {
            segmentCode = matchingSegment.code
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
            console.log('Znaleziono format emoji=kod:', segmentEmoji, '=', segmentValue)
            
            // Szukamy segmentu na podstawie emoji
            const segmentsForArea = allSegments.filter(s => s.areaId === area.id)
            const matchingSegment = segmentsForArea.find(s => s.emoji === segmentEmoji)
            
            if (matchingSegment) {
              segmentCode = matchingSegment.code
            } else {
              console.log(`Nie znaleziono segmentu dla emoji: ${segmentEmoji} w obszarze: ${area.id}`)
              continue
            }
          } else {
            // Próbujemy stary format: emoji + kod + wartość
            const oldFormatMatch = segmentCodeStr.match(/\s*([\p{Emoji}\p{Emoji_Presentation}\uFE0F]+)([A-Z]+)([A-Z0-9]+)\s*/u)
            if (!oldFormatMatch) {
              console.log('Nie znaleziono dopasowania dla kodu segmentu:', segmentCodeStr)
              continue
            }
            [, segmentEmoji, segmentCode, segmentValue] = oldFormatMatch
            console.log('Znaleziono stary format:', segmentEmoji, segmentCode, segmentValue)
          }
        }
        
        console.log('Kod segmentu:', segmentCode, 'i wartość:', segmentValue)
        
        // Znajdź segment na podstawie kodu
        const foundSegment = allSegments.find(s => s.code === segmentCode)
        
        if (foundSegment) {
          let decodedValue = segmentValue
          let description = "Brak opisu"
          
          // Sprawdź, czy to multiselect z wartościami rozdzielonymi znakiem +
          if (segmentValue.includes('+')) {
            console.log(`Wykryto wartość multiselect z separatorem +: ${segmentValue}`);
            
            // Podziel wartość na poszczególne elementy
            const values = segmentValue.split('+');
            
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
              
              console.log(`Dodano wpół kodu multiselect: ${segmentCode}, wartość: ${val}, 
                zdekodowana: ${singleDecodedValue}`);
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
        result.push({
          area: area.id,
          areaName: area.name,
          emoji: areaEmoji,
          codes: parsedCodes
        })
      }
    } catch (error) {
      console.error('Błąd podczas parsowania kodu DNA:', error)
    }
  })
  
  return result
}

// Funkcja do pobierania kodu DNA dla wartości segmentu
export function getDNACodeForValue(segmentId: string, value: string | number | string[]): string {
  console.log(`[DEBUG getDNACodeForValue] POCZĄTEK segmentId: ${segmentId}, value:`, value, 'type:', typeof value, 'isArray:', Array.isArray(value));
  
  const segment = allSegments.find(s => s.id === segmentId)
  
  if (!segment) {
    console.log(`[DEBUG getDNACodeForValue] Nie znaleziono segmentu o ID ${segmentId}`);
    return value.toString()
  }
  
  console.log(`[DEBUG getDNACodeForValue] Znaleziono segment: ${segment.name}, typ: ${segment.type}`);
  
  // Jeśli wartość jest pusta lub undefined, zwróć pusty string
  if (value === undefined || value === null || value === '') {
    console.log(`[DEBUG getDNACodeForValue] Wartość jest pusta dla segmentu ${segmentId}`);
    return ''
  }
  
  // Obsługa tablicy wartości dla multiselect
  if (Array.isArray(value)) {
    console.log(`[DEBUG getDNACodeForValue] TABLICA dla segmentu ${segmentId} - ilość elementów: ${value.length}`);
    
    if (value.length === 0) {
      console.log(`[DEBUG getDNACodeForValue] Pusta tablica dla segmentu ${segmentId}, zwracam pusty string`);
      return ''
    }
    
    console.log(`[DEBUG getDNACodeForValue] segmentId: ${segmentId}, value:`, JSON.stringify(value));
    
    // Mapuj każdą wartość i łącz je znakiem +
    if (segment.valueMap) {
      console.log(`[DEBUG getDNACodeForValue] Znaleziono valueMap dla segmentu ${segmentId}:`, JSON.stringify(segment.valueMap));
      
      // Dodajemy sortowanie, żeby wyniki były zawsze w tej samej kolejności
      const mappedValues = value.map(v => {
        const mappedValue = segment.valueMap?.[v] || v;
        console.log(`[DEBUG getDNACodeForValue] Mapowanie wartości '${v}' -> '${mappedValue}'`);
        return {
          original: v,
          mapped: mappedValue
        };
      });
      
      // Sprawdzamy, czy wszystkie wartości zostały poprawnie zmapowane
      if (mappedValues.some(item => item.mapped === item.original && segment.valueMap && Object.keys(segment.valueMap).includes(item.original))) {
        console.log(`[DEBUG getDNACodeForValue] UWAGA: Niektóre wartości nie zostały poprawnie zmapowane!`);
      }
      
      // Sortujemy według oryginalnej wartości, aby zachować stabilną kolejność
      mappedValues.sort((a, b) => a.original.localeCompare(b.original));
      
      // Łączymy posortowane wartości znakiem +
      const result = mappedValues.map(item => {
        console.log(`[DEBUG getDNACodeForValue] Finalne mapowanie '${item.original}' na '${item.mapped}'`);
        return item.mapped;
      }).join('+');
      
      console.log(`[DEBUG getDNACodeForValue] Wynik dla multiselect:`, result);
      return result;
    }
    
    // Jeśli nie ma valueMap, po prostu sortujemy i łączymy wartości
    console.log(`[DEBUG getDNACodeForValue] Brak valueMap dla segmentu ${segmentId}, łączę wartości bezpośrednio`);
    const result = [...value].sort().join('+');
    console.log(`[DEBUG getDNACodeForValue] Wynik sortowania i łączenia:`, result);
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
