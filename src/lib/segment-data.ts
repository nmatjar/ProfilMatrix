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
  },
  { 
    id: 'technology-preferences', 
    name: 'Preferencje Technologiczne', 
    iconName: 'Cpu',
    emoji: '💻',
    description: 'Technologie, narzędzia i środowiska pracy'
  },
  { 
    id: 'work-style-preferences', 
    name: 'Styl Pracy i Preferencje', 
    iconName: 'Coffee',
    emoji: '☕',
    description: 'Osobiste preferencje i styl pracy'
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
  }
]

// Segmenty dla obszaru Lokalizacja i Mobilność
const locationMobilitySegments: Segment[] = [
  {
    id: 'continent',
    name: 'Kontynent',
    iconName: 'Globe',
    emoji: '🌎',
    type: 'toggle',
    options: [
      { id: 'europe', label: 'Europa', value: 'Europa', description: 'Kraje europejskie' },
      { id: 'north-america', label: 'Ameryka Północna', value: 'Ameryka Północna', description: 'USA, Kanada, Meksyk' },
      { id: 'south-america', label: 'Ameryka Południowa', value: 'Ameryka Południowa', description: 'Kraje Ameryki Południowej' },
      { id: 'asia', label: 'Azja', value: 'Azja', description: 'Kraje azjatyckie' },
      { id: 'africa', label: 'Afryka', value: 'Afryka', description: 'Kraje afrykańskie' },
      { id: 'australia', label: 'Australia i Oceania', value: 'Australia i Oceania', description: 'Australia, Nowa Zelandia i wyspy Oceanii' }
    ],
    areaId: 'location-mobility',
    description: 'Kontynent, na którym znajduje się Twoja lokalizacja'
  },
  {
    id: 'country',
    name: 'Kraj',
    iconName: 'Flag',
    emoji: '🏳️',
    type: 'input',
    areaId: 'location-mobility',
    description: 'Kraj, w którym się znajdujesz lub preferujesz pracować'
  },
  {
    id: 'region',
    name: 'Region/Województwo',
    iconName: 'Map',
    emoji: '🗺️',
    type: 'input',
    areaId: 'location-mobility',
    description: 'Region, województwo lub stan'
  },
  {
    id: 'city',
    name: 'Miasto',
    iconName: 'Building',
    emoji: '🏙️',
    type: 'input',
    areaId: 'location-mobility',
    description: 'Miasto, w którym się znajdujesz lub preferujesz pracować'
  },
  {
    id: 'district',
    name: 'Dzielnica',
    iconName: 'Home',
    emoji: '🏘️',
    type: 'input',
    areaId: 'location-mobility',
    description: 'Dzielnica lub część miasta'
  },
  {
    id: 'timezone',
    name: 'Strefa Czasowa',
    iconName: 'Clock',
    emoji: '🕒',
    type: 'toggle',
    options: [
      { id: 'utc-8', label: 'UTC-8 (PST)', value: 'UTC-8', description: 'Pacyficzny czas standardowy (np. Los Angeles, San Francisco)' },
      { id: 'utc-5', label: 'UTC-5 (EST)', value: 'UTC-5', description: 'Wschodni czas standardowy (np. Nowy Jork, Miami)' },
      { id: 'utc-1', label: 'UTC-1', value: 'UTC-1', description: 'Azory, Wyspy Zielonego Przylądka' },
      { id: 'utc', label: 'UTC+0 (GMT)', value: 'UTC+0', description: 'Czas uniwersalny (np. Londyn, Lizbona)' },
      { id: 'utc+1', label: 'UTC+1 (CET)', value: 'UTC+1', description: 'Czas środkowoeuropejski (np. Warszawa, Berlin, Paryż)' },
      { id: 'utc+2', label: 'UTC+2 (EET)', value: 'UTC+2', description: 'Czas wschodnioeuropejski (np. Ateny, Bukareszt)' },
      { id: 'utc+3', label: 'UTC+3', value: 'UTC+3', description: 'Moskwa, Stambuł' },
      { id: 'utc+5.5', label: 'UTC+5:30', value: 'UTC+5:30', description: 'Indie' },
      { id: 'utc+8', label: 'UTC+8', value: 'UTC+8', description: 'Chiny, Singapur, Hongkong' },
      { id: 'utc+9', label: 'UTC+9', value: 'UTC+9', description: 'Japonia, Korea Południowa' },
      { id: 'utc+10', label: 'UTC+10', value: 'UTC+10', description: 'Wschodnia Australia' }
    ],
    areaId: 'location-mobility',
    description: 'Twoja strefa czasowa'
  },
  {
    id: 'mobility-level',
    name: 'Mobilność',
    iconName: 'Move',
    emoji: '🚶',
    type: 'toggle',
    options: [
      { id: 'fixed', label: 'Stała lokalizacja', value: 'Stała lokalizacja', description: 'Preferujesz pracę w jednej, stałej lokalizacji' },
      { id: 'limited', label: 'Ograniczona mobilność', value: 'Ograniczona mobilność', description: 'Mogę okazjonalnie zmieniać lokalizację pracy' },
      { id: 'regular', label: 'Regularna mobilność', value: 'Regularna mobilność', description: 'Jestem gotów/gotowa regularnie zmieniać lokalizację' },
      { id: 'full', label: 'Pełna mobilność', value: 'Pełna mobilność', description: 'Jestem otwarty/a na częste zmiany lokalizacji' },
      { id: 'nomad', label: 'Nomadyzm cyfrowy', value: 'Nomadyzm cyfrowy', description: 'Preferuję pracę z różnych lokalizacji, w stylu nomady cyfrowego' }
    ],
    areaId: 'location-mobility',
    description: 'Twój preferowany poziom mobilności w pracy'
  },
  {
    id: 'business-travel',
    name: 'Podróże Służbowe',
    iconName: 'Plane',
    emoji: '✈️',
    type: 'toggle',
    options: [
      { id: 'none', label: 'Brak podróży', value: 'Brak podróży', description: 'Nie chcę podróżować służbowo' },
      { id: 'rare', label: 'Sporadyczne podróże', value: 'Sporadyczne podróże', description: 'Akceptuję okazjonalne podróże służbowe (kilka razy w roku)' },
      { id: 'regular-domestic', label: 'Regularne krajowe', value: 'Regularne krajowe', description: 'Jestem gotów/gotowa na regularne podróże w obrębie kraju' },
      { id: 'regular-international', label: 'Regularne międzynarodowe', value: 'Regularne międzynarodowe', description: 'Akceptuję regularne podróże międzynarodowe' },
      { id: 'frequent-global', label: 'Częste globalne', value: 'Częste globalne', description: 'Jestem otwarty/a na częste podróże po całym świecie' }
    ],
    areaId: 'location-mobility',
    description: 'Twoja preferowana częstotliwość podróży służbowych'
  }
]

// Segmenty dla obszaru Współpraca i Relacje
const collaborationRelationsSegments: Segment[] = [
  {
    id: 'team-size',
    name: 'Wielkość Zespołu',
    iconName: 'Users',
    emoji: '👥',
    type: 'toggle',
    options: [
      { id: 'solo', label: '👤 Solo (1 osoba)', value: 'Solo' },
      { id: 'small', label: '👥 Mały (2-5 osób)', value: 'Mały' },
      { id: 'medium', label: '👨‍👩‍👧‍👦 Średni (6-15 osób)', value: 'Średni' },
      { id: 'large', label: '👨‍👩‍👧‍👦👨‍👩‍👧‍👦 Duży (16+ osób)', value: 'Duży' }
    ],
    areaId: 'collaboration-relations',
    description: 'Preferowana wielkość zespołu'
  },
  {
    id: 'team-structure',
    name: 'Struktura Zespołu',
    iconName: 'Network',
    emoji: '🌐',
    type: 'toggle',
    options: [
      { id: 'flat', label: '🌐 Flat (płaska)', value: 'Flat' },
      { id: 'hierarchical', label: '🏛️ Hierarchical (hierarchiczna)', value: 'Hierarchical' },
      { id: 'matrix', label: '🔄 Matrix (macierzowa)', value: 'Matrix' }
    ],
    areaId: 'collaboration-relations',
    description: 'Preferowana struktura zespołu'
  },
  {
    id: 'team-work-style',
    name: 'Styl Pracy Zespołowej',
    iconName: 'Users',
    emoji: '👥',
    type: 'toggle',
    options: [
      { id: 'lone-wolf-independent', label: '🐺 LoneWolf / Niezależny', value: 'LoneWolf/Niezależny', description: 'Preferujesz samodzielną pracę, niezależne zadania i autonomię w działaniu' },
      { id: 'team-ant-collaborative', label: '🐜 TeamAnt / Kolaboratywny', value: 'TeamAnt/Kolaboratywny', description: 'Lubisz pracować w zespole, wspólnie rozwiązywać problemy i dzielić się zadaniami' },
      { id: 'leader-lion-leadership', label: '🦁 LeaderLion / Przywódczy', value: 'LeaderLion/Przywódczy', description: 'Naturalnie przejmujesz inicjatywę, koordynujesz pracę innych i wyznaczasz kierunek' },
      { id: 'social-whale-supportive', label: '🐋 SocialWhale / Wspierający', value: 'SocialWhale/Wspierający', description: 'Dbasz o dobrą atmosferę w zespole, wspierasz innych i budujesz relacje' }
    ],
    areaId: 'collaboration-relations',
    description: 'Twój styl pracy i współdziałania w zespole'
  },
  {
    id: 'motivation-system',
    name: 'System Motywacyjny',
    iconName: 'Target',
    emoji: '🎯',
    type: 'toggle',
    options: [
      { id: 'competitive', label: '🥇 Competitive', value: 'Competitive', description: 'Motywuje Cię rywalizacja, porównywanie wyników i dążenie do bycia najlepszym' },
      { id: 'collaborative', label: '🤝 Collaborative', value: 'Collaborative', description: 'Motywuje Cię wspólne osiąganie celów i sukcesy całego zespołu' },
      { id: 'goal-setter', label: '🎯 GoalSetter', value: 'GoalSetter', description: 'Motywuje Cię wyznaczanie i osiąganie własnych celów, niezależnie od innych' }
    ],
    areaId: 'collaboration-relations',
    description: 'Co najbardziej motywuje Cię do działania'
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
    name: 'Styl Uczenia się',
    iconName: 'BookOpen',
    emoji: '📚',
    type: 'toggle',
    options: [
      { id: 'theoretical', label: '📚 Teoretyczny (nauka przed praktyką)', value: 'Teoretyczny' },
      { id: 'practical', label: '🛠️ Praktyczny (nauka przez działanie)', value: 'Praktyczny' },
      { id: 'mixed', label: '🔄 Mieszany (teoria i praktyka)', value: 'Mieszany' },
      { id: 'social', label: '👥 Społeczny (nauka z innymi)', value: 'Społeczny' }
    ],
    areaId: 'development-adaptation',
    description: 'Preferowany styl uczenia się i rozwoju'
  },
  {
    id: 'change-adaptation',
    name: 'Adaptacja do Zmian',
    iconName: 'RefreshCw',
    emoji: '🔄',
    type: 'toggle',
    options: [
      { id: 'pioneer', label: '🚀 Pionier (inicjator zmian)', value: 'Pionier' },
      { id: 'early-adopter', label: '🔍 Early Adopter (szybka adaptacja)', value: 'Early Adopter' },
      { id: 'pragmatic', label: '⚖️ Pragmatyczny (po sprawdzeniu)', value: 'Pragmatyczny' },
      { id: 'conservative', label: '🛡️ Konserwatywny (ostrożny)', value: 'Konserwatywny' }
    ],
    areaId: 'development-adaptation',
    description: 'Jak adaptujesz się do zmian'
  },
  {
    id: 'feedback-reception',
    name: 'Przyjmowanie Feedbacku',
    iconName: 'MessageCircle',
    emoji: '💬',
    type: 'toggle',
    options: [
      { id: 'seeks-actively', label: '🔍 Aktywnie poszukuje', value: 'Aktywnie poszukuje' },
      { id: 'open-receptive', label: '👂 Otwarty i receptywny', value: 'Otwarty i receptywny' },
      { id: 'selective', label: '⚖️ Selektywny (filtrujący)', value: 'Selektywny' },
      { id: 'defensive', label: '🛡️ Ostrożny (potrzebuje czasu)', value: 'Ostrożny' }
    ],
    areaId: 'development-adaptation',
    description: 'Jak przyjmujesz feedback i krytykę'
  },
  {
    id: 'futurist-factor',
    name: 'Futurist Factor',
    iconName: 'Rocket',
    emoji: '🛸',
    type: 'toggle',
    options: [
      { id: 'f1', label: '🛸 F1', value: 'F1', description: 'Tradition Keeper - cenisz sprawdzone rozwiązania' },
      { id: 'f2', label: '🛸 F2', value: 'F2', description: 'Cautious Adopter - ostrożnie podchodzisz do nowinek' },
      { id: 'f3', label: '🛸 F3', value: 'F3', description: 'Balanced Adopter - równoważysz tradycję i innowację' },
      { id: 'f4', label: '🛸 F4', value: 'F4', description: 'Innovation Enthusiast - chętnie testujesz nowe rozwiązania' },
      { id: 'f5', label: '🛸 F5', value: 'F5', description: 'Innovation Fanatic - zawsze na czele technologicznych trendów' }
    ],
    areaId: 'development-adaptation',
    description: 'Poziom otwartości na nowinki technologiczne'
  },
  {
    id: 'impact-level',
    name: 'Impact Level',
    iconName: 'Leaf',
    emoji: '🌱',
    type: 'toggle',
    options: [
      { id: 'i1', label: '🌱 I1', value: 'I1', description: 'Basic Responsibility - podstawowa odpowiedzialność' },
      { id: 'i2', label: '🌱 I2', value: 'I2', description: 'Growing Awareness - rosnąca świadomość wpływu' },
      { id: 'i3', label: '🌱 I3', value: 'I3', description: 'Moderate Engagement - umiarkowane zaangażowanie' },
      { id: 'i4', label: '🌱 I4', value: 'I4', description: 'Active Contribution - aktywny wkład w pozytywne zmiany' },
      { id: 'i5', label: '🌱 I5', value: 'I5', description: 'Full Commitment - pełne zaangażowanie, purpose-driven' }
    ],
    areaId: 'development-adaptation',
    description: 'Prospołeczny, ekologiczny lub społeczno-odpowiedzialny poziom twojej kariery'
  }
]

// Segmenty dla obszaru Preferencje Technologiczne
const technologyPreferencesSegments: Segment[] = [
  {
    id: 'operating-system',
    name: 'System Operacyjny',
    iconName: 'Monitor',
    emoji: '🖥️',
    type: 'toggle',
    options: [
      { id: 'windows', label: '🪟 Windows', value: 'Windows' },
      { id: 'macos', label: '🍎 MacOS', value: 'MacOS' },
      { id: 'linux', label: '🐧 Linux', value: 'Linux' }
    ],
    areaId: 'technology-preferences',
    description: 'Preferowany system operacyjny'
  },
  {
    id: 'development-environment',
    name: 'Środowisko Programistyczne',
    iconName: 'Code',
    emoji: '⌨️',
    type: 'toggle',
    options: [
      { id: 'vscode', label: '📝 VS Code', value: 'VS Code' },
      { id: 'intellij', label: '🧠 IntelliJ', value: 'IntelliJ' },
      { id: 'eclipse', label: '🌑 Eclipse', value: 'Eclipse' },
      { id: 'vim', label: '⚡ Vim', value: 'Vim' },
      { id: 'sublime', label: '🔍 Sublime', value: 'Sublime' }
    ],
    areaId: 'technology-preferences',
    description: 'Preferowane środowisko programistyczne'
  },
  {
    id: 'programming-languages',
    name: 'Języki Programowania',
    iconName: 'Hash',
    emoji: '📊',
    type: 'toggle',
    options: [
      { id: 'javascript', label: '🟨 JavaScript', value: 'JavaScript' },
      { id: 'python', label: '🐍 Python', value: 'Python' },
      { id: 'java', label: '☕ Java', value: 'Java' },
      { id: 'csharp', label: '🔷 C#', value: 'C#' },
      { id: 'cpp', label: '🔶 C++', value: 'C++' },
      { id: 'go', label: '🔵 Go', value: 'Go' },
      { id: 'rust', label: '🦀 Rust', value: 'Rust' },
      { id: 'php', label: '🐘 PHP', value: 'PHP' }
    ],
    areaId: 'technology-preferences',
    description: 'Preferowane języki programowania'
  },
  {
    id: 'frontend-frameworks',
    name: 'Frameworki Frontend',
    iconName: 'Layout',
    emoji: '🎨',
    type: 'toggle',
    options: [
      { id: 'react', label: '⚛️ React', value: 'React' },
      { id: 'vue', label: '🟢 Vue', value: 'Vue' },
      { id: 'angular', label: '🔴 Angular', value: 'Angular' },
      { id: 'svelte', label: '🧡 Svelte', value: 'Svelte' }
    ],
    areaId: 'technology-preferences',
    description: 'Preferowane frameworki frontend'
  },
  {
    id: 'backend-technologies',
    name: 'Technologie Backend',
    iconName: 'Server',
    emoji: '🗄️',
    type: 'toggle',
    options: [
      { id: 'nodejs', label: '🟢 Node.js', value: 'Node.js' },
      { id: 'django', label: '🐍 Django', value: 'Django' },
      { id: 'spring', label: '🍃 Spring', value: 'Spring' },
      { id: 'dotnet', label: '🔵 .NET', value: '.NET' },
      { id: 'laravel', label: '🔴 Laravel', value: 'Laravel' }
    ],
    areaId: 'technology-preferences',
    description: 'Preferowane technologie backend'
  },
  {
    id: 'database-systems',
    name: 'Systemy Bazodanowe',
    iconName: 'Database',
    emoji: '🗃️',
    type: 'toggle',
    options: [
      { id: 'mysql', label: '🐬 MySQL', value: 'MySQL' },
      { id: 'postgresql', label: '🐘 PostgreSQL', value: 'PostgreSQL' },
      { id: 'mongodb', label: '🍃 MongoDB', value: 'MongoDB' },
      { id: 'redis', label: '🔴 Redis', value: 'Redis' },
      { id: 'sqlite', label: '🔹 SQLite', value: 'SQLite' }
    ],
    areaId: 'technology-preferences',
    description: 'Preferowane systemy bazodanowe'
  },
  {
    id: 'cloud-services',
    name: 'Usługi Chmurowe',
    iconName: 'Cloud',
    emoji: '☁️',
    type: 'toggle',
    options: [
      { id: 'aws', label: '🟠 AWS', value: 'AWS' },
      { id: 'azure', label: '🔵 Azure', value: 'Azure' },
      { id: 'gcp', label: '🟢 GCP', value: 'GCP' },
      { id: 'heroku', label: '💜 Heroku', value: 'Heroku' },
      { id: 'vercel', label: '⚫ Vercel', value: 'Vercel' }
    ],
    areaId: 'technology-preferences',
    description: 'Preferowane usługi chmurowe'
  }
]

// Segmenty dla obszaru Styl Pracy i Preferencje
const workStylePreferencesSegments: Segment[] = [
  {
    id: 'work-style',
    name: 'Styl Pracy',
    iconName: 'Compass',
    emoji: '🧭',
    type: 'toggle',
    options: [
      { id: 'sprint', label: '🔥 Sprint', value: 'Sprint', description: 'Szybkie, intensywne sesje pracy' },
      { id: 'flow', label: '🌊 Flow', value: 'Flow', description: 'Płynne przeplatanie pracy i przerw' },
      { id: 'burst', label: '🚀 Burst', value: 'Burst', description: 'Długie okresy działania z przerwami' },
      { id: 'steady', label: '🐌 Steady', value: 'Steady', description: 'Stałe tempo przez cały dzień' }
    ],
    areaId: 'work-style-preferences',
    description: 'Preferowana energia i podejście w pracy'
  },
  {
    id: 'soundscape',
    name: 'Soundscape (Preferencje Audialne)',
    iconName: 'Headphones',
    emoji: '🎧',
    type: 'toggle',
    options: [
      { id: 'chill-lofi', label: '🎶 ChillLoFi', value: 'ChillLoFi', description: 'Spokojne, relaksujące dźwięki lofi idealne do skupienia' },
      { id: 'energetic', label: '🔊 Energetic', value: 'Energetic', description: 'Energiczna muzyka pobudzająca do działania' },
      { id: 'ambient', label: '🌧️ Ambient', value: 'Ambient', description: 'Delikatne dźwięki tła, szum natury, odgłosy deszczu' },
      { id: 'silence', label: '🎧 Silence', value: 'Silence', description: 'Cisza lub całkowite wyciszenie hałasu zewnętrznego' }
    ],
    areaId: 'work-style-preferences',
    description: 'W jakich warunkach dźwiękowych najlepiej pracujesz?'
  },
  {
    id: 'fuel',
    name: 'Fuel',
    iconName: 'Coffee',
    emoji: '☕️',
    type: 'toggle',
    options: [
      { id: 'coffee', label: '☕️ Coffee', value: 'Coffee', description: 'Kawa jako główne źródło energii' },
      { id: 'tea', label: '🍵 Tea', value: 'Tea', description: 'Herbata jako preferowany napój' },
      { id: 'chocolate', label: '🍫 Chocolate', value: 'Chocolate', description: 'Czekolada lub przekąski czekoladowe' },
      { id: 'energy-drink', label: '🥤 EnergyDrink', value: 'EnergyDrink', description: 'Napoje energetyczne' },
      { id: 'water', label: '💧 Water', value: 'Water', description: 'Woda jako podstawowy napój' }
    ],
    areaId: 'work-style-preferences',
    description: 'Czym się "napędzasz" podczas pracy?'
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
    areaId: 'work-style-preferences',
    description: 'Preferowany dress code w miejscu pracy'
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
  ...developmentAdaptationSegments,
  ...technologyPreferencesSegments,
  ...workStylePreferencesSegments
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
console.log('technologyPreferencesSegments:', technologyPreferencesSegments.length);
console.log('workStylePreferencesSegments:', workStylePreferencesSegments.length);
