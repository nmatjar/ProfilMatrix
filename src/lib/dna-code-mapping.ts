import { Segment, SegmentOption } from './segment-types'
import { getAllSegments, getAllAreas } from './segment-service'

// Interfejs dla mapowania kodu DNA
export interface DNACodeMapping {
  segmentId: string
  emoji: string
  segmentEmoji?: string // Emoji specyficzne dla segmentu
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
    emoji: '🏠💻',
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
    emoji: '🌆🚶',
    code: 'WP',
    areaId: 'work-organization',
    description: 'Miejsce pracy'
  },
  {
    segmentId: 'officeType',
    emoji: '🪑📘',
    code: 'OT',
    areaId: 'work-organization',
    description: 'Typ biura'
  },
  {
    segmentId: 'culture',
    emoji: '🤝🌱',
    code: 'CU',
    scaleType: 'C',
    areaId: 'work-organization',
    description: 'Kultura organizacyjna'
  },
  
  // Lokalizacja i Mobilność
  {
    segmentId: 'location',
    emoji: '🌐📌',
    code: 'LOC',
    areaId: 'location-mobility',
    description: 'Lokalizacja'
  },
  {
    segmentId: 'mobility',
    emoji: '🚶‍♂️🌍',
    code: 'MOB',
    scaleType: 'F',
    areaId: 'location-mobility',
    description: 'Mobilność'
  },
  {
    segmentId: 'locationMobility',
    emoji: '🧭🔄',
    code: 'LM',
    scaleType: 'F',
    areaId: 'location-mobility',
    description: 'Elastyczność lokalizacyjna'
  },
  {
    segmentId: 'region',
    emoji: '🗺️🏙️',
    code: 'REG',
    areaId: 'location-mobility',
    description: 'Region'
  },
  {
    segmentId: 'transportMode',
    emoji: '🚗🚆',
    code: 'TM',
    areaId: 'location-mobility',
    description: 'Środek transportu'
  },
  
  // Współpraca i Relacje
  {
    segmentId: 'teamSize',
    emoji: '👨‍👩‍👧‍👦',
    code: 'TS',
    areaId: 'collaboration-relations',
    description: 'Wielkość zespołu'
  },
  {
    segmentId: 'team-work-style',
    emoji: '🧩👥',
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
    emoji: '🏆✨',
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
    emoji: '💬🗣️',
    code: 'CS',
    areaId: 'collaboration-relations',
    description: 'Styl komunikacji'
  },
  {
    segmentId: 'networking',
    emoji: '🔗👋',
    code: 'NW',
    areaId: 'collaboration-relations',
    description: 'Networking'
  },
  
  // Czas i Dostępność
  {
    segmentId: 'workHours',
    emoji: '⏱️📊',
    code: 'WH',
    formatTemplate: '{value}h',
    areaId: 'time-availability',
    description: 'Godziny pracy'
  },
  {
    segmentId: 'workSchedule',
    emoji: '📅⏰',
    code: 'WS',
    areaId: 'time-availability',
    description: 'Harmonogram pracy'
  },
  {
    segmentId: 'workPace',
    emoji: '⚡🏃',
    code: 'WP',
    areaId: 'time-availability',
    description: 'Tempo pracy'
  },
  {
    segmentId: 'breaks',
    emoji: '☕🧘',
    code: 'BR',
    areaId: 'time-availability',
    description: 'Przerwy'
  },
  {
    segmentId: 'availability',
    emoji: '📲👋',
    code: 'AV',
    areaId: 'time-availability',
    description: 'Dostępność'
  },
  
  // Proces i Metodologia
  {
    segmentId: 'learningStyle',
    emoji: '📚🧠',
    code: 'LS',
    areaId: 'process-methodology',
    description: 'Styl uczenia się'
  },
  {
    segmentId: 'problemSolving',
    emoji: '🔍🧩',
    code: 'PS',
    areaId: 'process-methodology',
    description: 'Rozwiązywanie problemów'
  },
  {
    segmentId: 'decisionMaking',
    emoji: '⚖️🤔',
    code: 'DM',
    areaId: 'process-methodology',
    description: 'Podejmowanie decyzji'
  },
  {
    segmentId: 'riskTaking',
    emoji: '🎲🚀',
    code: 'RT',
    areaId: 'process-methodology',
    description: 'Podejmowanie ryzyka'
  },
  {
    segmentId: 'adaptability',
    emoji: '🦎🔄',
    code: 'AD',
    areaId: 'process-methodology',
    description: 'Adaptacyjność'
  },
  {
    segmentId: 'workStructure',
    emoji: '📋📑',
    code: 'WS',
    areaId: 'process-methodology',
    description: 'Struktura pracy'
  },
  {
    segmentId: 'focusStyle',
    emoji: '🎯🔍',
    code: 'FS',
    areaId: 'process-methodology',
    description: 'Styl skupienia'
  },
  
  // Komunikacja i Decyzje
  {
    segmentId: 'feedbackStyle',
    emoji: '🔄📝',
    code: 'FS',
    areaId: 'communication-decisions',
    description: 'Styl feedbacku'
  },
  {
    segmentId: 'meetingPreference',
    emoji: '👋👥',
    code: 'MP',
    areaId: 'communication-decisions',
    description: 'Preferencje spotkań'
  },
  {
    segmentId: 'communicationChannel',
    emoji: '📱💻',
    code: 'CC',
    areaId: 'communication-decisions',
    description: 'Kanał komunikacji'
  },
  {
    segmentId: 'writtenCommunication',
    emoji: '✍️📄',
    code: 'WC',
    areaId: 'communication-decisions',
    description: 'Komunikacja pisemna'
  },
  {
    segmentId: 'discussionStyle',
    emoji: '🗣️👂',
    code: 'DS',
    areaId: 'communication-decisions',
    description: 'Styl dyskusji'
  },
  
  // Rozwój i Adaptacja
  {
    segmentId: 'careerTrajectory',
    emoji: '📈🚀',
    code: 'CT',
    areaId: 'development-adaptation',
    description: 'Trajektoria kariery'
  },
  {
    segmentId: 'innovationStyle',
    emoji: '💡🔍',
    code: 'IS',
    areaId: 'development-adaptation',
    description: 'Styl innowacji'
  },
  {
    segmentId: 'skillDevelopment',
    emoji: '🧠📚',
    code: 'SD',
    areaId: 'development-adaptation',
    description: 'Rozwój umiejętności'
  },
  {
    segmentId: 'changeReadiness',
    emoji: '🔀🌱',
    code: 'CR',
    areaId: 'development-adaptation',
    description: 'Gotowość na zmiany'
  },
  
  // Preferencje Technologiczne
  {
    segmentId: 'operatingSystem',
    emoji: '🖥️⚙️',
    code: 'OS',
    areaId: 'technology-preferences',
    description: 'System operacyjny'
  },
  {
    segmentId: 'devEnvironment',
    emoji: '🛠️👨‍💻',
    code: 'DE',
    areaId: 'technology-preferences',
    description: 'Środowisko deweloperskie'
  },
  {
    segmentId: 'frontendFramework',
    emoji: '🎨🖌️',
    code: 'FF',
    areaId: 'technology-preferences',
    description: 'Frontend Framework'
  },
  {
    segmentId: 'backendTech',
    emoji: '⚙️🔧',
    code: 'BT',
    areaId: 'technology-preferences',
    description: 'Technologia backendowa'
  },
  {
    segmentId: 'cloudProvider',
    emoji: '☁️🗄️',
    code: 'CP',
    areaId: 'technology-preferences',
    description: 'Dostawca chmury'
  },
  {
    segmentId: 'database',
    emoji: '🗄️💾',
    code: 'DB',
    areaId: 'technology-preferences',
    description: 'Baza danych'
  },
  {
    segmentId: 'programmingLanguage',
    emoji: '📝⌨️',
    code: 'PL',
    areaId: 'technology-preferences',
    description: 'Język programowania'
  },
  {
    segmentId: 'projectPreference',
    emoji: '📊📑',
    code: 'PP',
    areaId: 'technology-preferences',
    description: 'Preferencje projektowe'
  },
  
  // Styl Pracy i Preferencje
  {
    segmentId: 'energyManagement',
    emoji: '🔋⚡',
    code: 'EM',
    areaId: 'work-style-preferences',
    description: 'Zarządzanie energią'
  },
  {
    segmentId: 'soundPreference',
    emoji: '🔊🎧',
    code: 'SP',
    areaId: 'work-style-preferences',
    description: 'Preferencje dźwiękowe'
  },
  {
    segmentId: 'dresscode',
    emoji: '👔👚',
    code: 'DC',
    areaId: 'work-style-preferences',
    description: 'Dress code'
  },
  {
    segmentId: 'workspaceSetup',
    emoji: '🪴🖥️',
    code: 'WS',
    areaId: 'work-style-preferences',
    description: 'Ustawienie przestrzeni roboczej'
  },
  {
    segmentId: 'timeOfDay',
    emoji: '🌓⏰',
    code: 'TD',
    areaId: 'work-style-preferences',
    description: 'Pora dnia'
  },
  {
    segmentId: 'autonomyNeed',
    emoji: '🦅🛩️',
    code: 'AN',
    areaId: 'work-style-preferences',
    description: 'Potrzeba autonomii'
  }
]

// Ustaw segmentEmoji dla wszystkich segmentów, jeśli nie jest już ustawione
export function ensureSegmentEmojis(): DNACodeMapping[] {
  // Najpierw wywołaj funkcję aktualizującą emoji
  const mappings = updateSegmentEmojis()
  
  // Dla każdego mappingu, który nie ma segmentEmoji, użyj emoji
  mappings.forEach(mapping => {
    if (!mapping.segmentEmoji) {
      mapping.segmentEmoji = mapping.emoji || '🔹'
    }
  })
  
  return mappings
}

// Aktualizacja segmentEmoji dla wszystkich segmentów
function updateSegmentEmojis() {
  // Funkcja pomocnicza do bezpiecznego ustawiania emoji
  const safeSetEmoji = (segmentId: string, emoji: string) => {
    const mapping = dnaCodeMappings.find(m => m.segmentId === segmentId)
    if (mapping) {
      mapping.segmentEmoji = emoji
    } else {
      console.warn(`Mapping not found for segment: ${segmentId}`)
    }
  }
  
  // Praca i Organizacja
  safeSetEmoji('organization-type', '🏢🔍')
  safeSetEmoji('teamSize', '👥📊')
  safeSetEmoji('communicationStyle', '🗣️📝')
  safeSetEmoji('workplace', '🏢🏠')
  
  // Czas i Dostępność
  safeSetEmoji('work-schedule', '📆🔄')
  safeSetEmoji('work-hours', '⏰📈')
  safeSetEmoji('availability', '📱💬')
  
  // Proces i Metodologia
  safeSetEmoji('work-approach', '🧠💡')
  safeSetEmoji('decision-making', '⚖️🤔')
  safeSetEmoji('work-style', '🖊️📝')
  safeSetEmoji('adaptability', '🔄🌱')
  
  // Komunikacja i Decyzje
  safeSetEmoji('communication-frequency', '💬📈')
  safeSetEmoji('preferred-communication', '📱💻')
  safeSetEmoji('feedback-style', '🔄💭')
  
  // Rozwój i Adaptacja
  safeSetEmoji('learning-style', '📚🧠')
  safeSetEmoji('adaptability-speed', '⚡🔄')
  safeSetEmoji('improvement-focus', '🔍📈')
  safeSetEmoji('creativity-level', '💡🎨')
  
  // Technologia
  safeSetEmoji('tech-stack', '💻⚙️')
  safeSetEmoji('database', '🗄️📊')
  safeSetEmoji('hosting', '☁️🖥️')
  
  // Styl Pracy
  safeSetEmoji('work-intensity', '⚡💪')
  safeSetEmoji('break-style', '☕⏱️')
  safeSetEmoji('energy-management', '🔋⚡')
  safeSetEmoji('focus-environment', '🧘‍♂️🔇')
  
  return dnaCodeMappings
}

// Wywołaj funkcję, aby zaktualizować emoji
updateSegmentEmojis()

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
  // Pobierz wszystkie segmenty z systemu
  const allSegments = getAllSegments()
  
  // Pobierz wszystkie obszary
  const allAreas = getAllAreas()
  
  // Utwórz zbiór istniejących ID segmentów w mapowaniach
  const existingSegmentIds = new Set(dnaCodeMappings.map(m => m.segmentId))
  
  // Zbiór istniejących kodów
  const existingCodes = new Set(dnaCodeMappings.map(m => m.code))
  
  // Dodaj mapowania dla brakujących segmentów
  for (const segment of allSegments) {
    if (!existingSegmentIds.has(segment.id)) {
      // Określ obszar segmentu
      const areaId = segment.areaId
      
      // Określ emoji na podstawie obszaru
      const categoryInfo = dnaCategories.find(c => c.id === areaId)
      const emoji = categoryInfo?.emoji || '🔹'
      
      // Wygeneruj kod segmentu
      const code = generateSegmentCode(segment.id, existingCodes)
      
      // Dodaj kod do zbioru istniejących kodów
      existingCodes.add(code)
      
      // Dodaj podwójne emoji dla segmentu
      const segmentEmoji = `${emoji}${generateUniqueEmojiForSegment(segment.id)}`
      
      // Utwórz mapowanie dla segmentu
      const mapping: DNACodeMapping = {
        segmentId: segment.id,
        code,
        emoji,
        segmentEmoji,
        areaId,
        description: segment.name
      }
      
      // Dodaj mapowanie do listy
      dnaCodeMappings.push(mapping)
      
      console.log(`Added mapping for segment: ${segment.id} with emoji ${segmentEmoji}`)
    }
  }
  
  // Zaktualizuj emoji dla wszystkich segmentów
  return updateSegmentEmojis()
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
  if (staticMapping) {
    // Jeśli nie ma segmentEmoji, wygeneruj je
    if (!staticMapping.segmentEmoji) {
      staticMapping.segmentEmoji = `${staticMapping.emoji}${generateUniqueEmojiForSegment(segmentId)}`
    }
    return staticMapping
  }
  
  // Jeśli nie znaleziono, wygeneruj dynamiczne mapowanie
  const allSegments = getAllSegments()
  const segment = allSegments.find(s => s.id === segmentId)
  
  if (!segment) return undefined
  
  // Określ obszar segmentu
  const areaId = segment.areaId
  
  // Określ emoji na podstawie obszaru
  const categoryInfo = dnaCategories.find(c => c.id === areaId)
  const emoji = categoryInfo?.emoji || '🔹'
  
  // Dodaj podwójne emoji dla segmentu
  const segmentEmoji = `${emoji}${generateUniqueEmojiForSegment(segmentId)}`
  
  // Wygeneruj kod segmentu
  const code = generateSegmentCode(segment.id, new Set())
  
  // Utwórz mapowanie dla segmentu
  const mapping: DNACodeMapping = {
    segmentId: segment.id,
    code,
    emoji,
    segmentEmoji,
    areaId,
    description: segment.name
  }
  
  return mapping
}

function generateUniqueEmojiForSegment(segmentId: string): string {
  // Tablica różnych emoji do użycia jako drugiego emoji
  const emojiOptions = ['💡', '📝', '🔧', '📊', '🔍', '📈', '⚙️', '🧩', '🔄', '📱', '💻', '📚', '🔔', '📢']
  
  // Wybierz emoji na podstawie segmentId - używaj deterministycznego wyboru
  const charSum = segmentId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const selectedEmoji = emojiOptions[charSum % emojiOptions.length]
  
  return selectedEmoji
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
    segmentEmoji?: string
  }[]
}

export function parseDNACode(dnaCode: string): ParsedDNASegment[] {
  if (!dnaCode) return []
  
  // Upewnij się, że wszystkie segmenty mają mapowania
  const allMappings = ensureAllSegmentsMapped()
  
  // W nowym formacie obszary są oddzielone przez '▪'
  const segments = dnaCode.split(' ▪ ')
  const result: ParsedDNASegment[] = []
  
  segments.forEach(segment => {
    try {
      // Wyciągnij emoji obszaru z [emoji]
      const areaEmojiMatch = segment.match(/\[(.*?)\]/)
      if (!areaEmojiMatch) {
        console.log('Nie znaleziono emoji obszaru w segmencie:', segment)
        return
      }
      
      const areaEmoji = areaEmojiMatch[1]
      const area = dnaCategories.find(c => c.emoji === areaEmoji)
      
      if (!area) {
        console.log(`Nie znaleziono obszaru dla emoji: ${areaEmoji}`)
        return
      }
      
      // Wyciągnij zawartość między nawiasami klamrowymi {emoji=value;emoji=value}
      const contentMatch = segment.match(/\{(.*?)\}/)
      if (!contentMatch) {
        console.log('Nie znaleziono treści segmentu w segmencie:', segment)
        return
      }
      
      const contentParts = contentMatch[1].split(';')
      const parsedCodes = []
      
      // Przetwarzaj pary emoji=wartość
      for (const part of contentParts) {
        const [segmentEmoji, value] = part.split('=')
        
        if (!segmentEmoji || !value) {
          console.log('Nieprawidłowy format pary emoji=wartość:', part)
          continue
        }
        
        // Znajdź mapowanie dla emoji segmentu - sprawdź segmentEmoji lub emoji
        console.log('Looking for mapping for segment emoji:', segmentEmoji)
        const mapping = allMappings.find(m => m.segmentEmoji === segmentEmoji || m.emoji === segmentEmoji)
        if (mapping) {
          console.log('Found mapping:', mapping.segmentId, 'with emoji:', mapping.emoji, 'and segmentEmoji:', mapping.segmentEmoji)
        }
        
        if (mapping) {
          parsedCodes.push({
            code: mapping.code,
            value,
            decodedValue: decodeDNAValue(mapping.code, value),
            description: mapping.description || mapping.code,
            segmentEmoji
          })
        } else {
          console.log(`Nie znaleziono mapowania dla emoji segmentu: ${segmentEmoji}`)
          // Dodaj kod nawet jeśli nie ma mapowania, aby zachować wszystkie informacje
          parsedCodes.push({
            code: '???',
            value,
            decodedValue: value,
            description: `Nieznany segment: ${segmentEmoji}`,
            segmentEmoji
          })
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
      console.error('Błąd podczas parsowania segmentu:', segment, error)
    }
  })
  
  return result
}

// Funkcja do pobierania kodu DNA dla wartości segmentu
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
