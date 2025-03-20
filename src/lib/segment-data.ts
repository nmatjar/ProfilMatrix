import { Area, Segment, SubOption } from './segment-types'

// Obszary (Areas)
export const areas: Area[] = [
  { 
    id: 'work-organization', 
    name: 'Praca i Organizacja', 
    iconName: 'Briefcase',
    emoji: '💼',
    description: 'Środowisko, kultura i struktura organizacyjna'
  },
  { 
    id: 'location-mobility', 
    name: 'Lokalizacja i Mobilność', 
    iconName: 'MapPin',
    emoji: '📍',
    description: 'Miejsce pracy i elastyczność lokalizacyjna'
  },
  { 
    id: 'collaboration-relations', 
    name: 'Współpraca i Relacje', 
    iconName: 'Users',
    emoji: '👥',
    description: 'Dynamika zespołu i interakcje'
  },
  { 
    id: 'time-availability', 
    name: 'Czas i Dostępność', 
    iconName: 'Clock',
    emoji: '⏰',
    description: 'Harmonogram i organizacja czasu'
  },
  { 
    id: 'process-methodology', 
    name: 'Proces i Metodologia', 
    iconName: 'Activity',
    emoji: '🧠',
    description: 'Podejście do zadań i procesów'
  },
  { 
    id: 'communication-decisions', 
    name: 'Komunikacja i Decyzje', 
    iconName: 'MessageSquare',
    emoji: '💬',
    description: 'Style komunikacji i podejmowania decyzji'
  },
  { 
    id: 'development-adaptation', 
    name: 'Rozwój i Adaptacja', 
    iconName: 'RefreshCw',
    emoji: '🔄',
    description: 'Uczenie się i zarządzanie zmianą'
  }
]

// Segmenty dla obszaru Praca i Organizacja
const workOrganizationSegments: Segment[] = [
  {
    id: 'organization-type',
    name: 'Typ Organizacji',
    iconName: 'Building',
    emoji: '🏢',
    type: 'toggle',
    options: [
      { id: 'corporate', label: '🏢 Korporacja', value: 'Korporacja' },
      { id: 'startup', label: '🚀 Startup/Scaleup', value: 'Startup/Scaleup' },
      { id: 'public-institution', label: '🏫 Instytucja publiczna', value: 'Instytucja publiczna' },
      { id: 'education', label: '🎓 Uczelnia/Edukacja', value: 'Uczelnia/Edukacja' },
      { id: 'ngo', label: '🤝 NGO/Non-profit', value: 'NGO/Non-profit' }
    ],
    areaId: 'work-organization',
    description: 'Typ organizacji, w której preferujesz pracować'
  },
  {
    id: 'work-format',
    name: 'Format Pracy',
    iconName: 'Layout',
    emoji: '🏢',
    type: 'toggle',
    options: [
      { id: 'stationary', label: '🏢 Stacjonarny (100%)', value: 'Stacjonarny' },
      { id: 'remote', label: '🏠 Zdalny (100%)', value: 'Zdalny' },
      { id: 'hybrid-fixed', label: '🔄 Hybrydowy (określony)', value: 'Hybrydowy (określony)' },
      { id: 'hybrid-flexible', label: '🌊 Hybrydowy (elastyczny)', value: 'Hybrydowy (elastyczny)' }
    ],
    subOptions: [
      { id: 'hybrid-1-4', label: '1 dzień zdalnie / 4 dni w biurze', value: '1z/4b', parentOptionId: 'hybrid-fixed' },
      { id: 'hybrid-2-3', label: '2 dni zdalnie / 3 dni w biurze', value: '2z/3b', parentOptionId: 'hybrid-fixed' },
      { id: 'hybrid-3-2', label: '3 dni zdalnie / 2 dni w biurze', value: '3z/2b', parentOptionId: 'hybrid-fixed' },
      { id: 'hybrid-4-1', label: '4 dni zdalnie / 1 dzień w biurze', value: '4z/1b', parentOptionId: 'hybrid-fixed' }
    ],
    areaId: 'work-organization',
    description: 'Preferowany format pracy (stacjonarny, zdalny, hybrydowy)'
  },
  {
    id: 'organizational-culture',
    name: 'Kultura Organizacyjna',
    iconName: 'Users',
    emoji: '👔',
    type: 'toggle',
    options: [
      { id: 'formal', label: '👔 Formalna/Hierarchiczna', value: 'Formalna/Hierarchiczna' },
      { id: 'moderate', label: '👕 Umiarkowana/Zbalansowana', value: 'Umiarkowana/Zbalansowana' },
      { id: 'flexible', label: '👚 Elastyczna/Płaska', value: 'Elastyczna/Płaska' },
      { id: 'creative', label: '🎨 Kreatywna/Swobodna', value: 'Kreatywna/Swobodna' }
    ],
    areaId: 'work-organization',
    description: 'Preferowana kultura organizacyjna w miejscu pracy'
  },
  {
    id: 'office-space',
    name: 'Przestrzeń Biurowa',
    iconName: 'Home',
    emoji: '🏟️',
    type: 'toggle',
    options: [
      { id: 'open-space', label: '🏟️ Open Space', value: 'Open Space' },
      { id: 'closed-office', label: '🚪 Biuro zamknięte', value: 'Biuro zamknięte' },
      { id: 'flexible-space', label: '🏠 Flexible Space', value: 'Flexible Space' },
      { id: 'hot-desking', label: '🛋️ Hot-desking', value: 'Hot-desking' }
    ],
    areaId: 'work-organization',
    description: 'Preferowana przestrzeń biurowa'
  },
  {
    id: 'dress-code',
    name: 'Dress Code',
    iconName: 'Shirt',
    emoji: '👔',
    type: 'toggle',
    options: [
      { id: 'formal', label: '👔 Formalny (garnitur/kostium)', value: 'Formalny' },
      { id: 'business-casual', label: '👕 Business Casual', value: 'Business Casual' },
      { id: 'smart-casual', label: '👚 Smart Casual', value: 'Smart Casual' },
      { id: 'casual', label: '😎 Casual', value: 'Casual' }
    ],
    areaId: 'work-organization',
    description: 'Preferowany dress code w miejscu pracy'
  }
]

// Segmenty dla obszaru Lokalizacja i Mobilność
const locationMobilitySegments: Segment[] = [
  {
    id: 'geographic-location',
    name: 'Lokalizacja Geograficzna',
    iconName: 'Globe',
    emoji: '🌍',
    type: 'input',
    areaId: 'location-mobility',
    description: 'Preferowana lokalizacja geograficzna pracy'
  },
  {
    id: 'mobility-level',
    name: 'Poziom Mobilności',
    iconName: 'Move',
    emoji: 'M',
    type: 'toggle',
    options: [
      { id: 'm1', label: 'M1 (Stała lokalizacja)', value: 'M1' },
      { id: 'm2', label: 'M2 (Ograniczona mobilność)', value: 'M2' },
      { id: 'm3', label: 'M3 (Regularna mobilność)', value: 'M3' },
      { id: 'm4', label: 'M4 (Pełna mobilność)', value: 'M4' },
      { id: 'm5', label: 'M5 (Nomadyzm cyfrowy)', value: 'M5' }
    ],
    areaId: 'location-mobility',
    description: 'Preferowany poziom mobilności w pracy'
  },
  {
    id: 'business-travel',
    name: 'Podróże Służbowe',
    iconName: 'Plane',
    emoji: 'T',
    type: 'toggle',
    options: [
      { id: 't0', label: 'T0 (Brak)', value: 'T0' },
      { id: 't1', label: 'T1 (Sporadyczne)', value: 'T1' },
      { id: 't2', label: 'T2 (Regularne, krajowe)', value: 'T2' },
      { id: 't3', label: 'T3 (Regularne, międzynarodowe)', value: 'T3' },
      { id: 't4', label: 'T4 (Częste, globalne)', value: 'T4' }
    ],
    areaId: 'location-mobility',
    description: 'Preferowana częstotliwość podróży służbowych'
  }
]

// Segmenty dla obszaru Współpraca i Relacje
const collaborationRelationsSegments: Segment[] = [
  {
    id: 'team-structure',
    name: 'Struktura Zespołu',
    iconName: 'Users',
    emoji: '👤',
    type: 'toggle',
    options: [
      { id: 'solo', label: '👤 Solo (praca indywidualna)', value: 'Solo' },
      { id: 'small-team', label: '👥 Mały zespół (2-5 osób)', value: 'Mały zespół' },
      { id: 'medium-team', label: '👨‍👩‍👧‍👦 Średni zespół (6-15 osób)', value: 'Średni zespół' },
      { id: 'large-team', label: '🏢 Duży zespół (16+ osób)', value: 'Duży zespół' }
    ],
    areaId: 'collaboration-relations',
    description: 'Preferowana wielkość zespołu'
  },
  {
    id: 'team-role',
    name: 'Rola w Zespole',
    iconName: 'UserCheck',
    emoji: '🚩',
    type: 'toggle',
    options: [
      { id: 'leader', label: '🚩 Lider/Manager', value: 'Lider/Manager' },
      { id: 'expert', label: '🛠️ Indywidualny Ekspert', value: 'Indywidualny Ekspert' },
      { id: 'team-member', label: '🔄 Współpracownik Zespołowy', value: 'Współpracownik Zespołowy' },
      { id: 'analyst', label: '🔍 Analityk/Obserwator', value: 'Analityk/Obserwator' }
    ],
    areaId: 'collaboration-relations',
    description: 'Preferowana rola w zespole'
  },
  {
    id: 'collaboration-dynamics',
    name: 'Dynamika Współpracy',
    iconName: 'UsersPlus',
    emoji: '🤝',
    type: 'toggle',
    options: [
      { id: 'high-interdependence', label: '🤝 Wysoka współzależność', value: 'Wysoka współzależność' },
      { id: 'balanced', label: '🔄 Zbalansowana współpraca', value: 'Zbalansowana współpraca' },
      { id: 'independence', label: '🚶 Samodzielność z konsultacjami', value: 'Samodzielność z konsultacjami' },
      { id: 'high-autonomy', label: '🏝️ Wysoka autonomia', value: 'Wysoka autonomia' }
    ],
    areaId: 'collaboration-relations',
    description: 'Preferowana dynamika współpracy w zespole'
  }
]

// Segmenty dla obszaru Czas i Dostępność
const timeAvailabilitySegments: Segment[] = [
  {
    id: 'working-hours',
    name: 'Godziny Pracy',
    iconName: 'Clock',
    emoji: '⏰',
    type: 'toggle',
    options: [
      { id: 'standard', label: '⏰ Standardowe (np. 9-17)', value: 'Standardowe' },
      { id: 'early', label: '🌅 Wczesne (np. 6-14)', value: 'Wczesne' },
      { id: 'late', label: '🌇 Późne (np. 12-20)', value: 'Późne' },
      { id: 'flexible', label: '🔄 Elastyczne (w ramach core hours)', value: 'Elastyczne' },
      { id: 'shift', label: '🌙 Zmianowe', value: 'Zmianowe' }
    ],
    areaId: 'time-availability',
    description: 'Preferowane godziny pracy'
  },
  {
    id: 'availability-level',
    name: 'Poziom Dostępności',
    iconName: 'Bell',
    emoji: 'A',
    type: 'toggle',
    options: [
      { id: 'a1', label: 'A1 (Minimalna - tylko zaplanowane spotkania)', value: 'A1' },
      { id: 'a2', label: 'A2 (Niska - określone godziny kontaktu)', value: 'A2' },
      { id: 'a3', label: 'A3 (Standardowa - dostępność w godzinach pracy)', value: 'A3' },
      { id: 'a4', label: 'A4 (Rozszerzona - dostępność przed/po godzinach)', value: 'A4' },
      { id: 'a5', label: 'A5 (Pełna - praktycznie zawsze dostępny)', value: 'A5' }
    ],
    subOptions: [
      { id: 'morning', label: 'Poranek (np. 8-12)', value: '8-12', parentOptionId: 'a2' },
      { id: 'midday', label: 'Środek dnia (np. 11-15)', value: '11-15', parentOptionId: 'a2' },
      { id: 'afternoon', label: 'Popołudnie (np. 14-18)', value: '14-18', parentOptionId: 'a2' },
      { id: 'evening', label: 'Wieczór (np. 17-21)', value: '17-21', parentOptionId: 'a2' }
    ],
    areaId: 'time-availability',
    description: 'Preferowany poziom dostępności'
  },
  {
    id: 'schedule',
    name: 'Harmonogram',
    iconName: 'Calendar',
    emoji: '📆',
    type: 'toggle',
    options: [
      { id: 'fixed', label: '📆 Stały i przewidywalny', value: 'Stały i przewidywalny' },
      { id: 'cyclical', label: '📊 Cykliczny z powtarzającymi się elementami', value: 'Cykliczny' },
      { id: 'dynamic', label: '🔄 Dynamiczny i adaptacyjny', value: 'Dynamiczny i adaptacyjny' },
      { id: 'project-oriented', label: '🎯 Zorientowany projektowo', value: 'Zorientowany projektowo' }
    ],
    areaId: 'time-availability',
    description: 'Preferowany typ harmonogramu pracy'
  }
]

// Segmenty dla obszaru Proces i Metodologia
const processMethodologySegments: Segment[] = [
  {
    id: 'work-methodology',
    name: 'Metodologia Pracy',
    iconName: 'GitBranch',
    emoji: '🔄',
    type: 'toggle',
    options: [
      { id: 'agile', label: '🔄 Agile/Scrum', value: 'Agile/Scrum' },
      { id: 'kanban', label: '🌊 Kanban', value: 'Kanban' },
      { id: 'waterfall', label: '📋 Waterfall', value: 'Waterfall' },
      { id: 'lean', label: '🎯 Lean', value: 'Lean' },
      { id: 'design-thinking', label: '🧩 Design Thinking', value: 'Design Thinking' }
    ],
    areaId: 'process-methodology',
    description: 'Preferowana metodologia pracy'
  },
  {
    id: 'work-pace',
    name: 'Tempo Pracy',
    iconName: 'Zap',
    emoji: '⚡',
    type: 'toggle',
    options: [
      { id: 'fast', label: '⚡ Szybkie (wysokie tempo, krótkie terminy)', value: 'Szybkie' },
      { id: 'stable', label: '⏱️ Stabilne (zrównoważone tempo)', value: 'Stabilne' },
      { id: 'reflective', label: '🧘 Refleksyjne (dokładność ważniejsza niż szybkość)', value: 'Refleksyjne' },
      { id: 'adaptive', label: '🔄 Adaptacyjne (zmienne w zależności od potrzeb)', value: 'Adaptacyjne' }
    ],
    areaId: 'process-methodology',
    description: 'Preferowane tempo pracy'
  },
  {
    id: 'focus-level',
    name: 'Poziom Skupienia',
    iconName: 'Focus',
    emoji: '🎯',
    type: 'toggle',
    options: [
      { id: 'sequential', label: '🎯 Sekwencyjny (jedno zadanie na raz)', value: 'Sekwencyjny' },
      { id: 'balanced', label: '🔄 Zbalansowany (priorytetyzacja z umiarem)', value: 'Zbalansowany' },
      { id: 'multitasking', label: '🔀 Multitasking (wiele zadań jednocześnie)', value: 'Multitasking' }
    ],
    areaId: 'process-methodology',
    description: 'Preferowany sposób skupienia na zadaniach'
  },
  {
    id: 'tech-preferences',
    name: 'Preferencje Technologiczne',
    iconName: 'Tool',
    emoji: '💻',
    type: 'toggle',
    options: [
      { id: 'os', label: '💻 System operacyjny', value: 'System operacyjny' },
      { id: 'mobile', label: '📱 Narzędzia mobilne', value: 'Narzędzia mobilne' },
      { id: 'software', label: '🛠️ Preferencje oprogramowania', value: 'Preferencje oprogramowania' }
    ],
    subOptions: [
      { id: 'windows', label: 'Windows', value: 'Windows', parentOptionId: 'os' },
      { id: 'macos', label: 'MacOS', value: 'MacOS', parentOptionId: 'os' },
      { id: 'linux', label: 'Linux', value: 'Linux', parentOptionId: 'os' },
      { id: 'ios', label: 'iOS', value: 'iOS', parentOptionId: 'mobile' },
      { id: 'android', label: 'Android', value: 'Android', parentOptionId: 'mobile' },
      { id: 'no-preference', label: 'Brak preferencji', value: 'Brak preferencji', parentOptionId: 'mobile' }
    ],
    areaId: 'process-methodology',
    description: 'Preferencje dotyczące technologii i narzędzi'
  }
]

// Segmenty dla obszaru Komunikacja i Decyzje
const communicationDecisionsSegments: Segment[] = [
  {
    id: 'communication-style',
    name: 'Styl Komunikacji',
    iconName: 'MessageSquare',
    emoji: '🎯',
    type: 'toggle',
    options: [
      { id: 'direct', label: '🎯 Bezpośredni (konkretny i rzeczowy)', value: 'Bezpośredni' },
      { id: 'diplomatic', label: '🤝 Dyplomatyczny (taktowny i relacyjny)', value: 'Dyplomatyczny' },
      { id: 'analytical', label: '📊 Analityczny (oparty na danych)', value: 'Analityczny' },
      { id: 'expressive', label: '🎨 Ekspresyjny (kreatywny i opisowy)', value: 'Ekspresyjny' }
    ],
    areaId: 'communication-decisions',
    description: 'Preferowany styl komunikacji'
  },
  {
    id: 'feedback-style',
    name: 'Styl Feedbacku',
    iconName: 'MessageCircle',
    emoji: '🎯',
    type: 'toggle',
    options: [
      { id: 'direct', label: '🎯 Bezpośredni (szczery i natychmiastowy)', value: 'Bezpośredni' },
      { id: 'gentle', label: '🕊️ Łagodny (wspierający i konstruktywny)', value: 'Łagodny' },
      { id: 'structural', label: '📋 Strukturalny (szczegółowy i uzasadniony)', value: 'Strukturalny' },
      { id: 'bidirectional', label: '🔄 Dwukierunkowy (interaktywna wymiana)', value: 'Dwukierunkowy' }
    ],
    areaId: 'communication-decisions',
    description: 'Preferowany styl otrzymywania i dawania feedbacku'
  },
  {
    id: 'decision-making',
    name: 'Podejmowanie Decyzji',
    iconName: 'GitMerge',
    emoji: '🧠',
    type: 'toggle',
    options: [
      { id: 'independent', label: '🧠 Niezależne (indywidualne)', value: 'Niezależne' },
      { id: 'team', label: '🤝 Zespołowe (konsensus)', value: 'Zespołowe' },
      { id: 'data-driven', label: '📊 Oparte na danych (analityczne)', value: 'Oparte na danych' },
      { id: 'hierarchical', label: '🎯 Hierarchiczne (oparte na autorytetach)', value: 'Hierarchiczne' },
      { id: 'adaptive', label: '🔄 Adaptacyjne (zależne od kontekstu)', value: 'Adaptacyjne' }
    ],
    areaId: 'communication-decisions',
    description: 'Preferowany styl podejmowania decyzji'
  }
]

// Segmenty dla obszaru Rozwój i Adaptacja
const developmentAdaptationSegments: Segment[] = [
  {
    id: 'learning-style',
    name: 'Styl Uczenia Się',
    iconName: 'BookOpen',
    emoji: '🛠️',
    type: 'toggle',
    options: [
      { id: 'practical', label: '🛠️ Praktyczny (nauka przez działanie)', value: 'Praktyczny' },
      { id: 'theoretical', label: '📚 Teoretyczny (nauka przez studiowanie)', value: 'Teoretyczny' },
      { id: 'mixed', label: '🔄 Mieszany (równowaga teorii i praktyki)', value: 'Mieszany' },
      { id: 'social', label: '👥 Społeczny (nauka przez interakcje)', value: 'Społeczny' }
    ],
    areaId: 'development-adaptation',
    description: 'Preferowany styl uczenia się'
  },
  {
    id: 'problem-solving',
    name: 'Rozwiązywanie Problemów',
    iconName: 'PuzzlePiece',
    emoji: '🔍',
    type: 'toggle',
    options: [
      { id: 'analytical', label: '🔍 Analityczne (systematyczne podejście)', value: 'Analityczne' },
      { id: 'creative', label: '🎨 Kreatywne (niestandardowe rozwiązania)', value: 'Kreatywne' },
      { id: 'team', label: '🤝 Zespołowe (wspólne generowanie rozwiązań)', value: 'Zespołowe' },
      { id: 'adaptive', label: '🔄 Adaptacyjne (elastyczne dopasowanie metody)', value: 'Adaptacyjne' }
    ],
    areaId: 'development-adaptation',
    description: 'Preferowany styl rozwiązywania problemów'
  },
  {
    id: 'change-management',
    name: 'Zarządzanie Zmianą',
    iconName: 'RefreshCw',
    emoji: '🛡️',
    type: 'toggle',
    options: [
      { id: 'resilient', label: '🛡️ Odporny (stabilny w obliczu zmian)', value: 'Odporny' },
      { id: 'preventive', label: '⚠️ Zapobiegawczy (przygotowany na zmiany)', value: 'Zapobiegawczy' },
      { id: 'adaptive', label: '🧘 Adaptacyjny (płynnie dostosowujący się)', value: 'Adaptacyjny' },
      { id: 'initiating', label: '🚀 Inicjujący (wprowadzający zmiany)', value: 'Inicjujący' }
    ],
    areaId: 'development-adaptation',
    description: 'Preferowany styl radzenia sobie ze zmianami'
  },
  {
    id: 'innovation',
    name: 'Innowacyjność',
    iconName: 'Lightbulb',
    emoji: '🏛️',
    type: 'toggle',
    options: [
      { id: 'conservative', label: '🏛️ Konserwatywny (sprawdzone rozwiązania)', value: 'Konserwatywny' },
      { id: 'moderate', label: '⚖️ Umiarkowany (selektywne innowacje)', value: 'Umiarkowany' },
      { id: 'innovative', label: '🚀 Innowacyjny (częste testowanie nowości)', value: 'Innowacyjny' },
      { id: 'pioneering', label: '💡 Pionierski (tworzenie nowych rozwiązań)', value: 'Pionierski' }
    ],
    areaId: 'development-adaptation',
    description: 'Preferowany poziom innowacyjności'
  }
]

// Wszystkie segmenty
export const segments: Segment[] = [
  ...workOrganizationSegments,
  ...locationMobilitySegments,
  ...collaborationRelationsSegments,
  ...timeAvailabilitySegments,
  ...processMethodologySegments,
  ...communicationDecisionsSegments,
  ...developmentAdaptationSegments
]

// Sprawdźmy, czy wszystkie segmenty mają poprawnie ustawione właściwości type i options
segments.forEach(segment => {
  if (!segment.type) {
    console.error(`Segment ${segment.name} (${segment.id}) has no type property`);
  }
  if (segment.type !== 'input' && segment.type !== 'slider' && !segment.options) {
    console.error(`Segment ${segment.name} (${segment.id}) has no options property`);
  }
});

// Dodajmy console.log, aby zobaczyć, czy wszystkie segmenty są poprawnie zdefiniowane
console.log('workOrganizationSegments:', workOrganizationSegments.length);
console.log('locationMobilitySegments:', locationMobilitySegments.length);
console.log('collaborationRelationsSegments:', collaborationRelationsSegments.length);
console.log('timeAvailabilitySegments:', timeAvailabilitySegments.length);
console.log('processMethodologySegments:', processMethodologySegments.length);
console.log('communicationDecisionsSegments:', communicationDecisionsSegments.length);
console.log('developmentAdaptationSegments:', developmentAdaptationSegments.length);
