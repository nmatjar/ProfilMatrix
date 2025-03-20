import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Terminal, Building, Home, Palette, Users, Globe, Clock, ArrowUpRight, Target, Sparkles, Zap, Gem, Bot, Smartphone, Lightbulb, Settings, MessageSquare, RefreshCw, Brain, User, ChevronLeft, ChevronRight, Cpu } from "lucide-react";
import { Link } from 'react-router-dom';
import { Area, Segment, SegmentOption, SubOption, SegmentWithIcon } from '@/lib/segment-types';
import { getAllAreas, getSegmentsByArea } from '@/lib/segment-service';

interface ActiveSegment {
  id: string;
  segmentId: string;
  value: string;
  visible: boolean;
  order?: number;
}

interface MainArea {
  id: string;
  name: string;
  description: string;
  emoji: string;
  icon: React.ReactNode;
}

// Map to associate segments with their parent areas
const segmentToAreaMap: Record<string, string> = {};

// Initialize the area-segment mapping
getAllAreas().forEach(area => {
  getSegmentsByArea(area.id).forEach(segment => {
    segmentToAreaMap[segment.id] = area.id;
  });
});

const mainAreas: MainArea[] = [
  {
    id: 'work-organization',
    name: 'Praca i Organizacja',
    description: 'Środowisko, kultura i struktura organizacyjna',
    emoji: '💼',
    icon: <Building className="h-5 w-5" />
  },
  {
    id: 'location-mobility',
    name: 'Lokalizacja i Mobilność',
    description: 'Miejsce pracy i elastyczność lokalizacyjna',
    emoji: '📍',
    icon: <Globe className="h-5 w-5" />
  },
  {
    id: 'collaboration-relations',
    name: 'Współpraca i Relacje',
    description: 'Dynamika zespołu i interakcje',
    emoji: '👥',
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 'time-availability',
    name: 'Czas i Dostępność',
    description: 'Harmonogram i organizacja czasu',
    emoji: '⏰',
    icon: <Clock className="h-5 w-5" />
  },
  {
    id: 'process-methodology',
    name: 'Proces i Metodologia',
    description: 'Podejście do zadań i procesów',
    emoji: '🧠',
    icon: <Brain className="h-5 w-5" />
  },
  {
    id: 'communication-decisions',
    name: 'Komunikacja i Decyzje',
    description: 'Style komunikacji i podejmowania decyzji',
    emoji: '💬',
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    id: 'development-adaptation',
    name: 'Rozwój i Adaptacja',
    description: 'Rozwój zawodowy i adaptacja do zmian',
    emoji: '🔄',
    icon: <RefreshCw className="h-5 w-5" />
  },
  {
    id: 'technology-preferences',
    name: 'Preferencje Technologiczne',
    description: 'Technologie, narzędzia i środowiska pracy',
    emoji: '💻',
    icon: <Cpu className="h-5 w-5" />
  }
];

function getSegmentsByAreaId(areaId: string): SegmentWithIcon[] {
  console.log('Getting segments for area:', areaId);
  const segments = getSegmentsByArea(areaId);
  console.log('Found segments:', segments);
  return segments;
}

const Index = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState("");
  const [activeSegments, setActiveSegments] = useState<ActiveSegment[]>([]);
  const [selections, setSelections] = useState<Record<string, string | number>>({});
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedArea, setSelectedArea] = useState('work-organization');

  // Dodajmy console.log, aby zobaczyć wszystkie segmenty
  useEffect(() => {
    console.log('All segments from segment-service for work-organization:', getSegmentsByArea('work-organization'));
    console.log('All areas from segment-service:', getAllAreas());
    
    // Sprawdźmy, czy wszystkie segmenty mają poprawnie ustawione właściwości type i options
    const allAreas = getAllAreas();
    allAreas.forEach(area => {
      const areaSegments = getSegmentsByArea(area.id);
      console.log(`Area ${area.name} (${area.id}) has ${areaSegments.length} segments`);
      
      // Sprawdź, czy wszystkie segmenty mają właściwości type i options
      areaSegments.forEach(segment => {
        if (!segment.type) {
          console.error(`Segment ${segment.name} (${segment.id}) has no type property`);
        }
        if (segment.type !== 'input' && segment.type !== 'slider' && !segment.options) {
          console.error(`Segment ${segment.name} (${segment.id}) has no options property`);
        }
      });
    });
  }, []);

  const handleOptionSelect = (categoryId: string, value: string) => {
    console.log(`Selected ${categoryId}: ${value}`);
    
    // Update selections
    setSelections(prev => {
      const updated = { ...prev, [categoryId]: value };
      console.log('Updated selections:', updated);
      return updated;
    });
    
    // Update active segments
    const updatedSegments = [...activeSegments];
    const segmentIndex = updatedSegments.findIndex(s => s.segmentId === categoryId);
    
    if (segmentIndex >= 0) {
      updatedSegments[segmentIndex] = {
        ...updatedSegments[segmentIndex],
        value: value
      };
    } else {
      updatedSegments.push({
        id: `active-${categoryId}`,
        segmentId: categoryId,
        value: value,
        visible: true,
        order: updatedSegments.length
      });
    }
    
    console.log('Updated active segments:', updatedSegments);
    setActiveSegments(updatedSegments);
    localStorage.setItem('activeSegments', JSON.stringify(updatedSegments));
  };

  const renderAreaMenu = () => {
    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Wybierz obszar</h2>
        <div className="grid grid-cols-1 gap-2">
          {mainAreas.map((area) => (
            <button
              key={area.id}
              className={`flex items-center justify-start p-3 h-auto border border-green-700 rounded ${selectedArea === area.id ? 'bg-green-900 bg-opacity-30' : 'bg-black'}`}
              onClick={() => {
                setSelectedArea(area.id);
                // Ustaw aktywną kategorię na pierwszą z wybranego obszaru
                const areaCategories = getSegmentsByAreaId(area.id);
                if (areaCategories.length > 0) {
                  setActiveCategory(areaCategories.findIndex(c => c.id === areaCategories[0].id));
                }
              }}
            >
              {React.isValidElement(area.icon) ? area.icon : null}
              <div className="flex flex-col items-start ml-2">
                <span className="font-medium">{area.name}</span>
                <span className="text-xs opacity-70 text-left">{area.emoji} {area.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderCategoryMenu = () => {
    const areaCategories = getSegmentsByAreaId(selectedArea);
    console.log('Area categories:', areaCategories);
    
    return (
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Kategorie</h3>
        <div className="flex flex-col space-y-1">
          {areaCategories.map((category, index) => {
            const categoryIndex = areaCategories.findIndex(c => c.id === category.id);
            return (
              <button
                key={category.id}
                className={`flex items-center p-2 border border-green-700 rounded ${categoryIndex === activeCategory ? 'bg-green-900 bg-opacity-30' : 'bg-black'}`}
                onClick={() => setActiveCategory(categoryIndex)}
              >
                {React.isValidElement(category.icon) ? category.icon : null}
                <span className="ml-2">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCategoryOptions = () => {
    // Pobierz wszystkie kategorie z aktualnie wybranego obszaru
    const areaCategories = getSegmentsByAreaId(selectedArea);
    console.log('Rendering options for area categories:', areaCategories);
    
    return (
      <div className="space-y-8">
        {areaCategories.map((category) => {
          console.log('Rendering category:', category);
          return (
          <div key={category.id} className="mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              {React.isValidElement(category.icon) ? category.icon : null}
              <span className="ml-2">{category.name}</span>
            </h2>
            
            {category.type === "input" ? (
              <div className="mb-4">
                <Input
                  placeholder={`Wprowadź ${category.name.toLowerCase()}`}
                  value={selections[category.id] || ""}
                  onChange={(e) => handleInputChange(e, category.id)}
                  className="w-full"
                />
              </div>
            ) : category.type === "slider" ? (
              <div className="mb-4">
                <Slider
                  defaultValue={[category.defaultValue as number || 50]}
                  min={category.min || 0}
                  max={category.max || 100}
                  step={category.step || 1}
                  onValueChange={(value) => handleSliderChange(value, category.id)}
                />
              </div>
            ) : category.options ? (
              <div className="mb-4">
                <ToggleGroup type="single" variant="outline" className="flex flex-wrap gap-2">
                  {category.options.map((option) => (
                    <ToggleGroupItem
                      key={option.id}
                      value={option.value}
                      className="flex items-center justify-start p-2 border border-green-700"
                      onClick={() => handleOptionSelect(category.id, option.value)}
                      data-state={selections[category.id] === option.value ? "on" : "off"}
                    >
                      <span>{option.label}</span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            ) : (
              <div className="mb-4">
                <p className="text-red-500">Brak opcji dla tego segmentu</p>
              </div>
            )}
          </div>
          );
        })}
      </div>
    );
  };

  const renderNavigationButtons = () => {
    return (
      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            const areaIndex = mainAreas.findIndex(a => a.id === selectedArea);
            if (areaIndex > 0) {
              const prevArea = mainAreas[areaIndex - 1].id;
              setSelectedArea(prevArea);
            }
          }}
          className="px-4 py-2 border border-green-700 rounded hover:bg-green-900 hover:bg-opacity-30 flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Poprzedni
        </button>
        <button
          onClick={() => {
            const areaIndex = mainAreas.findIndex(a => a.id === selectedArea);
            if (areaIndex < mainAreas.length - 1) {
              const nextArea = mainAreas[areaIndex + 1].id;
              setSelectedArea(nextArea);
            }
          }}
          className="px-4 py-2 border border-green-700 rounded hover:bg-green-900 hover:bg-opacity-30 flex items-center"
        >
          Następny
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    );
  };

  const handleNextCategory = () => {
    // Znajdź następną kategorię w tym samym obszarze
    const areaCategories = getSegmentsByAreaId(selectedArea);
    const currentIndex = areaCategories.findIndex(c => c.id === areaCategories[activeCategory].id);
    
    if (currentIndex < areaCategories.length - 1) {
      // Jeśli nie jest to ostatnia kategoria w obszarze, przejdź do następnej
      setActiveCategory(areaCategories.findIndex(c => c.id === areaCategories[currentIndex + 1].id));
    } else if (areaCategories.length > 0) {
      // Jeśli jest to ostatnia kategoria, przejdź do następnego obszaru
      const areaIndex = mainAreas.findIndex(a => a.id === selectedArea);
      if (areaIndex < mainAreas.length - 1) {
        const nextArea = mainAreas[areaIndex + 1].id;
        setSelectedArea(nextArea);
        const nextAreaCategories = getSegmentsByAreaId(nextArea);
        if (nextAreaCategories.length > 0) {
          setActiveCategory(nextAreaCategories.findIndex(c => c.id === nextAreaCategories[0].id));
        }
      }
    }
  };

  const handlePrevCategory = () => {
    // Znajdź poprzednią kategorię w tym samym obszarze
    const areaCategories = getSegmentsByAreaId(selectedArea);
    const currentIndex = areaCategories.findIndex(c => c.id === areaCategories[activeCategory].id);
    
    if (currentIndex > 0) {
      // Jeśli nie jest to pierwsza kategoria w obszarze, przejdź do poprzedniej
      setActiveCategory(areaCategories.findIndex(c => c.id === areaCategories[currentIndex - 1].id));
    } else if (areaCategories.length > 0) {
      // Jeśli jest to pierwsza kategoria, przejdź do poprzedniego obszaru
      const areaIndex = mainAreas.findIndex(a => a.id === selectedArea);
      if (areaIndex > 0) {
        const prevArea = mainAreas[areaIndex - 1].id;
        setSelectedArea(prevArea);
        const prevAreaCategories = getSegmentsByAreaId(prevArea);
        if (prevAreaCategories.length > 0) {
          setActiveCategory(prevAreaCategories.findIndex(c => c.id === prevAreaCategories[prevAreaCategories.length - 1].id));
        }
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "Tab") {
        handleNextCategory();
      } else if (e.key === "ArrowLeft" || (e.key === "Tab" && e.shiftKey)) {
        handlePrevCategory();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedArea, activeCategory]);

  // Funkcje obsługi zdarzeń
  const handleSliderChange = (value: number[], categoryId: string) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: value[0]
    }));
    
    // Update active segments
    const updatedSegments = [...activeSegments];
    const segmentIndex = updatedSegments.findIndex(s => s.segmentId === categoryId);
    
    if (segmentIndex >= 0) {
      updatedSegments[segmentIndex] = {
        ...updatedSegments[segmentIndex],
        value: value[0].toString()
      };
    } else {
      updatedSegments.push({
        id: `active-${categoryId}`,
        segmentId: categoryId,
        value: value[0].toString(),
        visible: true,
        order: updatedSegments.length
      });
    }
    
    setActiveSegments(updatedSegments);
    localStorage.setItem('activeSegments', JSON.stringify(updatedSegments));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    const value = e.target.value;
    
    setSelections(prev => ({
      ...prev,
      [categoryId]: value
    }));
    
    // Update active segments
    const updatedSegments = [...activeSegments];
    const segmentIndex = updatedSegments.findIndex(s => s.segmentId === categoryId);
    
    if (segmentIndex >= 0) {
      updatedSegments[segmentIndex] = {
        ...updatedSegments[segmentIndex],
        value: value
      };
    } else {
      updatedSegments.push({
        id: `active-${categoryId}`,
        segmentId: categoryId,
        value: value,
        visible: true,
        order: updatedSegments.length
      });
    }
    
    setActiveSegments(updatedSegments);
    localStorage.setItem('activeSegments', JSON.stringify(updatedSegments));
  };

  // Funkcja do generowania profilu na podstawie wybranych opcji
  const generateProfile = () => {
    let profileCode = "";
    
    // Dodaj wybrane opcje do kodu profilu
    Object.entries(selections).forEach(([key, value]) => {
      if (value) {
        profileCode += `${key}:${value} `;
      }
    });
    
    setProfile(profileCode.trim());
  };

  // Funkcja do kopiowania wygenerowanego kodu do schowka
  const copyToClipboard = () => {
    if (profile) {
      navigator.clipboard.writeText(profile)
        .then(() => {
          toast({
            title: "Skopiowano!",
            description: "Kod profilu został skopiowany do schowka.",
          });
        })
        .catch((error) => {
          console.error("Błąd podczas kopiowania:", error);
          toast({
            title: "Błąd!",
            description: "Nie udało się skopiować kodu profilu.",
            variant: "destructive",
          });
        });
    }
  };

  // Load active segments from localStorage
  useEffect(() => {
    const savedSegments = localStorage.getItem('activeSegments');
    if (savedSegments) {
      try {
        const parsedSegments = JSON.parse(savedSegments);
        console.log('Loaded active segments in Index:', parsedSegments);
        setActiveSegments(parsedSegments);
      } catch (e) {
        console.error('Error loading active segments:', e);
        initializeDefaultSegments();
      }
    } else {
      // Jeśli brak zapisanych segmentów, inicjalizuj domyślnymi
      initializeDefaultSegments();
    }
  }, []);

  // Initialize default segments if none exist
  const initializeDefaultSegments = () => {
    console.log('Initializing default segments');
    
    // Pobierz wszystkie kategorie z danych
    const allCategories = getSegmentsByAreaId('environment').map(cat => cat.id);
    console.log('All categories:', allCategories);
    
    // Utwórz domyślne segmenty dla wszystkich kategorii
    const defaultSegments: ActiveSegment[] = [];
    
    // Domyślne wartości dla wybranych kategorii
    const defaultValues = {
      // Środowisko pracy
      workplace: '🏢',
      officeType: 'O',
      culture: 'C3',
      
      // Zespół
      teamSize: 'S',
      communicationStyle: 'D',
      availability: '4',
      
      // Czas
      workHours: '40',
      workSchedule: '9-17',
      workPace: '⚡',
      
      // Sposób pracy
      learningStyle: '🛠️',
      problemSolving: '🔍',
      decisionMaking: '🧠',
      
      // Komunikacja
      feedbackStyle: '🎯',
      asyncPreference: 'A',
      
      // Adaptacja
      mobility: 'F3',
      locationMobility: '4',
      stressManagement: '🛡️',
      
      // Innowacja
      innovationLevel: '💡',
      projectPreference: '⏱️',
      synergy: '4',
      
      // Styl osobisty
      system: 'M',
      musicPreference: 'E',
      dressCode: 'BC',
      
      // Inne
      location: 'Remote',
      homePreference: '5'
    };
    
    // Przygotuj obiekt selections na podstawie defaultValues
    const newSelections = { ...selections };
    
    // Dodaj segmenty dla wszystkich kategorii
    allCategories.forEach((categoryId, index) => {
      // Jeśli istnieje domyślna wartość, użyj jej
      const value = defaultValues[categoryId] || '';
      
      // Dodaj segment
      defaultSegments.push({
        id: `active-${categoryId}`,
        segmentId: categoryId,
        value: value,
        visible: true,
        order: index
      });
      
      // Aktualizuj selections
      if (categoryId === 'workHours' || categoryId === 'locationMobility' || categoryId === 'homePreference') {
        // Dla pól liczbowych konwertuj string na number
        newSelections[categoryId] = value ? parseInt(value, 10) : 0;
      } else {
        // Dla pól string przypisz wartość bezpośrednio
        newSelections[categoryId] = value;
      }
    });
    
    console.log('Prepared new selections:', newSelections);
    setSelections(newSelections);
    setActiveSegments(defaultSegments);
    localStorage.setItem('activeSegments', JSON.stringify(defaultSegments));
    
    console.log('Default segments initialized:', defaultSegments);
  };

  // Update localStorage when selections change
  useEffect(() => {
    if (activeSegments.length === 0) return;
    
    // Map current selections to active segments
    const updatedSegments = activeSegments.map(segment => {
      if (segment.segmentId in selections) {
        return {
          ...segment,
          value: selections[segment.segmentId].toString()
        };
      }
      return segment;
    });
    
    setActiveSegments(updatedSegments);
    localStorage.setItem('activeSegments', JSON.stringify(updatedSegments));
  }, [selections]);

  // Generate profile code based on selections and active segments
  useEffect(() => {
    if (activeSegments.length === 0) {
      console.log('No active segments available yet');
      return;
    }
    
    console.log('Generating profile with active segments:', activeSegments);
    
    // Only include segments that are active (visible)
    const activeSegmentIds = new Set(
      activeSegments.filter(s => s.visible).map(s => s.segmentId)
    );
    
    console.log('Active segment IDs:', Array.from(activeSegmentIds));
    
    // Grupowanie segmentów na podstawie kategorii
    const categoryGroups = {};
    
    // Definiujemy grupy kategorii, które powinny być razem w kodzie
    const groupDefinitions = [
      // ŚRODOWISKO PRACY - wszystko związane z miejscem i otoczeniem pracy
      { 
        name: 'environment', 
        categories: ['workplace', 'officeType', 'culture'], 
        emoji: '🏢', 
        format: '{workplace}{officeType}·{culture}',
        description: 'Środowisko pracy'
      },
      
      // ZESPÓŁ - wszystko związane z ludźmi i współpracą
      { 
        name: 'team', 
        categories: ['teamSize', 'communicationStyle', 'availability'], 
        emoji: '👥', 
        format: '{teamSize}·{communicationStyle}·{availability}',
        description: 'Zespół i współpraca'
      },
      
      // CZAS - wszystko związane z czasem pracy
      { 
        name: 'time', 
        categories: ['workHours', 'workSchedule', 'workPace'], 
        emoji: '⏱️', 
        format: '{workHours}h·{workSchedule}·{workPace}',
        description: 'Czas pracy'
      },
      
      // SPOSÓB PRACY - styl myślenia i podejście do zadań
      { 
        name: 'workStyle', 
        categories: ['learningStyle', 'problemSolving', 'decisionMaking'], 
        emoji: '🧠', 
        format: '{learningStyle}·{problemSolving}·{decisionMaking}',
        description: 'Sposób pracy'
      },
      
      // KOMUNIKACJA - wszystko związane z komunikacją i feedbackiem
      { 
        name: 'communication', 
        categories: ['feedbackStyle', 'asyncPreference'], 
        emoji: '💬', 
        format: '{feedbackStyle}·{asyncPreference}',
        description: 'Komunikacja'
      },
      
      // ADAPTACJA - elastyczność i mobilność
      { 
        name: 'adaptation', 
        categories: ['mobility', 'locationMobility', 'stressManagement'], 
        emoji: '🔄', 
        format: '{mobility}·{locationMobility}·{stressManagement}',
        description: 'Adaptacja i elastyczność'
      },
      
      // INNOWACJA - kreatywność i podejście do projektów
      { 
        name: 'innovation', 
        categories: ['innovationLevel', 'projectPreference', 'synergy'], 
        emoji: '💡', 
        format: '{innovationLevel}·{projectPreference}·S{synergy}',
        description: 'Innowacja i kreatywność'
      },
      
      // STYL OSOBISTY - preferencje osobiste
      { 
        name: 'personal', 
        categories: ['system', 'musicPreference', 'dressCode'], 
        emoji: '🎭', 
        format: '{system}·{musicPreference}·{dressCode}',
        description: 'Styl osobisty'
      }
    ];
    
    // Generowanie kodu dla każdej grupy
    const codeSegments = [];
    
    // Funkcja pomocnicza do sprawdzania, czy grupa ma aktywne kategorie
    const hasActiveCategories = (categories) => {
      return categories.some(category => 
        activeSegmentIds.has(category) && 
        selections[category] && 
        selections[category].toString().trim() !== ''
      );
    };
    
    // Funkcja pomocnicza do formatowania kodu grupy
    const formatGroupCode = (group) => {
      let format = group.format;
      
      // Zastąp placeholdery wartościami
      group.categories.forEach(category => {
        const value = selections[category] || "";
        format = format.replace(`{${category}}`, value);
      });
      
      // Usuń puste wartości i popraw separatory
      format = format
        .replace(/·+/g, '·')         // Zamień wielokrotne kropki na jedną
        .replace(/^·|·$/g, '')       // Usuń kropki na początku i końcu
        .replace(/·+$/g, '')         // Usuń kropki na końcu
        .replace(/^·+/, '')          // Usuń kropki na początku
        .replace(/·+/g, '·');        // Jeszcze raz upewnij się, że nie ma podwójnych kropek
      
      return `${group.emoji} ${format}`;
    };
    
    // Generuj kod dla każdej grupy
    groupDefinitions.forEach(group => {
      if (hasActiveCategories(group.categories)) {
        const groupCode = formatGroupCode(group);
        if (groupCode.trim() !== group.emoji) { // Dodaj tylko jeśli nie jest to sam emoji
          codeSegments.push(groupCode);
        }
      }
    });
    
    // Znajdź aktywne kategorie, które nie są w żadnej zdefiniowanej grupie
    const definedCategories = new Set(
      groupDefinitions.flatMap(group => group.categories)
    );
    
    const otherActiveCategories = Array.from(activeSegmentIds)
      .filter(category => 
        !definedCategories.has(category) && 
        selections[category] && 
        selections[category].toString().trim() !== ''
      );
    
    // Jeśli są jakieś inne aktywne kategorie, dodaj je do kodu
    if (otherActiveCategories.length > 0) {
      const otherCode = otherActiveCategories
        .map(category => `${category.charAt(0).toUpperCase()}${selections[category]}`)
        .join('·');
      
      codeSegments.push(`⚙️ ${otherCode}`);
    }
    
    // Join all code segments with a separator
    const code = codeSegments.filter(Boolean).join(" | ");
    
    console.log('Generated profile code:', code);
    setProfile(code);
  }, [selections, activeSegments]);

  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col">
      <header className="border-b border-green-900 p-4">
        <div className="max-w-1xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Terminal className="h-7 w-7 mr-2" />
            {"ProfileCoder_v1.0"}
          </h1>
    
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Menu kategorii po lewej */}
        <div className="w-1/4 border-r border-green-900 p-4">
          {renderAreaMenu()}
          {renderCategoryMenu()}
        </div>

        {/* Zawartość po prawej */}
        <div className="w-3/4 p-6">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="border border-green-900 rounded-md p-6 bg-black bg-opacity-90 backdrop-blur-sm">
              {renderCategoryOptions()}
              {renderNavigationButtons()}
            </div>
            
            <div className="border border-green-900 rounded-md p-6 bg-black bg-opacity-90 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4">Wygenerowany Profil</h2>
              <div className="font-bold text-sm sm:text-base md:text-lg break-all bg-black p-4 rounded border border-green-700 font-mono">
                {profile || "Wybierz opcje aby wygenerować profil..."}
              </div>
              <button
                onClick={copyToClipboard}
                className="mt-4 px-4 py-2 border border-green-700 rounded hover:bg-green-900 hover:bg-opacity-30 w-full"
              >
                Kopiuj Profil
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-green-900 p-4 text-center text-xs bg-black bg-opacity-90">
        <div className="flex justify-between items-center">
          <p>Profile Coder v1.0 | Nawigacja: Klawiatura [←][→] lub Przyciski</p>
          <Link 
            to="/segment-manager" 
            className="flex items-center text-green-500 hover:text-green-400 transition-colors"
          >
            <Settings className="h-4 w-4 mr-1" />
            <span>Zarządzaj Segmentami</span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
