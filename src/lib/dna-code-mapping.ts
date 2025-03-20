import { Segment, SegmentOption } from './segment-types'
import { getAllSegments, getAllAreas } from './segment-service'

// Interfejs dla mapowania kodu DNA
export interface DNACodeMapping {
  segmentId: string
  emoji: string
  code: string
  valueMap?: Record<string, string> // Mapowanie wartości na kody
  reverseValueMap?: Record<string, string> // Mapowanie kodów na wartości (do dekodowania)
  scaleType?: 'P' | 'T' | 'F' | 'C' | 'A' | 'S' // Typ skali
  formatTemplate?: string // Szablon formatowania
  areaId: string // ID obszaru, do którego należy segment
  description?: string // Opis segmentu
}

// Główne obszary aplikacji używane jako kategorie DNA
export const dnaCategories = [
  { id: 'work-organization', name: 'Praca i Organizacja', emoji: '🏢' },
  { id: 'location-mobility', name: 'Lokalizacja i Mobilność', emoji: '📍' },
  { id: 'collaboration-relations', name: 'Współpraca i Relacje', emoji: '👥' },
  { id: 'time-availability', name: 'Czas i Dostępność', emoji: '⏰' },
  { id: 'process-methodology', name: 'Proces i Metodologia', emoji: '🧠' },
  { id: 'communication-decisions', name: 'Komunikacja i Decyzje', emoji: '💬' },
  { id: 'development-adaptation', name: 'Rozwój i Adaptacja', emoji: '🔄' },
  { id: 'technology-preferences', name: 'Preferencje Technologiczne', emoji: '💻' },
  { id: 'work-style-preferences', name: 'Styl Pracy i Preferencje', emoji: '☕' }
]

// Mapowanie segmentów na kody DNA
export const dnaCodeMappings: DNACodeMapping[] = [
  // Praca i Organizacja
  {
    segmentId: 'organization-type',
    emoji: '🏢',
    code: 'ORG',
    valueMap: {
      'Korporacja': 'K',
      'Startup/Scaleup': 'S',
      'Instytucja publiczna': 'P',
      'Uczelnia/Edukacja': 'E',
      'NGO/Non-profit': 'N'
    },
    reverseValueMap: {
      'K': 'Korporacja',
      'S': 'Startup/Scaleup',
      'P': 'Instytucja publiczna',
      'E': 'Uczelnia/Edukacja',
      'N': 'NGO/Non-profit'
    },
    areaId: 'work-organization',
    description: 'Typ organizacji'
  },
  {
    segmentId: 'work-format',
    emoji: '🏢',
    code: 'WF',
    valueMap: {
      'Stacjonarny': 'S',
      'Zdalny': 'Z',
      'Hybrydowy (określony)': 'HO',
      'Hybrydowy (elastyczny)': 'HE'
    },
    reverseValueMap: {
      'S': 'Stacjonarny',
      'Z': 'Zdalny',
      'HO': 'Hybrydowy (określony)',
      'HE': 'Hybrydowy (elastyczny)'
    },
    areaId: 'work-organization',
    description: 'Format pracy'
  },
  {
    segmentId: 'workplace',
    emoji: '🏢',
    code: 'WP',
    areaId: 'work-organization',
    description: 'Miejsce pracy'
  },
  {
    segmentId: 'officeType',
    emoji: '🏢',
    code: 'OT',
    areaId: 'work-organization',
    description: 'Typ biura'
  },
  {
    segmentId: 'culture',
    emoji: '🏢',
    code: 'CU',
    scaleType: 'C',
    areaId: 'work-organization',
    description: 'Kultura organizacyjna'
  },
  
  // Lokalizacja i Mobilność
  {
    segmentId: 'location',
    emoji: '📍',
    code: 'LOC',
    areaId: 'location-mobility',
    description: 'Lokalizacja'
  },
  {
    segmentId: 'mobility',
    emoji: '📍',
    code: 'MOB',
    scaleType: 'F',
    areaId: 'location-mobility',
    description: 'Mobilność'
  },
  {
    segmentId: 'locationMobility',
    emoji: '📍',
    code: 'LM',
    scaleType: 'F',
    areaId: 'location-mobility',
    description: 'Elastyczność lokalizacyjna'
  },
  
  // Współpraca i Relacje
  {
    segmentId: 'teamSize',
    emoji: '👥',
    code: 'TS',
    areaId: 'collaboration-relations',
    description: 'Wielkość zespołu'
  },
  {
    segmentId: 'team-work-style',
    emoji: '👥',
    code: 'TWS',
    valueMap: {
      'LoneWolf': 'LW',
      'TeamAnt': 'TA',
      'LeaderLion': 'LL',
      'SocialWhale': 'SW'
    },
    reverseValueMap: {
      'LW': 'LoneWolf',
      'TA': 'TeamAnt',
      'LL': 'LeaderLion',
      'SW': 'SocialWhale'
    },
    areaId: 'collaboration-relations',
    description: 'Styl pracy zespołowej'
  },
  {
    segmentId: 'motivation-system',
    emoji: '👥',
    code: 'MS',
    valueMap: {
      'Competitive': 'CO',
      'Collaborative': 'CL',
      'GoalSetter': 'GS'
    },
    reverseValueMap: {
      'CO': 'Competitive',
      'CL': 'Collaborative',
      'GS': 'GoalSetter'
    },
    areaId: 'collaboration-relations',
    description: 'System motywacyjny'
  },
  {
    segmentId: 'communicationStyle',
    emoji: '👥',
    code: 'CS',
    areaId: 'collaboration-relations',
    description: 'Styl komunikacji'
  },
  {
    segmentId: 'availability',
    emoji: '👥',
    code: 'AV',
    scaleType: 'A',
    areaId: 'collaboration-relations',
    description: 'Dostępność'
  },
  
  // Czas i Dostępność
  {
    segmentId: 'workHours',
    emoji: '⏰',
    code: 'WH',
    formatTemplate: '{value}h',
    areaId: 'time-availability',
    description: 'Godziny pracy'
  },
  {
    segmentId: 'workSchedule',
    emoji: '⏰',
    code: 'WS',
    areaId: 'time-availability',
    description: 'Harmonogram pracy'
  },
  {
    segmentId: 'workPace',
    emoji: '⏰',
    code: 'WP',
    areaId: 'time-availability',
    description: 'Tempo pracy'
  },
  
  // Proces i Metodologia
  {
    segmentId: 'learningStyle',
    emoji: '🧠',
    code: 'LS',
    areaId: 'process-methodology',
    description: 'Styl uczenia się'
  },
  {
    segmentId: 'problemSolving',
    emoji: '🧠',
    code: 'PS',
    areaId: 'process-methodology',
    description: 'Rozwiązywanie problemów'
  },
  {
    segmentId: 'decisionMaking',
    emoji: '🧠',
    code: 'DM',
    areaId: 'process-methodology',
    description: 'Podejmowanie decyzji'
  },
  
  // Komunikacja i Decyzje
  {
    segmentId: 'feedbackStyle',
    emoji: '💬',
    code: 'FS',
    areaId: 'communication-decisions',
    description: 'Styl feedbacku'
  },
  {
    segmentId: 'asyncPreference',
    emoji: '💬',
    code: 'AP',
    areaId: 'communication-decisions',
    description: 'Preferencje asynchroniczne'
  },
  
  // Rozwój i Adaptacja
  {
    segmentId: 'stressManagement',
    emoji: '🔄',
    code: 'SM',
    areaId: 'development-adaptation',
    description: 'Zarządzanie stresem'
  },
  
  // Preferencje Technologiczne
  {
    segmentId: 'innovationLevel',
    emoji: '💡',
    code: 'IL',
    areaId: 'technology-preferences',
    description: 'Poziom innowacyjności'
  },
  {
    segmentId: 'projectPreference',
    emoji: '💡',
    code: 'PP',
    areaId: 'technology-preferences',
    description: 'Preferencje projektowe'
  },
  {
    segmentId: 'synergy',
    emoji: '💡',
    code: 'SY',
    scaleType: 'S',
    areaId: 'technology-preferences',
    description: 'Synergia'
  },
  
  // Styl Pracy i Preferencje
  {
    segmentId: 'system',
    emoji: '💻',
    code: 'SYS',
    areaId: 'work-style-preferences',
    description: 'System operacyjny'
  },
  {
    segmentId: 'musicPreference',
    emoji: '🎶',
    code: 'MP',
    areaId: 'work-style-preferences',
    description: 'Preferencje muzyczne'
  },
  {
    segmentId: 'dressCode',
    emoji: '👔',
    code: 'DC',
    areaId: 'work-style-preferences',
    description: 'Dress code'
  },
  
  // Inne
  {
    segmentId: 'homePreference',
    emoji: '🏠',
    code: 'HP',
    scaleType: 'F',
    areaId: 'location-mobility',
    description: 'Preferencje domowe'
  }
]

// Funkcja do generowania kodu segmentu na podstawie jego ID
function generateSegmentCode(segmentId: string, existingCodes: Set<string>): string {
  // Usuń myślniki i podziel na słowa
  const words = segmentId.split('-')
  
  // Jeśli segment ma tylko jedno słowo
  if (words.length === 1) {
    // Weź pierwsze 3 litery (lub mniej, jeśli słowo jest krótsze)
    let code = words[0].substring(0, Math.min(3, words[0].length)).toUpperCase()
    
    // Jeśli kod już istnieje, dodaj liczbę na końcu
    let counter = 1
    let originalCode = code
    while (existingCodes.has(code)) {
      code = `${originalCode}${counter}`
      counter++
    }
    
    return code
  }
  
  // Dla segmentów z wieloma słowami, weź pierwsze litery każdego słowa
  let code = words.map(word => word.charAt(0).toUpperCase()).join('')
  
  // Jeśli kod już istnieje, dodaj liczbę na końcu
  let counter = 1
  let originalCode = code
  while (existingCodes.has(code)) {
    code = `${originalCode}${counter}`
    counter++
  }
  
  return code
}

// Funkcja do automatycznego generowania mapowań dla brakujących segmentów
export function ensureAllSegmentsMapped(): DNACodeMapping[] {
  const allSegments = getAllSegments()
  const existingMappings = new Map(dnaCodeMappings.map(m => [m.segmentId, m]))
  const existingCodes = new Set(dnaCodeMappings.map(m => m.code))
  const dynamicMappings: DNACodeMapping[] = []
  
  console.log(`Total segments: ${allSegments.length}, already mapped: ${existingMappings.size}`)
  
  // Dla każdego segmentu, który nie ma mapowania
  allSegments.forEach(segment => {
    if (!existingMappings.has(segment.id)) {
      // Określ obszar segmentu
      const areaId = segment.areaId
      
      // Określ emoji na podstawie obszaru
      const categoryInfo = dnaCategories.find(c => c.id === areaId)
      const emoji = categoryInfo?.emoji || '🔹'
      
      // Wygeneruj kod segmentu
      const code = generateSegmentCode(segment.id, existingCodes)
      existingCodes.add(code) // Dodaj kod do istniejących, aby zapewnić unikalność
      
      // Utwórz mapowanie dla segmentu
      const mapping: DNACodeMapping = {
        segmentId: segment.id,
        emoji,
        code,
        areaId,
        description: segment.name
      }
      
      // Jeśli segment ma opcje, dodaj mapowanie wartości
      if (segment.options && segment.options.length > 0) {
        const valueMap: Record<string, string> = {}
        const reverseValueMap: Record<string, string> = {}
        
        segment.options.forEach((option, index) => {
          // Dla każdej opcji, generuj unikalny kod
          let optionCode: string
          
          if (option.value.length <= 2) {
            // Dla krótkich wartości, użyj ich bezpośrednio
            optionCode = option.value.toUpperCase()
          } else if (option.value.includes(' ')) {
            // Dla wartości z wieloma słowami, użyj pierwszych liter
            optionCode = option.value.split(' ')
              .map(word => word.charAt(0).toUpperCase())
              .slice(0, 2)
              .join('')
          } else {
            // Dla pojedynczych słów, użyj pierwszych 2 liter
            optionCode = option.value.substring(0, 2).toUpperCase()
          }
          
          // Jeśli kod opcji już istnieje, dodaj indeks
          if (Object.values(valueMap).includes(optionCode)) {
            optionCode = `${optionCode}${index + 1}`
          }
          
          valueMap[option.value] = optionCode
          reverseValueMap[optionCode] = option.value
        })
        
        mapping.valueMap = valueMap
        mapping.reverseValueMap = reverseValueMap
      }
      
      // Dodaj mapowanie do listy dynamicznych mapowań
      dynamicMappings.push(mapping)
    }
  })
  
  console.log(`Dynamically mapped ${dynamicMappings.length} segments`)
  
  // Połącz statyczne i dynamiczne mapowania
  return [...dnaCodeMappings, ...dynamicMappings]
}

// Funkcja do dekodowania kodu DNA
export function decodeDNAValue(code: string, value: string): string {
  // Upewnij się, że wszystkie segmenty mają mapowania
  const allMappings = ensureAllSegmentsMapped()
  
  // Znajdź mapowanie dla kodu
  const mapping = allMappings.find(m => m.code === code)
  if (!mapping) return value
  
  // Jeśli istnieje odwrotne mapowanie wartości, użyj go
  if (mapping.reverseValueMap && mapping.reverseValueMap[value]) {
    return mapping.reverseValueMap[value]
  }
  
  // Jeśli istnieje typ skali, zdekoduj go
  if (mapping.scaleType && value.startsWith(mapping.scaleType)) {
    const scaleValue = value.substring(1)
    
    switch (mapping.scaleType) {
      case 'P':
        return `${scaleValue}%`
      case 'T':
        return `${scaleValue}/5`
      case 'F':
        return `Elastyczność: ${scaleValue}/5`
      case 'C':
        return `Kultura typu ${scaleValue}`
      case 'A':
        return `Dostępność: ${scaleValue}/5`
      case 'S':
        return `Synergia: ${scaleValue}/5`
      default:
        return value
    }
  }
  
  // W przeciwnym razie zwróć oryginalną wartość
  return value
}

// Funkcja pomocnicza do pobierania mapowania DNA dla segmentu
export function getDNAMappingForSegment(segmentId: string): DNACodeMapping | undefined {
  // Najpierw sprawdź w statycznych mapowaniach
  const staticMapping = dnaCodeMappings.find(mapping => mapping.segmentId === segmentId)
  if (staticMapping) return staticMapping
  
  // Jeśli nie znaleziono, wygeneruj dynamiczne mapowanie
  const allSegments = getAllSegments()
  const segment = allSegments.find(s => s.id === segmentId)
  
  if (!segment) return undefined
  
  // Określ obszar segmentu
  const areaId = segment.areaId
  
  // Określ emoji na podstawie obszaru
  const categoryInfo = dnaCategories.find(c => c.id === areaId)
  const emoji = categoryInfo?.emoji || '🔹'
  
  // Wygeneruj kod segmentu
  const code = generateSegmentCode(segment.id, new Set())
  
  // Utwórz mapowanie dla segmentu
  const mapping: DNACodeMapping = {
    segmentId: segment.id,
    emoji,
    code,
    areaId,
    description: segment.name
  }
  
  return mapping
}

// Funkcja pomocnicza do pobierania kodu DNA dla wartości segmentu
export function getDNACodeForValue(segmentId: string, value: string | number): string {
  const mapping = getDNAMappingForSegment(segmentId)
  if (!mapping) return value.toString()
  
  // Jeśli wartość jest pusta lub undefined, zwróć pusty string
  if (value === undefined || value === null || value === '') return ''
  
  // Jeśli istnieje mapowanie wartości, użyj go
  if (mapping.valueMap && typeof value === 'string' && mapping.valueMap[value]) {
    return mapping.valueMap[value]
  }
  
  // Jeśli istnieje typ skali, użyj go
  if (mapping.scaleType && typeof value === 'number') {
    return `${mapping.scaleType}${value}`
  }
  
  // Jeśli istnieje szablon formatowania, użyj go
  if (mapping.formatTemplate) {
    return mapping.formatTemplate.replace('{value}', value.toString())
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

// Funkcja do grupowania segmentów według obszarów
export function groupSegmentsByArea(
  activeSegments: { id: string, segmentId: string, value: string, visible: boolean, order?: number }[]
): Record<string, { segmentId: string, value: string | number }[]> {
  const result: Record<string, { segmentId: string, value: string | number }[]> = {}
  
  // Inicjalizuj kategorie
  dnaCategories.forEach(category => {
    result[category.id] = []
  })
  
  console.log(`Grouping ${activeSegments.length} active segments`)
  let skippedSegments = 0
  
  // Grupuj aktywne segmenty według obszarów
  activeSegments.filter(s => s.visible).forEach(segment => {
    const mapping = getDNAMappingForSegment(segment.segmentId)
    if (!mapping) {
      console.log(`No mapping found for segment: ${segment.segmentId}`)
      skippedSegments++
      return
    }
    
    const areaId = mapping.areaId
    if (!result[areaId]) result[areaId] = []
    
    result[areaId].push({
      segmentId: segment.segmentId,
      value: segment.value
    })
  })
  
  console.log(`Skipped ${skippedSegments} segments due to missing mappings`)
  
  return result
}

// Funkcja do parsowania kodu DNA
export interface ParsedDNASegment {
  area: string
  areaName: string
  emoji: string
  codes: {
    code: string
    value: string
    decodedValue: string
    description: string
  }[]
}

export function parseDNACode(dnaCode: string): ParsedDNASegment[] {
  if (!dnaCode) return []
  
  // Upewnij się, że wszystkie segmenty mają mapowania
  const allMappings = ensureAllSegmentsMapped()
  
  const segments = dnaCode.split(' | ')
  const result: ParsedDNASegment[] = []
  
  segments.forEach(segment => {
    // Pierwszy znak to emoji obszaru
    const emoji = segment.charAt(0)
    const area = dnaCategories.find(c => c.emoji === emoji)
    
    if (!area) {
      console.log(`Nie znaleziono obszaru dla emoji: ${emoji}`)
      return
    }
    
    // Usuń emoji z początku segmentu
    const codesString = segment.substring(1)
    
    // Podziel string na części oddzielone kropkami
    const parts = codesString.split('.')
    const parsedCodes = []
    
    // Przetwarzaj pary kod-wartość
    for (let i = 0; i < parts.length; i += 2) {
      const code = parts[i]
      const value = parts[i + 1] || ''
      
      // Pomijaj puste kody lub wartości
      if (!code || code.trim() === '') continue
      
      // Znajdź mapowanie dla kodu
      const mapping = allMappings.find(m => m.code === code)
      
      if (mapping) {
        parsedCodes.push({
          code,
          value,
          decodedValue: decodeDNAValue(code, value),
          description: mapping.description || code
        })
      } else {
        console.log(`Nie znaleziono mapowania dla kodu: ${code}`)
        // Dodaj kod nawet jeśli nie ma mapowania, aby zachować wszystkie informacje
        parsedCodes.push({
          code,
          value,
          decodedValue: value,
          description: `Nieznany kod: ${code}`
        })
      }
    }
    
    result.push({
      area: area.id,
      areaName: area.name,
      emoji,
      codes: parsedCodes
    })
  })
  
  return result
}
