import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { segments as allSegments } from '@/lib/segment-data'
import areasData from '@/data/areas.json'

interface DNADecodingAnimationProps {
  isDecoding: boolean
  onComplete: () => void
  dnaCode: string
}

export function DNADecodingAnimation({ isDecoding, onComplete, dnaCode }: DNADecodingAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [decodedCharacters, setDecodedCharacters] = useState<string[]>([])
  const [randomChars, setRandomChars] = useState<{char: string, x: number, y: number, opacity: number}[]>([])
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState<string>('Inicjalizacja analizy DNA...')
  const [detailedMessages, setDetailedMessages] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Znaki używane w animacji "hackowania"
  const hackChars = '01αβγδεζηθικλμνξοπρστυφχψωABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,./<>?'
  
  // Czyszczenie timeoutów przy odmontowaniu
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
  
  // Główna logika animacji
  useEffect(() => {
    if (!isDecoding) {
      setProgress(0)
      setDecodedCharacters([])
      setRandomChars([])
      return
    }
    
    // Generowanie początkowych losowych znaków
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight
      
      const newRandomChars = []
      for (let i = 0; i < 100; i++) {
        newRandomChars.push({
          char: hackChars[Math.floor(Math.random() * hackChars.length)],
          x: Math.random() * containerWidth,
          y: Math.random() * containerHeight,
          opacity: Math.random() * 0.7 + 0.3
        })
      }
      setRandomChars(newRandomChars)
    }
    
    // Przygotuj dane do symulacji analizy segmentów
    const analysisSteps = [
      { progress: 5, message: 'Inicjalizacja analizy DNA...' },
      { progress: 15, message: 'Identyfikacja struktury kodu...' },
      { progress: 20, message: 'Walidacja formatu DNA...' },
      { progress: 30, message: 'Rozpoznawanie głównych obszarów...' },
      { progress: 45, message: 'Ekstrakcja segmentów DNA...' },
      { progress: 60, message: 'Dekodowanie wartości segmentów...' },
      { progress: 75, message: 'Generowanie profilu osobowości...' },
      { progress: 90, message: 'Finalizacja struktury DNA...' },
      { progress: 95, message: 'Inicjalizacja systemu wizualizacji...' },
      { progress: 98, message: 'Finalizacja analizy...' },
    ]

    // Generuj przykładowe szczegółowe komunikaty dla symulacji
    const generateDetailedMessages = () => {
      const detailTypeMessages = [
        'Analiza sekwencji genetycznej...',
        'Rozpoznawanie wzorca DNA...',
        'Ekstrakcja wartości kodujących...',
        'Dekodowanie znaczników...',
        'Mapowanie wartości do profilu...',
        'Obliczanie korelacji międzysegmentowej...',
        'Walidacja integralności danych...',
      ]

      // Losowe obszary i segmenty z faktycznych danych
      const areaItems = areasData.map((area: { emoji: string; name: string; id: string }) => ({
        emoji: area.emoji,
        name: area.name,
        message: `Analiza obszaru ${area.emoji} ${area.name}...`
      }))

      const segmentItems = allSegments.map(segment => ({
        emoji: segment.emoji,
        name: segment.name,
        message: `Dekodowanie segmentu ${segment.emoji} ${segment.name}...`
      }))

      const allDetails: string[] = [...detailTypeMessages]
      
      // Dodaj komunikaty o obszarach i segmentach
      areaItems.forEach(area => {
        allDetails.push(area.message)
      })
      
      segmentItems.forEach(segment => {
        allDetails.push(segment.message)
      })

      // Dodaj przykładowe szczegółowe komunikaty o wartościach
      const valueMessages = [
        'Identyfikacja wartości kluczowych...',
        'Mapowanie relacji przyczynowo-skutkowych...',
        'Analiza wzorców zachowań...',
        'Korelacja z bazą danych profili psychologicznych...',
        'Obliczanie wag segmentów...',
        'Analiza możliwych mutacji genetycznych...',
        'Symulacja alternatywnych ścieżek rozwoju...',
      ]
      
      return [...allDetails, ...valueMessages]
    }

    const allDetailedMessages = generateDetailedMessages()
    setDetailedMessages(allDetailedMessages)
    
    // Dekodowanie znaków jeden po drugim
    let currentIndex = 0
    let currentMessageIndex = 0
    const decodingSpeed = Math.max(10, Math.min(50, 3000 / dnaCode.length)) // 10-50ms per character
    const messageUpdateInterval = Math.floor(dnaCode.length / (allDetailedMessages.length * 1.5))
    
    const decodeNextChar = () => {
      if (currentIndex < dnaCode.length) {
        const newDecodedChars = [...dnaCode.slice(0, currentIndex + 1).split('')]
        setDecodedCharacters(newDecodedChars)
        currentIndex++
        const currentProgress = Math.floor((currentIndex / dnaCode.length) * 100)
        setProgress(currentProgress)
        
        // Aktualizuj główny komunikat o analizie na podstawie postępu
        for (const step of analysisSteps) {
          if (currentProgress >= step.progress && currentProgress < (step.progress + 10)) {
            setCurrentAnalysisStep(step.message)
            break
          }
        }
        
        // Aktualizuj szczegółowe komunikaty co pewien czas
        if (currentIndex % messageUpdateInterval === 0 && currentMessageIndex < allDetailedMessages.length) {
          const newMessage = allDetailedMessages[currentMessageIndex];
          if (newMessage) {
            setDetailedMessages(prev => [
              newMessage,
              ...prev.slice(0, 4) // Zachowaj tylko 5 ostatnich wiadomości
            ])
          }
          currentMessageIndex++
        }
        
        // Aktualizacja losowych znaków
        setRandomChars(prev => 
          prev.map(char => ({
            ...char,
            char: hackChars[Math.floor(Math.random() * hackChars.length)],
            opacity: Math.random() * 0.7 + 0.3
          }))
        )
        
        timeoutRef.current = setTimeout(decodeNextChar, decodingSpeed)
      } else {
        // Zakończenie animacji
        setCurrentAnalysisStep('Analiza zakończona. Generowanie wizualizacji...')
        setProgress(100)
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    }
    
    // Inicjalizacja tablicy komunikatów przed startem
    if (detailedMessages.length === 0) {
      setDetailedMessages(['Inicjalizacja systemu dekodowania...'])
    }
      
    // Start animacji z opóźnieniem 300ms
    timeoutRef.current = setTimeout(() => {
      decodeNextChar()
    }, 300)
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isDecoding, dnaCode, onComplete])
  
  if (!isDecoding) return null
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        style={{ backdropFilter: 'blur(3px)' }}
      >
        <motion.div 
          className="max-w-4xl w-full mx-auto p-8 border border-green-700 bg-black bg-opacity-90 rounded-lg shadow-lg shadow-green-900/30 text-green-400 relative overflow-hidden"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 14 }}
          ref={containerRef}
        >
          <h2 className="text-2xl font-mono mb-4 flex items-center">
            <span className="text-3xl mr-2">⚙️</span> 
            Dekodowanie profilu DNA
          </h2>
          
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            {randomChars.map((char, index) => (
              <motion.div
                key={`random-${index}`}
                className="absolute font-mono text-sm"
                initial={{ opacity: char.opacity }}
                animate={{ 
                  opacity: [char.opacity, char.opacity * 0.5, char.opacity],
                  color: ['#4ade80', '#22c55e', '#4ade80']
                }}
                transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                style={{ left: char.x, top: char.y }}
              >
                {char.char}
              </motion.div>
            ))}
          </div>
          
          <div className="relative z-10 space-y-5">
            <div className="bg-black border border-green-800 rounded-lg p-4 font-mono text-sm overflow-hidden">
              <div className="mb-2 text-green-600 flex items-center text-xs">
                <div className="animate-pulse mr-2">●</div>
                <span>TERMINAL_DNA_PROFILER &gt; wykonywanie dekodowania...</span>
              </div>
              
              <div className="h-20 overflow-y-auto whitespace-pre-wrap break-all">
                {decodedCharacters.map((char, index) => (
                  <motion.span
                    key={`decoded-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span 
                  className="inline-block h-4 w-2 ml-1 bg-green-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Proces analizy: {progress}%</span>
                <span>{progress === 100 ? "Zakończono" : "Przetwarzanie..."}</span>
              </div>
              <div className="w-full bg-green-900 bg-opacity-20 rounded-full h-2.5">
                <motion.div 
                  className="bg-green-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', damping: 10 }}
                />
              </div>
            </div>
            
            <div className="text-center opacity-80 font-mono space-y-2">
              {/* Główny status */}
              <div className="text-green-400">
                {progress < 100 ? (
                  <motion.div
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center justify-center">
                    <span className="inline-block h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    <span>{currentAnalysisStep}</span>
                  </motion.div>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Dekodowanie zakończone! Analiza profilu gotowa.
                  </motion.span>
                )}
              </div>
              
              {/* Szczegółowe komunikaty */}
              {progress < 100 && (
                <div className="mt-3 text-xs text-gray-400 max-w-2xl mx-auto space-y-1 max-h-16 overflow-hidden">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-green-900 to-transparent mb-2"></div>
                  {detailedMessages.map((message, idx) => (
                    <motion.div 
                      key={`msg-${idx}-${message ? message.substring(0, 10) : 'unknown'}`}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: idx === 0 ? 1 : 0.7 - (idx * 0.15), y: 0 }}
                      className={`text-left transition-all ${idx === 0 ? 'text-green-400' : 'text-gray-500'}`}
                      style={{ fontSize: `${Math.max(8, 11 - idx)}px` }}
                    >
                      <span className="mr-1">{idx === 0 ? '▶' : '◇'}</span>
                      {message || 'Przetwarzanie danych...'}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
