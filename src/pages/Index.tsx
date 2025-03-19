
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Terminal, Building, Home, Palette, Users, Globe, Clock, ArrowUpRight, Target, Sparkles, Zap, Gem, Robot, Smartphone, Lightbulb } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);
  const [selections, setSelections] = useState({
    workplace: "",
    mobility: "",
    culture: "",
    potential: 67,
    transformation: "3",
    availability: "3",
    synergy: "3",
    workHours: 40,
    location: "Remote",
    locationMobility: 5,
    homePreference: 4,
    workSchedule: "6-14",
    system: "Win",
    musicPreference: 4,
    asyncPreference: 3
  });

  // Categories and their options
  const categories = [
    {
      id: "workplace",
      name: "Typ Miejsca Pracy",
      icon: <Building className="h-5 w-5 mr-2" />,
      options: [
        { id: "corporate", label: "🏢 Korporacja", value: "🏢" },
        { id: "remote", label: "🏡 Remote", value: "🏡" },
        { id: "creative", label: "🎨 Kreatywne", value: "🎨" },
        { id: "social", label: "🤝 Społeczne", value: "🤝" }
      ]
    },
    {
      id: "mobility",
      name: "Mobilność",
      icon: <ArrowUpRight className="h-5 w-5 mr-2" />,
      options: [
        { id: "f1", label: "F1 (Stała)", value: "F1" },
        { id: "f3", label: "F3 (Elastyczna)", value: "F3" },
        { id: "f5", label: "F5 (Pełna)", value: "F5" }
      ]
    },
    {
      id: "culture",
      name: "Kultura",
      icon: <Users className="h-5 w-5 mr-2" />,
      options: [
        { id: "c1", label: "C1 (Hierarchiczna)", value: "C1" },
        { id: "c3", label: "C3 (Hybrydowa)", value: "C3" },
        { id: "c5", label: "C5 (Płaska)", value: "C5" }
      ]
    },
    {
      id: "potential",
      name: "Potencjał (P0-100)",
      icon: <Sparkles className="h-5 w-5 mr-2" />,
      type: "slider"
    },
    {
      id: "transformation",
      name: "Transformacja",
      icon: <Target className="h-5 w-5 mr-2" />,
      options: [
        { id: "t1", label: "T1 (0-20%)", value: "1" },
        { id: "t2", label: "T2 (20-40%)", value: "2" },
        { id: "t3", label: "T3 (40-60%)", value: "3" },
        { id: "t4", label: "T4 (60-80%)", value: "4" },
        { id: "t5", label: "T5 (80-100%)", value: "5" }
      ]
    },
    {
      id: "availability",
      name: "Dostępność",
      icon: <Clock className="h-5 w-5 mr-2" />,
      options: [
        { id: "a1", label: "A1 (Minimalna)", value: "1" },
        { id: "a2", label: "A2 (Ograniczona)", value: "2" },
        { id: "a3", label: "A3 (Standardowa)", value: "3" },
        { id: "a4", label: "A4 (Zwiększona)", value: "4" },
        { id: "a5", label: "A5 (Pełna)", value: "5" }
      ]
    },
    {
      id: "synergy",
      name: "Synergia",
      icon: <Zap className="h-5 w-5 mr-2" />,
      options: [
        { id: "s1", label: "S1 (Podstawowa)", value: "1" },
        { id: "s2", label: "S2 (Umiarkowana)", value: "2" },
        { id: "s3", label: "S3 (Znacząca)", value: "3" },
        { id: "s4", label: "S4 (Wysoka)", value: "4" },
        { id: "s5", label: "S5 (Maksymalna)", value: "5" }
      ]
    },
    {
      id: "workHours",
      name: "Godziny Pracy",
      icon: <Clock className="h-5 w-5 mr-2" />,
      type: "input"
    },
    {
      id: "location",
      name: "Lokalizacja",
      icon: <Globe className="h-5 w-5 mr-2" />,
      type: "input"
    },
    {
      id: "additionalPreferences",
      name: "Dodatkowe Preferencje",
      icon: <Gem className="h-5 w-5 mr-2" />,
      subCategories: [
        {
          id: "system",
          name: "System",
          icon: <Terminal className="h-4 w-4 mr-2" />,
          options: [
            { id: "win", label: "Windows", value: "Win" },
            { id: "mac", label: "MacOS", value: "Mac" },
            { id: "linux", label: "Linux", value: "Linux" }
          ]
        },
        {
          id: "workSchedule",
          name: "Godziny pracy",
          icon: <Clock className="h-4 w-4 mr-2" />,
          options: [
            { id: "early", label: "6-14", value: "6-14" },
            { id: "standard", label: "9-17", value: "9-17" },
            { id: "late", label: "12-20", value: "12-20" },
            { id: "flexible", label: "Elastyczne", value: "Flex" }
          ]
        }
      ]
    }
  ];

  // Update profile code when selections change
  useEffect(() => {
    const { 
      workplace, mobility, culture, potential, transformation, 
      availability, synergy, workHours, locationMobility, system
    } = selections;

    // Generate profile code based on selections
    const code = [
      workplace ? `${workplace}⇄🌐.${mobility}.${culture}` : "",
      potential ? `💫P${potential}.${transformation}.${availability}` : "",
      `🎯A→T.T${transformation}.${potential}`,
      `↗️🌐⬆️.${locationMobility}${locationMobility}`,
      workplace ? `🌍${workplace}⇄🌐.${mobility}.${culture}` : "",
      workHours ? `⏰${workHours}h.${mobility}` : "",
      `💎🤖📱.A${availability}`,
      `⚡🎨💡.S${synergy}`
    ].filter(Boolean).join("|");

    setProfile(code);
  }, [selections]);

  const handleOptionSelect = (categoryId, value) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: value
    }));

    toast({
      title: "Wybrano opcję",
      description: `Zaktualizowano: ${categoryId} = ${value}`,
    });
  };

  const handleNextCategory = () => {
    setActiveCategory(prev => (prev + 1) % categories.length);
  };

  const handlePrevCategory = () => {
    setActiveCategory(prev => (prev - 1 + categories.length) % categories.length);
  };

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(profile);
    toast({
      title: "Skopiowano",
      description: "Profil został skopiowany do schowka",
    });
  };

  // Keyboard navigation
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
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col">
      {/* Header */}
      <header className="border-b border-green-900 p-4 flex justify-between items-center bg-black bg-opacity-90 backdrop-blur-sm">
        <div className="flex items-center">
          <Terminal className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-bold tracking-tight">ProfileCoder_v1.0</h1>
        </div>
        <div className="text-xs">
          <span className="mr-2">◀︎ [ArrowLeft]</span>
          <span>▶︎ [ArrowRight]</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar with categories */}
        <div className="md:w-64 border-r border-green-900 bg-black bg-opacity-80">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Kategorie</h2>
            <nav className="space-y-1">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(index)}
                  className={`w-full text-left flex items-center p-2 rounded ${
                    activeCategory === index
                      ? 'bg-green-900 bg-opacity-30 text-green-400 border-l-2 border-green-400'
                      : 'hover:bg-green-900 hover:bg-opacity-10'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Current category selection */}
            <div className="border border-green-900 rounded-md p-6 bg-black bg-opacity-90 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                {categories[activeCategory].icon}
                <span>{categories[activeCategory].name}</span>
              </h2>

              {/* Render different inputs based on category type */}
              {categories[activeCategory].type === "slider" ? (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                  <Slider
                    value={[selections[categories[activeCategory].id]]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleOptionSelect(categories[activeCategory].id, value[0])}
                    className="w-full"
                  />
                  <div className="text-center text-2xl font-bold mt-4">
                    {selections[categories[activeCategory].id]}
                  </div>
                </div>
              ) : categories[activeCategory].type === "input" ? (
                <Input
                  value={selections[categories[activeCategory].id]}
                  onChange={(e) => handleOptionSelect(categories[activeCategory].id, e.target.value)}
                  className="bg-black border-green-700 text-green-500"
                  placeholder={`Wprowadź ${categories[activeCategory].name.toLowerCase()}...`}
                />
              ) : categories[activeCategory].subCategories ? (
                <div className="space-y-6">
                  {categories[activeCategory].subCategories.map(subcategory => (
                    <div key={subcategory.id} className="space-y-2">
                      <h3 className="text-md font-semibold flex items-center">
                        {subcategory.icon}
                        {subcategory.name}
                      </h3>
                      <ToggleGroup 
                        type="single" 
                        value={selections[subcategory.id]}
                        onValueChange={(value) => value && handleOptionSelect(subcategory.id, value)}
                        className="flex flex-wrap gap-2"
                      >
                        {subcategory.options.map(option => (
                          <ToggleGroupItem 
                            key={option.id} 
                            value={option.value}
                            className="bg-black border border-green-700 data-[state=on]:bg-green-900 data-[state=on]:text-green-400"
                          >
                            {option.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  ))}
                </div>
              ) : (
                <ToggleGroup 
                  type="single" 
                  value={selections[categories[activeCategory].id]}
                  onValueChange={(value) => value && handleOptionSelect(categories[activeCategory].id, value)}
                  className="flex flex-wrap gap-2"
                >
                  {categories[activeCategory].options.map(option => (
                    <ToggleGroupItem 
                      key={option.id} 
                      value={option.value}
                      className="bg-black border border-green-700 data-[state=on]:bg-green-900 data-[state=on]:text-green-400"
                    >
                      {option.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}

              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrevCategory}
                  className="px-4 py-2 border border-green-700 rounded hover:bg-green-900 hover:bg-opacity-30 flex items-center"
                >
                  <span className="mr-2">◀︎</span> Poprzedni
                </button>
                <button
                  onClick={handleNextCategory}
                  className="px-4 py-2 border border-green-700 rounded hover:bg-green-900 hover:bg-opacity-30 flex items-center"
                >
                  Następny <span className="ml-2">▶︎</span>
                </button>
              </div>
            </div>

            {/* Profile code display */}
            <div className="border border-green-900 rounded-md p-6 bg-black bg-opacity-90 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4">Wygenerowany Profil</h2>
              <div className="font-bold text-sm sm:text-base md:text-lg break-all bg-black p-4 rounded border border-green-700 font-mono">
                {profile || "Wybierz opcje aby wygenerować profil..."}
              </div>
              <button
                onClick={handleCopyProfile}
                className="mt-4 px-4 py-2 border border-green-700 rounded hover:bg-green-900 hover:bg-opacity-30 w-full"
              >
                Kopiuj Profil
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-900 p-4 text-center text-xs bg-black bg-opacity-90">
        <p>Profile Coder v1.0 | Nawigacja: Klawiatura [←][→] lub Przyciski</p>
      </footer>
    </div>
  );
};

export default Index;
