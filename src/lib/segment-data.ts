import { SegmentCategory, Segment, MicrosegmentGroup } from './segment-types'

// Categories
export const categories: SegmentCategory[] = [
  { 
    id: 'work-environment', 
    name: 'Środowisko Pracy', 
    iconName: 'Building', 
    description: 'Preferencje dotyczące miejsca i stylu pracy'
  },
  { 
    id: 'work-patterns', 
    name: 'Wzorce Pracy', 
    iconName: 'Clock',
    description: 'Preferencje dotyczące organizacji czasu i sposobu pracy'
  },
  { 
    id: 'tech-tools', 
    name: 'Narzędzia i Technologie', 
    iconName: 'Terminal',
    description: 'Preferencje technologiczne i narzędziowe'
  },
  { 
    id: 'location', 
    name: 'Preferencje Lokalizacyjne', 
    iconName: 'Globe',
    description: 'Preferencje dotyczące lokalizacji i mobilności'
  },
  { 
    id: 'personal', 
    name: 'Preferencje Osobiste', 
    iconName: 'User',
    description: 'Osobiste preferencje i styl pracy'
  }
]

// Work Environment Segments
const workEnvironmentSegments: Segment[] = [
  {
    id: 'workplace',
    name: 'Typ Miejsca Pracy',
    iconName: 'Building',
    emoji: '🏢',
    type: 'toggle',
    options: [
      { id: 'corporate', label: '🏢 Korporacja', value: '🏢' },
      { id: 'remote', label: '🏡 Remote', value: '🏡' },
      { id: 'creative', label: '🎨 Kreatywne', value: '🎨' },
      { id: 'social', label: '🤝 Społeczne', value: '🤝' }
    ],
    categoryId: 'work-environment',
    description: 'Preferowany typ miejsca pracy'
  },
  {
    id: 'mobility',
    name: 'Mobilność',
    iconName: 'ArrowUpRight',
    emoji: '🌐',
    type: 'toggle',
    options: [
      { id: 'f1', label: 'F1 (Stała)', value: 'F1' },
      { id: 'f3', label: 'F3 (Elastyczna)', value: 'F3' },
      { id: 'f5', label: 'F5 (Pełna)', value: 'F5' }
    ],
    categoryId: 'work-environment',
    description: 'Poziom mobilności w pracy'
  },
  {
    id: 'culture',
    name: 'Kultura',
    iconName: 'Users',
    emoji: '🧠',
    type: 'toggle',
    options: [
      { id: 'c1', label: 'C1 (Hierarchiczna)', value: 'C1' },
      { id: 'c3', label: 'C3 (Hybrydowa)', value: 'C3' },
      { id: 'c5', label: 'C5 (Płaska)', value: 'C5' }
    ],
    categoryId: 'work-environment',
    description: 'Preferowana kultura organizacyjna'
  },
  {
    id: 'workHours',
    name: 'Godziny Pracy',
    iconName: 'Clock',
    emoji: '⏰',
    type: 'slider',
    min: 1,
    max: 12,
    step: 1,
    defaultValue: 8,
    categoryId: 'work-environment',
    description: 'Preferowana liczba godzin pracy dziennie'
  },
  {
    id: 'workSchedule',
    name: 'Harmonogram Pracy',
    iconName: 'Clock',
    emoji: '📆',
    type: 'toggle',
    options: [
      { id: 'early', label: '🌅 6-14', value: '6-14' },
      { id: 'standard', label: '🕘 9-17', value: '9-17' },
      { id: 'late', label: '🌙 12-20', value: '12-20' },
      { id: 'flexible', label: '🔄 Elastyczne', value: 'Flex' }
    ],
    categoryId: 'work-environment',
    description: 'Preferowane godziny pracy'
  },
  {
    id: 'officeType',
    name: 'Typ Biura',
    iconName: 'Building',
    emoji: '🏗️',
    type: 'toggle',
    options: [
      { id: 'open', label: '🏢 Open Space', value: 'O' },
      { id: 'private', label: '🚪 Prywatne', value: 'P' },
      { id: 'hybrid', label: '🔄 Hybrydowe', value: 'H' },
      { id: 'coworking', label: '👥 Co-working', value: 'C' }
    ],
    categoryId: 'work-environment',
    description: 'Preferowany typ przestrzeni biurowej'
  },
  {
    id: 'dressCode',
    name: 'Dress Code',
    iconName: 'Shirt',
    emoji: '👔',
    type: 'toggle',
    options: [
      { id: 'formal', label: '👔 Formalny', value: 'F' },
      { id: 'business', label: '👕 Business Casual', value: 'BC' },
      { id: 'casual', label: '👖 Casual', value: 'C' },
      { id: 'none', label: '🎽 Brak', value: 'NC' }
    ],
    categoryId: 'work-environment',
    description: 'Preferowany styl ubioru w pracy'
  }
]

// Work Patterns Segments
const workPatternsSegments: Segment[] = [
  {
    id: 'potential',
    name: 'Potencjał',
    iconName: 'Sparkles',
    emoji: '💫',
    type: 'slider',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 67,
    categoryId: 'work-patterns',
    description: 'Poziom potencjału (0-100)'
  },
  {
    id: 'transformation',
    name: 'Transformacja',
    iconName: 'Target',
    emoji: '🔄',
    type: 'toggle',
    options: [
      { id: 't1', label: 'T1 (0-20%)', value: '1' },
      { id: 't2', label: 'T2 (20-40%)', value: '2' },
      { id: 't3', label: 'T3 (40-60%)', value: '3' },
      { id: 't4', label: 'T4 (60-80%)', value: '4' },
      { id: 't5', label: 'T5 (80-100%)', value: '5' }
    ],
    categoryId: 'work-patterns',
    description: 'Poziom transformacji'
  },
  {
    id: 'availability',
    name: 'Dostępność',
    iconName: 'Clock',
    emoji: '📅',
    type: 'toggle',
    options: [
      { id: 'a1', label: 'A1 (Minimalna)', value: '1' },
      { id: 'a2', label: 'A2 (Ograniczona)', value: '2' },
      { id: 'a3', label: 'A3 (Standardowa)', value: '3' },
      { id: 'a4', label: 'A4 (Zwiększona)', value: '4' },
      { id: 'a5', label: 'A5 (Pełna)', value: '5' }
    ],
    categoryId: 'work-patterns',
    description: 'Poziom dostępności'
  },
  {
    id: 'synergy',
    name: 'Synergia',
    iconName: 'Zap',
    emoji: '⚡',
    type: 'toggle',
    options: [
      { id: 's1', label: 'S1 (Podstawowa)', value: '1' },
      { id: 's2', label: 'S2 (Umiarkowana)', value: '2' },
      { id: 's3', label: 'S3 (Znacząca)', value: '3' },
      { id: 's4', label: 'S4 (Wysoka)', value: '4' },
      { id: 's5', label: 'S5 (Maksymalna)', value: '5' }
    ],
    categoryId: 'work-patterns',
    description: 'Poziom synergii w pracy zespołowej'
  },
  {
    id: 'focusTime',
    name: 'Czas Skupienia',
    iconName: 'Target',
    emoji: '🎯',
    type: 'slider',
    min: 1,
    max: 5,
    step: 0.5,
    defaultValue: 2,
    categoryId: 'work-patterns',
    description: 'Preferowana długość bloków skupienia (w godzinach)'
  },
  {
    id: 'meetingPreference',
    name: 'Preferencje Spotkań',
    iconName: 'Users',
    emoji: '👥',
    type: 'toggle',
    options: [
      { id: 'min', label: '⏱️ Minimalne', value: 'Min' },
      { id: 'mod', label: '⚖️ Umiarkowane', value: 'Mod' },
      { id: 'freq', label: '📅 Częste', value: 'Freq' }
    ],
    categoryId: 'work-patterns',
    description: 'Preferowana częstotliwość spotkań'
  },
  {
    id: 'decisionMaking',
    name: 'Podejmowanie Decyzji',
    iconName: 'GitMerge',
    emoji: '🧩',
    type: 'toggle',
    options: [
      { id: 'independent', label: '🧍 Niezależne', value: 'I' },
      { id: 'collaborative', label: '👥 Wspólne', value: 'C' },
      { id: 'hybrid', label: '🔄 Hybrydowe', value: 'H' }
    ],
    categoryId: 'work-patterns',
    description: 'Preferowany styl podejmowania decyzji'
  }
]

// Location Segments
const locationSegments: Segment[] = [
  {
    id: 'location',
    name: 'Lokalizacja',
    iconName: 'Globe',
    emoji: '🌍',
    type: 'toggle',
    options: [
      { id: 'urban', label: '🏙️ Miejska', value: 'U' },
      { id: 'suburban', label: '🏘️ Podmiejska', value: 'S' },
      { id: 'rural', label: '🌳 Wiejska', value: 'R' },
      { id: 'remote', label: '🏝️ Zdalna', value: 'RM' }
    ],
    categoryId: 'location',
    description: 'Preferowany typ lokalizacji'
  },
  {
    id: 'locationMobility',
    name: 'Mobilność Lokalizacyjna',
    iconName: 'Rocket',
    emoji: '🚀',
    type: 'toggle',
    options: [
      { id: 'fixed', label: '📍 Stała', value: '0' },
      { id: 'local', label: '🚗 Lokalna', value: '1' },
      { id: 'regional', label: '✈️ Regionalna', value: '2' },
      { id: 'global', label: '🌎 Globalna', value: '3' }
    ],
    categoryId: 'location',
    description: 'Preferowany poziom mobilności lokalizacyjnej'
  },
  {
    id: 'environmentType',
    name: 'Typ Środowiska',
    iconName: 'Mountain',
    emoji: '🏞️',
    type: 'toggle',
    options: [
      { id: 'indoor', label: '🏠 Wewnętrzne', value: 'I' },
      { id: 'outdoor', label: '🌳 Zewnętrzne', value: 'O' },
      { id: 'mixed', label: '🔄 Mieszane', value: 'M' }
    ],
    categoryId: 'location',
    description: 'Preferowany typ środowiska pracy'
  },
  {
    id: 'climatePreference',
    name: 'Preferencje Klimatyczne',
    iconName: 'Sun',
    emoji: '☀️',
    type: 'toggle',
    options: [
      { id: 'warm', label: '☀️ Ciepły', value: 'W' },
      { id: 'cold', label: '❄️ Zimny', value: 'C' },
      { id: 'temperate', label: '🌤️ Umiarkowany', value: 'T' },
      { id: 'any', label: '🌍 Dowolny', value: 'A' }
    ],
    categoryId: 'location',
    description: 'Preferowany klimat'
  }
]

// Tech & Tools Segments
const techToolsSegments: Segment[] = [
  {
    id: 'system',
    name: 'System',
    iconName: 'Terminal',
    emoji: '💻',
    type: 'toggle',
    options: [
      { id: 'win', label: '🪟 Windows', value: 'W' },
      { id: 'mac', label: '🍎 Mac', value: 'M' },
      { id: 'linux', label: '🐧 Linux', value: 'L' },
      { id: 'cross', label: '🔄 Cross-platform', value: 'X' }
    ],
    categoryId: 'tech-tools',
    description: 'Preferowany system operacyjny'
  },
  {
    id: 'frontend',
    name: 'Frontend',
    iconName: 'Layout',
    emoji: '🖥️',
    type: 'toggle',
    options: [
      { id: 'react', label: '⚛️ React', value: 'R' },
      { id: 'vue', label: '🟢 Vue', value: 'V' },
      { id: 'angular', label: '🔴 Angular', value: 'A' },
      { id: 'other', label: '🔧 Inne', value: 'O' }
    ],
    categoryId: 'tech-tools',
    description: 'Preferowane technologie frontendowe'
  },
  {
    id: 'backend',
    name: 'Backend',
    iconName: 'Server',
    emoji: '⚙️',
    type: 'toggle',
    options: [
      { id: 'node', label: '🟢 Node.js', value: 'N' },
      { id: 'python', label: '🐍 Python', value: 'P' },
      { id: 'java', label: '☕ Java', value: 'J' },
      { id: 'other', label: '🔧 Inne', value: 'O' }
    ],
    categoryId: 'tech-tools',
    description: 'Preferowane technologie backendowe'
  },
  {
    id: 'mobile',
    name: 'Mobile',
    iconName: 'Smartphone',
    emoji: '📱',
    type: 'toggle',
    options: [
      { id: 'ios', label: '🍎 iOS', value: 'I' },
      { id: 'android', label: '🤖 Android', value: 'A' },
      { id: 'cross', label: '🔄 Cross-platform', value: 'X' }
    ],
    categoryId: 'tech-tools',
    description: 'Preferowane technologie mobilne'
  },
  {
    id: 'cloud',
    name: 'Cloud',
    iconName: 'Cloud',
    emoji: '☁️',
    type: 'toggle',
    options: [
      { id: 'aws', label: '🟠 AWS', value: 'A' },
      { id: 'azure', label: '🔵 Azure', value: 'Z' },
      { id: 'gcp', label: '🟢 GCP', value: 'G' },
      { id: 'other', label: '🔧 Inne', value: 'O' }
    ],
    categoryId: 'tech-tools',
    description: 'Preferowane technologie chmurowe'
  },
  {
    id: 'skillLevel',
    name: 'Poziom Umiejętności',
    iconName: 'BarChart',
    emoji: '📊',
    type: 'toggle',
    options: [
      { id: 'junior', label: '🌱 Junior', value: 'J' },
      { id: 'mid', label: '🌿 Mid-level', value: 'M' },
      { id: 'senior', label: '🌳 Senior', value: 'S' },
      { id: 'expert', label: '🌲 Expert', value: 'E' }
    ],
    categoryId: 'tech-tools',
    description: 'Poziom umiejętności technicznych'
  }
]

// Personal Preference Segments
const personalSegments: Segment[] = [
  {
    id: 'workStyle',
    name: 'Styl Pracy',
    iconName: 'Compass',
    emoji: '🧭',
    type: 'toggle',
    options: [
      { id: 'sprint', label: '🔥 Sprint', value: 'Sprint' },
      { id: 'flow', label: '🌊 Flow', value: 'Flow' },
      { id: 'burst', label: '🚀 Burst', value: 'Burst' },
      { id: 'steady', label: '🐌 Steady', value: 'Steady' }
    ],
    categoryId: 'personal',
    description: 'Preferowany styl pracy i energia'
  },
  {
    id: 'soundscape',
    name: 'Preferencje Dźwiękowe',
    iconName: 'Music',
    emoji: '🎵',
    type: 'toggle',
    options: [
      { id: 'silence', label: '🔇 Cisza', value: 'S' },
      { id: 'ambient', label: '🌧️ Ambient', value: 'A' },
      { id: 'music', label: '🎧 Muzyka', value: 'M' },
      { id: 'noise', label: '🔊 Szum', value: 'N' }
    ],
    categoryId: 'personal',
    description: 'Preferowane otoczenie dźwiękowe'
  },
  {
    id: 'superpower',
    name: 'Supermoce',
    iconName: 'Star',
    emoji: '⭐',
    type: 'input',
    categoryId: 'personal',
    description: 'Twoje unikalne mocne strony'
  },
  {
    id: 'fuel',
    name: 'Paliwo',
    iconName: 'Coffee',
    emoji: '☕',
    type: 'toggle',
    options: [
      { id: 'coffee', label: '☕ Kawa', value: 'C' },
      { id: 'tea', label: '🍵 Herbata', value: 'T' },
      { id: 'water', label: '💧 Woda', value: 'W' },
      { id: 'energy', label: '⚡ Napoje energetyczne', value: 'E' },
      { id: 'none', label: '❌ Nic', value: 'N' }
    ],
    categoryId: 'personal',
    description: 'Preferowany napój podczas pracy'
  },
  {
    id: 'teamAnimal',
    name: 'Zwierzę Zespołowe',
    iconName: 'Dog',
    emoji: '🦊',
    type: 'toggle',
    options: [
      { id: 'wolf', label: '🐺 Wilk', value: 'W' },
      { id: 'owl', label: '🦉 Sowa', value: 'O' },
      { id: 'dolphin', label: '🐬 Delfin', value: 'D' },
      { id: 'bee', label: '🐝 Pszczoła', value: 'B' },
      { id: 'lion', label: '🦁 Lew', value: 'L' }
    ],
    categoryId: 'personal',
    description: 'Twój styl pracy w zespole'
  },
  {
    id: 'gamificationLevel',
    name: 'Poziom Gamifikacji',
    iconName: 'Gamepad2',
    emoji: '🎮',
    type: 'toggle',
    options: [
      { id: 'competitive', label: '🏆 Rywalizacyjny', value: 'C' },
      { id: 'collaborative', label: '🤝 Współpracujący', value: 'Co' },
      { id: 'casual', label: '🎲 Casualowy', value: 'Ca' },
      { id: 'none', label: '❌ Żaden', value: 'N' }
    ],
    categoryId: 'personal',
    description: 'Preferowany poziom gamifikacji w pracy'
  },
  {
    id: 'communicationStyle',
    name: 'Styl Komunikacji',
    iconName: 'MessageSquare',
    emoji: '💬',
    type: 'toggle',
    options: [
      { id: 'direct', label: '🎯 Bezpośredni', value: 'D' },
      { id: 'diplomatic', label: '🕊️ Dyplomatyczny', value: 'Dp' },
      { id: 'detailed', label: '📋 Szczegółowy', value: 'Dt' },
      { id: 'minimal', label: '⚡ Minimalny', value: 'M' }
    ],
    categoryId: 'personal',
    description: 'Preferowany styl komunikacji'
  },
  {
    id: 'futuristFactor',
    name: 'Czynnik Futurystyczny',
    iconName: 'Sparkles',
    emoji: '🔮',
    type: 'toggle',
    options: [
      { id: 'early', label: '🚀 Early Adopter', value: 'EA' },
      { id: 'mainstream', label: '🌊 Mainstream', value: 'M' },
      { id: 'conservative', label: '🏛️ Konserwatywny', value: 'C' }
    ],
    categoryId: 'personal',
    description: 'Stosunek do nowych technologii'
  },
  {
    id: 'diversity',
    name: 'Preferencje Różnorodności',
    iconName: 'Palette',
    emoji: '🌈',
    type: 'toggle',
    options: [
      { id: 'high', label: '🌈 Wysoki Priorytet', value: 'H' },
      { id: 'medium', label: '🔄 Średni Priorytet', value: 'M' },
      { id: 'low', label: '⚪ Niski Priorytet', value: 'L' }
    ],
    categoryId: 'personal',
    description: 'Stosunek do różnorodności w zespole'
  },
  {
    id: 'impact',
    name: 'Poziom Wpływu',
    iconName: 'Leaf',
    emoji: '🌱',
    type: 'toggle',
    options: [
      { id: 'mission', label: '🌍 Mission-driven', value: 'M' },
      { id: 'impact', label: '💫 Impact-aware', value: 'I' },
      { id: 'traditional', label: '📊 Traditional', value: 'T' }
    ],
    categoryId: 'personal',
    description: 'Preferowany poziom wpływu społecznego'
  },
  {
    id: 'workLifeBalance',
    name: 'Równowaga Praca-Życie',
    iconName: 'Scale',
    emoji: '⚖️',
    type: 'toggle',
    options: [
      { id: 'work', label: '💼 Work-focused', value: 'W' },
      { id: 'balanced', label: '⚖️ Balanced', value: 'B' },
      { id: 'life', label: '🏖️ Life-focused', value: 'L' }
    ],
    categoryId: 'personal',
    description: 'Preferowana równowaga między pracą a życiem prywatnym'
  }
]

// Microsegment Groups
export const microsegmentGroups: MicrosegmentGroup[] = [
  {
    id: 'work-style-group',
    name: 'Styl Pracy',
    iconName: 'Compass',
    segmentIds: ['workStyle', 'soundscape', 'superpower', 'fuel'],
    categoryId: 'personal',
    description: 'Preferencje dotyczące stylu pracy'
  },
  {
    id: 'team-group',
    name: 'Preferencje Zespołowe',
    iconName: 'Users',
    segmentIds: ['teamAnimal', 'gamificationLevel', 'communicationStyle'],
    categoryId: 'personal',
    description: 'Preferencje dotyczące pracy zespołowej'
  },
  {
    id: 'tech-stack-group',
    name: 'Stos Technologiczny',
    iconName: 'Layers',
    segmentIds: ['frontend', 'backend', 'mobile', 'cloud'],
    categoryId: 'tech-tools',
    description: 'Preferowane technologie'
  },
  {
    id: 'values-group',
    name: 'Wartości',
    iconName: 'Heart',
    segmentIds: ['futuristFactor', 'diversity', 'impact'],
    categoryId: 'personal',
    description: 'Wartości i preferencje społeczne'
  }
]

// Combine all segments
export const segments: Segment[] = [
  ...workEnvironmentSegments,
  ...workPatternsSegments,
  ...locationSegments,
  ...techToolsSegments,
  ...personalSegments
]
