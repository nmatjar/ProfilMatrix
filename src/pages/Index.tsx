import React, { useState, useEffect, useCallback } from 'react';
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation';

// Skróty klawiszowe:
// - Strzałki (← →) lub klawisze VIM (h, l) - nawigacja między obszarami
// - Cyfry (1-9) - szybki dostęp do obszarów
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Terminal, Building, Home, Palette, Users, Globe, Clock, ArrowUpRight, Target, Sparkles, Zap, Gem, Bot, Smartphone, Lightbulb, Settings, MessageSquare, RefreshCw, Brain, User, ChevronLeft, ChevronRight, Cpu, Info, Coffee, Keyboard, FileSearch, HelpCircle } from "lucide-react";
import { KeyboardShortcutsInfo } from "@/components/KeyboardShortcutsInfo";
import { Link } from 'react-router-dom';
import { AboutModal } from "@/components/AboutModal";
import { Area, Segment, SegmentOption, SubOption, SegmentWithIcon } from '@/lib/segment-types';
import { getAllAreas, getSegmentsByArea } from '@/lib/segment-service';
import { DNACodeDisplay } from "@/components/DNACodeDisplay";
import { DNACodeMapping, ParsedDNASegment, dnaCategories, ensureAllSegmentsMapped, ensureSegmentEmojis, getDNACodeForValue, getDNAMappingForSegment, groupSegmentsByArea, parseDNACode } from "@/lib/dna-code-mapping";
import { segments as allSegments } from "@/lib/segment-data";
import { IntroAnimation } from "@/components/IntroAnimation";
import { QuantumSpaceModal } from "@/components/QuantumSpaceModal";

interface ActiveSegment {
  id: string;
  segmentId: string;
  value: string | string[];
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

// Pobierz obszary z serwisu zamiast hardkodowanej listy
const mainAreas: MainArea[] = getAllAreas().map(area => ({
  id: area.id,
  name: area.name,
  description: area.description,
  emoji: area.emoji,
  icon: area.icon
}));

function getSegmentsByAreaId(areaId: string): SegmentWithIcon[] {
  // Debug: Usunięto komunikat
  const segments = getSegmentsByArea(areaId);
  // Debug: Usunięto komunikat
  return segments;
}

const Index = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState("");
  const [parsedDnaCode, setParsedDnaCode] = useState<ParsedDNASegment[]>([]);
  const [activeSegments, setActiveSegments] = useState<ActiveSegment[]>([]);
  const [selections, setSelections] = useState<Record<string, string | number | string[]>>({});
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedArea, setSelectedArea] = useState(mainAreas[0].id);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [quantumModalOpen, setQuantumModalOpen] = useState(false);
  // Usunięto globalny przełącznik multiselect

  const handleAreaChange = useCallback((areaId: string) => {
    setSelectedArea(areaId);
  }, []);

  useKeyboardNavigation({
    areas: mainAreas,
    currentAreaId: selectedArea,
    onAreaChange: handleAreaChange,
  });

  // Sprawdź czy to pierwsze uruchomienie
  useEffect(() => {
    // Sprawdź czy aplikacja była już wcześniej uruchomiona
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    
    if (!hasSeenIntro) {
      // Jeśli to pierwsze uruchomienie, pokaż intro
      setShowIntro(true);
    }
  }, []);

  // Obsługa zakończenia intro
  const handleIntroComplete = () => {
    setShowIntro(false);
    localStorage.setItem('hasSeenIntro', 'true');
  };
  
  // Wczytaj zapisany stan aplikacji przy inicjalizacji
  useEffect(() => {
    // Wczytaj aktywne segmenty z localStorage
    const savedSegments = localStorage.getItem('activeSegments');
    if (savedSegments) {
      try {
        const parsedSegments = JSON.parse(savedSegments) as ActiveSegment[];
        // Debug: Usunięto komunikat
        setActiveSegments(parsedSegments);
        
        // Odtwórz stan selections na podstawie aktywnych segmentów
        const newSelections: Record<string, string | number | string[]> = {};
        parsedSegments.forEach(segment => {
          newSelections[segment.segmentId] = segment.value;
        });
        
        // Debug: Usunięto komunikat
        setSelections(newSelections);
        
        // Generuj kod DNA na podstawie wczytanych segmentów
        const segmentsByArea = groupSegmentsByArea(parsedSegments);
        ensureAllSegmentsMapped();
        const areaCodes = Object.entries(segmentsByArea)
          .map(([areaId, segments]) => {
            return formatDNACode(areaId, segments) || null;
          })
          .filter(Boolean);
          
        const fullDNACode = areaCodes.join(' ▪ ');
        // Debug: Usunięto komunikat
        setProfile(fullDNACode);
      } catch (error) {
        console.error('Błąd podczas parsowania zapisanych segmentów:', error);
      }
    }
    
    // Sprawdzanie poprawności segmentów
    // Debug: Usunięto komunikat
    // Debug: Usunięto komunikat
    
    // Sprawdźmy, czy wszystkie segmenty mają poprawnie ustawione właściwości type i options
    const allAreas = getAllAreas();
    allAreas.forEach(area => {
      const areaSegments = getSegmentsByArea(area.id);
      // Debug: Usunięto komunikat
      
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
    // Debug: Usunięto komunikat
    
    // Używam naszej funkcji pomocniczej do sprawdzenia, czy segment powinien obsługiwać multiselect
    const isMultiselect = isSegmentMultiselect(categoryId);
    // Debug: Usunięto komunikat
    
    // Sprawdźmy, czy segment jest w ogóle zdefiniowany
    const segmentDef = allSegments.find(s => s.id === categoryId);
    if (!segmentDef) {
      console.error(`Segment o ID ${categoryId} nie został znaleziony!`);
      return;
    }
    // Debug: Usunięto komunikat
    
    // Update selections
    let selectionUpdate;
    
    if (isMultiselect) {
      // Dla multiselect, pobierz aktualną wartość z selections
      const prevValue = selections[categoryId];
      let currentValue = [];
      
      // Jeśli poprzednia wartość to tablica, użyj jej
      if (Array.isArray(prevValue)) {
        currentValue = [...prevValue];
      } 
      // Jeśli był to pojedynczy string, przekształć na tablicę
      else if (prevValue) {
        currentValue = [prevValue.toString()];
      }
      
      // Jeśli wartość już istnieje, usuń ją; w przeciwnym razie dodaj
      if (currentValue.includes(value)) {
        selectionUpdate = { [categoryId]: currentValue.filter(v => v !== value) };
      } else {
        selectionUpdate = { [categoryId]: [...currentValue, value] };
      }
    } else {
      // Dla segmentów typu select, ustaw bezpośrednio nową wartość
      selectionUpdate = { [categoryId]: value };
    }
    
    // Aktualizuj stan selections
    const newSelections = { ...selections, ...selectionUpdate };
    // Debug: Usunięto komunikat
    setSelections(newSelections);
    
    // Update active segments - używając tej samej logiki co dla selections, aby zapewnić spójność
    let updatedValue;
    
    // Użyj wartości z selectionUpdate, aby zachować spójność
    if (isMultiselect) {
      updatedValue = selectionUpdate[categoryId]; // To już jest tablica
    } else {
      updatedValue = value; // Dla select używamy bezpośrednio wartości
    }
    
    // Znajdź indeks segmentu w activeSegments, jeśli istnieje
    const segmentIndex = activeSegments.findIndex(s => s.segmentId === categoryId);
    let updatedSegments = [...activeSegments];
    
    if (segmentIndex >= 0) {
      // Segment już istnieje - aktualizuj jego wartość
      updatedSegments[segmentIndex] = {
        ...updatedSegments[segmentIndex],
        value: updatedValue
      };
      
      // Debug: Aktualizacja istniejącego segmentu
    } else {
      // Segment nie istnieje - dodaj go
      updatedSegments.push({
        id: `active-${categoryId}`,
        segmentId: categoryId,
        value: updatedValue,
        visible: true,
        order: updatedSegments.length
      });
      
      // Debug: Dodano nowy segment
    }
    
    // Debug: Usunięto komunikat
    
    // Zapisz stan w localStorage
    localStorage.setItem('activeSegments', JSON.stringify(updatedSegments));
    
    // Ustaw aktywne segmenty 
    setActiveSegments(updatedSegments);
    
    // Generuj profil bezpośrednio, ale z użyciem zaktualizowanych danych
    // Nie czekamy na aktualizację stanu, tylko bezpośrednio używamy naszych świeżych danych
    const segmentsByArea = groupSegmentsByArea(updatedSegments as { 
      id: string, 
      segmentId: string, 
      value: string | string[], 
      visible: boolean, 
      order?: number 
    }[]);
    
    // Debug - sprawdź segmentsByArea po grupowaniu
    // Debug: Usunięto komunikat
    
    // Upewnij się, że wszystkie segmenty mają mapowania DNA
    ensureAllSegmentsMapped();
    
    // Generuj kod dla każdego obszaru
    const areaCodes = Object.entries(segmentsByArea)
      .map(([areaId, segments]) => {
        // Generowanie kodu dla obszaru
        const formattedCode = formatDNACode(areaId, segments);
        // Kod dla obszaru został wygenerowany
        return formattedCode ? formattedCode : null;
      })
      .filter(Boolean); // Usuń puste kody
    
    // Zebrano wszystkie kody obszarów
    
    // Połącz kody obszarów w jeden string z separatorem ▪
    const fullDNACode = areaCodes.join(' ▪ ');
    
    // Utworzono pełny kod DNA
    
    // Ustaw kod DNA natychmiast
    setProfile(fullDNACode);
  };

    // Funkcja pomocnicza do sprawdzania czy segment powinien być w trybie multiselect
  const isSegmentMultiselect = (segmentId: string): boolean => {
    // Sprawdza, czy segment jest zdefiniowany jako multiselect
    const segment = allSegments.find(s => s.id === segmentId);
    return segment?.type === 'multiselect';
  };

  const renderAreaMenu = () => {
    return (
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg font-semibold mb-2">Wybierz obszar</h2>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          {mainAreas.map((area) => (
            <button
              key={area.id}
              className={`flex flex-col md:flex-row items-start md:items-center justify-start p-2 md:p-3 h-auto border border-green-700 rounded ${selectedArea === area.id ? 'bg-green-900 bg-opacity-30' : 'bg-black'}`}
              onClick={() => {
                setSelectedArea(area.id);
                // Ustaw aktywną kategorię na pierwszą z wybranego obszaru
                const areaCategories = getSegmentsByAreaId(area.id);
                if (areaCategories.length > 0) {
                  setActiveCategory(areaCategories.findIndex(c => c.id === areaCategories[0].id));
                }
              }}
            >
              <span className="flex items-center justify-center md:justify-start w-full md:w-auto mb-1 md:mb-0">
                {React.isValidElement(area.icon) ? area.icon : null}
              </span>
              <div className="flex flex-col items-center md:items-start md:ml-2 w-full">
                <span className="font-medium text-center md:text-left text-sm md:text-base">{area.name}</span>
                <span className="text-xs opacity-70 text-center md:text-left hidden md:block">{area.emoji} {area.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderCategoryMenu = () => {
    const areaCategories = getSegmentsByAreaId(selectedArea);
    // Debug: Usunięto komunikat
    
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
    
    return (
      <div className="space-y-6">
        {areaCategories.map((category) => {
          return (
          <div key={category.id} className="mb-4">
            <h2 className="text-lg md:text-xl font-bold mb-3 flex items-center">
              <span className="flex items-center justify-center">
                {React.isValidElement(category.icon) ? category.icon : null}
              </span>
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
                {isSegmentMultiselect(category.id) ? (
                  // Dla multiselect, używamy ToggleGroup typu multiple
                  <div>
                    <div className="text-sm text-green-500 mb-2">Możesz wybrać wiele opcji</div>
                    <ToggleGroup 
                      type="multiple" 
                      variant="outline" 
                      className="flex flex-wrap gap-1 md:gap-2"
                      value={Array.isArray(selections[category.id]) ? 
                              selections[category.id] as string[] : 
                              []}
                      onValueChange={(values) => {
                        // Debug: Wartości zostały zmienione
                        
                        // Zabezpieczenie przed pustymi wartościami
                        const safeValues = Array.isArray(values) ? values : [];
                        
                        // Debug: Usunięto komunikat
                        
                        // Aktualizacja wyborów na podstawie nowych wartości
                        const newSelections = { ...selections, [category.id]: safeValues };
                        setSelections(newSelections);
                        
                        // Ręczna aktualizacja activeSegments
                        const segmentIndex = activeSegments.findIndex(s => s.segmentId === category.id);
                        let updatedSegments = [...activeSegments];
                        
                        if (segmentIndex >= 0) {
                          updatedSegments[segmentIndex] = {
                            ...updatedSegments[segmentIndex],
                            value: safeValues
                          };
                        } else {
                          // Jeśli segment nie istnieje, dodaj go
                          updatedSegments.push({
                            id: `active-${category.id}`,
                            segmentId: category.id,
                            value: safeValues,
                            visible: true,
                            order: updatedSegments.length
                          });
                        }
                        
                        // Debug: Zaktualizowano wartości segmentu
                        
                        // Zapisz aktualizacje
                        setActiveSegments(updatedSegments);
                        localStorage.setItem('activeSegments', JSON.stringify(updatedSegments));
                        
                        // Generuj kod DNA ręcznie z użyciem aktualnych danych
                        const segmentsByArea = groupSegmentsByArea(updatedSegments);
                        ensureAllSegmentsMapped();
                        
                        // Generuj kod dla każdego obszaru
                        const areaCodes = Object.entries(segmentsByArea)
                          .map(([areaId, segments]) => {
                            // Debug: Usunięto komunikat
                            const formattedCode = formatDNACode(areaId, segments);
                            return formattedCode ? formattedCode : null;
                          })
                          .filter(Boolean);
                        
                        // Połącz kody obszarów w jeden string
                        const fullDNACode = areaCodes.join(' ▪ ');
                        
                        // Ustaw kod DNA
                        setProfile(fullDNACode);
                      }}
                    >
                      {category.options.map((option) => {
                        // Sprawdź, czy opcja jest wybrana
                        const isSelected = Array.isArray(selections[category.id]) 
                          ? (selections[category.id] as string[])?.includes(option.value)
                          : false;
                        
                        return (
                          <Tooltip key={option.id}>
                            <TooltipTrigger asChild>
                              <ToggleGroupItem
                                value={option.value}
                                className="flex items-center justify-start p-1 md:p-2 text-xs md:text-sm border border-green-700"
                                data-state={isSelected ? "on" : "off"}
                              >
                                <span>{formatOptionLabel(option.label)}</span>
                                {extractDescription(option.label) && (
                                  <Info className="h-4 w-4 ml-1 text-green-400 opacity-70" />
                                )}
                              </ToggleGroupItem>
                            </TooltipTrigger>
                            <TooltipContent 
                              className="bg-black border border-green-700 text-green-400 p-2"
                              side="top"
                            >
                              {option.description || extractDescription(option.label)}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </ToggleGroup>
                  </div>
                ) : (
                  // Dla zwykłych segmentów, zachowujemy obecne zachowanie (single)
                  <ToggleGroup type="single" variant="outline" className="flex flex-wrap gap-1 md:gap-2">
                    {category.options.map((option) => (
                      <Tooltip key={option.id}>
                        <TooltipTrigger asChild>
                          <ToggleGroupItem
                            value={option.value}
                            className="flex items-center justify-start p-1 md:p-2 text-xs md:text-sm border border-green-700"
                            onClick={() => handleOptionSelect(category.id, option.value)}
                            data-state={selections[category.id] === option.value ? "on" : "off"}
                          >
                            <span>{formatOptionLabel(option.label)}</span>
                            {extractDescription(option.label) && (
                              <Info className="h-4 w-4 ml-1 text-green-400 opacity-70" />
                            )}
                          </ToggleGroupItem>
                        </TooltipTrigger>
                        <TooltipContent 
                          className="bg-black border border-green-700 text-green-400 p-2"
                          side="top"
                        >
                          {option.description || extractDescription(option.label)}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </ToggleGroup>
                )}
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
    // Debug: Usunięto komunikat
    
    // Upewnij się, że wszystkie segmenty mają mapowania DNA
    ensureAllSegmentsMapped();
    
    // Debug - sprawdź stan activeSegments przed grupowaniem
    // Debug: Usunięto komunikat
    
    // Sprawdź każdy segment przed grupowaniem
    activeSegments.forEach(segment => {
      // Debug: Usunięto komunikat
      // Debug: Przetwarzanie segmentu
      
      // Sprawdź, czy segment ma prawidłową wartość
      if (segment.value === undefined || segment.value === null || 
          (Array.isArray(segment.value) && segment.value.length === 0)) {
        console.warn(`[DEBUG generateProfile] Segment ${segment.segmentId} ma pustą wartość!`);
      }
    });
    
    // Pogrupuj segmenty według obszarów - typowanie zgodne z nowym interfejsem
    const segmentsByArea = groupSegmentsByArea(activeSegments as { 
      id: string, 
      segmentId: string, 
      value: string | string[], 
      visible: boolean, 
      order?: number 
    }[]);
    
    // Debug - sprawdź segmentsByArea po grupowaniu
    // Debug: Usunięto komunikat
    
    // Generuj kod dla każdego obszaru
    const areaCodes = Object.entries(segmentsByArea)
      .map(([areaId, segments]) => {
        // Debug: Usunięto komunikat
        const formattedCode = formatDNACode(areaId, segments);
        // Debug: Usunięto komunikat
        return formattedCode ? formattedCode : null;
      })
      .filter(Boolean); // Usuń puste kody
    
    // Zebrano wszystkie kody obszarów
    
    // Połącz kody obszarów w jeden string z separatorem ▪
    const fullDNACode = areaCodes.join(' ▪ ');
    
    // Utworzono pełny kod DNA
    
    // Ustaw kod DNA
    setProfile(fullDNACode);
    
    // Zapisz kod DNA w localStorage
    localStorage.setItem('dnaCode', fullDNACode);
    
    // Kod DNA został pomyślnie wygenerowany
    
    // Parsuj kod DNA
    const parsed = parseDNACode(fullDNACode);
    setParsedDnaCode(parsed);
    
    toast({
      title: "Wygenerowano profil DNA!",
      description: "Twój unikalny kod DNA został utworzony.",
    });
  };

  // Funkcja do kopiowania wygenerowanego kodu do schowka
  const resetProfile = () => {
    setActiveSegments([])
    setSelections({})
    setProfile("")
    setParsedDnaCode([])
    setActiveCategory(0)
    setSelectedArea(mainAreas[0].id)
    toast({
      title: "Profil zresetowany",
      description: "Wszystkie ustawienia zostały wyczyszczone.",
    })
  }

  const copyToClipboard = () => {
    if (profile) {
      // Użyj oryginalnego kodu DNA z ukrytego inputa
      const rawDnaCode = document.getElementById('raw-dna-code')?.getAttribute('value') || profile
      navigator.clipboard.writeText(rawDnaCode)
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
        // Debug: Usunięto komunikat
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
    // Debug: Usunięto komunikat
    
    // Pobierz wszystkie kategorie z danych
    const allCategories = getSegmentsByAreaId('environment').map(cat => cat.id);
    // Debug: Usunięto komunikat
    
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
    
    // Debug: Usunięto komunikat
    setSelections(newSelections);
    setActiveSegments(defaultSegments);
    localStorage.setItem('activeSegments', JSON.stringify(defaultSegments));
    
    // Debug: Usunięto komunikat
  };

  // Update localStorage when selections change
  useEffect(() => {
    if (activeSegments.length === 0) return;
    
    // Map current selections to active segments
    const updatedSegments = activeSegments.map(segment => {
      if (segment.segmentId in selections) {
        // Sprawdzamy typ segmentu, aby określić, jak mamy obsłużyć wartość
        const segmentDef = allSegments.find(s => s.id === segment.segmentId);
        const isMultiselect = segmentDef?.type === 'multiselect';
        
        if (isMultiselect) {
          // Dla multiselect, nie konwertujemy wartości, tylko przekazujemy tablicę
          const value = selections[segment.segmentId];
          // Debug: Usunięto komunikat
          const result = {
            ...segment,
            value: Array.isArray(value) ? value : (value ? [value.toString()] : [])
          };
          // Debug: Usunięto komunikat
          return result;
        } else {
          // Dla innych typów segmetów, zachowujemy dotychczasową logikę
          const value = selections[segment.segmentId];
          return {
            ...segment,
            value: (typeof value === 'number' || typeof value === 'string') ? value.toString() : value[0].toString()
          };
        }
      }
      return segment;
    });
    
    setActiveSegments(updatedSegments);
    localStorage.setItem('activeSegments', JSON.stringify(updatedSegments));
  }, [selections]);

  // Funkcja formatująca kod DNA
  const formatDNACode = (areaId: string, segments: { segmentId: string, value: string | number | string[] }[]) => {
    // Debug: Usunięto komunikat
    
    // Upewnij się, że wszystkie segmenty mają ustawione segmentEmoji
    const updatedMappings = ensureSegmentEmojis()
    
    const areaMapping = dnaCategories.find(c => c.id === areaId)
    const areaEmoji = areaMapping?.emoji || '🔹'
    // Debug: Usunięto komunikat
    
    // Sprawdź, czy wszystkie segmenty mają wartości
    segments.forEach(segment => {
      // Debug: Przetwarzanie segmentu i jego wartości
    });
    
    const segmentPairs = segments.map(segment => {
      // Znajdź mapowanie dla segmentu z zaktualizowanych mappingów
      const mapping = updatedMappings.find(m => m.segmentId === segment.segmentId)
      if (!mapping) {
        // Debug: Usunięto komunikat
        return ''
      }
      
      // Znajdź segment w allSegments
      const segmentData = allSegments.find(s => s.id === segment.segmentId)
      if (!segmentData || !segmentData.code) {
        // Debug: Usunięto komunikat
        return ''
      }
      
      // Przekształcenie wartości segmentu na kod DNA
      
      const valueCode = getDNACodeForValue(segment.segmentId, segment.value)
      // Kod wartości został wygenerowany
      
      if (!valueCode) {
        // Brak kodu wartości dla segmentu
        return ''
      }
      
      // Użyj emoji segmentu i wartości (bez kodu segmentu)
      const segmentEmoji = mapping.segmentEmoji || mapping.emoji || '🔹'
      // Tworzenie kodu segmentu z emoji i wartości
      const result = `${segmentEmoji}=${valueCode}`;
      // Kod segmentu został wygenerowany
      return result;
    }).filter(Boolean);
    
    const result = `${areaEmoji}{${segmentPairs.join(';')}}`
    // Kod dla całego obszaru został wygenerowany
    return result
  }

  // Efekt do generowania profilu
  useEffect(() => {
    // Upewnij się, że wszystkie segmenty mają mapowania DNA
    ensureAllSegmentsMapped();
    
    // Pogrupuj segmenty według obszarów - typowanie zgodne z nowym interfejsem
    const segmentsByArea = groupSegmentsByArea(activeSegments as { 
      id: string, 
      segmentId: string, 
      value: string | string[], 
      visible: boolean, 
      order?: number 
    }[]);
    // Debug: Usunięto komunikat
    
    // Generuj kod dla każdego obszaru
    const areaCodes = Object.entries(segmentsByArea)
      .map(([areaId, segments]) => {
        // Debug: Usunięto komunikat
        const formattedCode = formatDNACode(areaId, segments);
        return formattedCode ? formattedCode : null;
      })
      .filter(Boolean); // Usuń puste kody
    
    // Połącz kody obszarów w jeden string z separatorem ▪
    const fullDNACode = areaCodes.join(' ▪ ');
    
    // Ustaw kod DNA
    setProfile(fullDNACode);
    
    // Zapisz kod DNA w localStorage
    localStorage.setItem('dnaCode', fullDNACode);
    
    // Kod DNA został pomyślnie wygenerowany
  }, [activeSegments]);

  // Efekt do parsowania kodu DNA
  useEffect(() => {
    if (!profile) return
    
    // Parsuj kod DNA
    const parsed = parseDNACode(profile);
    setParsedDnaCode(parsed);
  }, [profile]);

  // Funkcja pomocnicza do wyciągania opisu z etykiety (tekst w nawiasie)
  const extractDescription = (label: string): string => {
    const match = label.match(/\(([^)]+)\)/);
    return match ? match[1] : '';
  };

  // Funkcja pomocnicza do formatowania etykiety (usuwanie tekstu w nawiasie)
  const formatOptionLabel = (label: string): string => {
    return label.replace(/\s*\([^)]*\)\s*/, '');
  };

  return (
    <TooltipProvider>
      <IntroAnimation isVisible={showIntro} onComplete={handleIntroComplete} />
      <AboutModal open={aboutOpen} onOpenChange={setAboutOpen} />
      <QuantumSpaceModal open={quantumModalOpen} onOpenChange={setQuantumModalOpen} dnaCode={profile} />
      <div className="min-h-screen bg-black text-green-500 flex flex-col">
        <header className="border-b border-green-900 p-4">
          <div className="max-w-1xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <Terminal className="h-7 w-7 mr-2" />
              {"ProfilMatrix"}
            </h1>
            
            <div className="flex gap-3">
              <Link to="/dna-decoder">
                <Button 
                  variant="outline" 
                  className="border-green-700 hover:bg-green-900 hover:bg-opacity-30 font-mono flex items-center gap-2"
                >
                  <Brain className="h-4 w-4" />
                  <span>Dekoder DNA</span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-green-700 hover:bg-green-900 hover:bg-opacity-30 font-mono flex items-center gap-2"
                onClick={() => setAboutOpen(true)}
              >
                <HelpCircle className="h-4 w-4" />
                <span>About</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col md:flex-row">
          {/* Menu kategorii po lewej - na mobilnych u góry */}
          <div className="w-full md:w-1/4 md:border-r border-green-900 p-2 md:p-4">
            {renderAreaMenu()}
          </div>

          {/* Zawartość po prawej - na mobilnych poniżej */}
          <div className="w-full md:w-3/4 p-3 md:p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="border border-green-900 rounded-md p-6 bg-black bg-opacity-90 backdrop-blur-sm">
                {renderCategoryOptions()}
                {renderNavigationButtons()}
              </div>
              
              <div className="border border-green-900 rounded-md p-6 bg-black bg-opacity-90 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4">Wygenerowany Profil DNA</h2>
                <div className="mt-4 p-4 rounded border border-green-700 bg-black/50">
                  <DNACodeDisplay rawCode={profile || "Wybierz opcje aby wygenerować profil..."} />
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 px-4 py-2 border border-green-700 rounded hover:bg-green-900 hover:bg-opacity-30"
                    >
                      Kopiuj Profil
                    </button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={resetProfile}
                          className="px-4 py-2 border border-red-700 rounded hover:bg-red-900 hover:bg-opacity-30 text-red-500 hover:text-red-400"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Resetuj profil DNA</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {profile && (
                    <Button 
                      className="w-full bg-gradient-to-r from-green-900 to-blue-900 hover:from-green-800 hover:to-blue-800 text-xs border border-green-600 py-4 flex items-center gap-2 group relative overflow-hidden"
                      onClick={() => setQuantumModalOpen(true)}
                    >
                      <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity"></div>
                      <div className="relative z-10 flex items-center justify-center w-full font-mono">
                        <Sparkles className="h-4 w-4 mr-2 text-cyan-300" />
                        <span>Dodaj swój profil do kwantowej przestrzeni możliwości</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <KeyboardShortcutsInfo />

        <footer className="border-t border-green-900 p-4 text-center text-xs bg-black bg-opacity-90">
          <div className="flex justify-between items-center">
            <p>ProfilMatrix v1.0 | Nawigacja: Klawiatura [←][→] lub Przyciski</p>
            <div className="flex items-center space-x-4">
              <Link 
                to="/dna-decoder" 
                className="flex items-center text-green-500 hover:text-green-400 transition-colors"
              >
                <FileSearch className="h-4 w-4 mr-1" />
                <span>Dekoder DNA</span>
              </Link>
              <Link 
                to="/segment-manager" 
                className="flex items-center text-green-500 hover:text-green-400 transition-colors"
              >
                <Settings className="h-4 w-4 mr-1" />
                <span>Zarządzaj Segmentami</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default Index;
