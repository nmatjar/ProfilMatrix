import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownIcon, CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface IntroAnimationProps {
  isVisible: boolean
  onComplete: () => void
}

export function IntroAnimation({ isVisible, onComplete }: IntroAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [randomChars, setRandomChars] = useState<{char: string, x: number, y: number, opacity: number}[]>([])
  const [currentStep, setCurrentStep] = useState<string>('Inicjalizacja systemu ProfileMatrix...')
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
    if (!isVisible) {
      setProgress(0)
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
    
    // Przygotuj dane do symulacji analizy
    const introSteps = [
      { progress: 5, message: 'Inicjalizacja matrycy osobowości...' },
      { progress: 15, message: 'Kalibrowanie algorytmów kwantowej analizy...' },
      { progress: 25, message: 'Odkrywanie sekwencji DNA osobowości...' },
      { progress: 40, message: 'Mapowanie współzależności genetycznych...' },
      { progress: 55, message: 'Rozwijanie matrycy możliwości ludzkich...' },
      { progress: 70, message: 'Inicjalizacja dekodera wzorców zachowania...' },
      { progress: 85, message: 'Aktywacja protokołów samopoznania...' },
      { progress: 95, message: 'Synchronizacja z twoją unikatową osobowością...' },
      { progress: 98, message: 'Odkodowywanie potencjału człowieka...' },
    ]

    // Generuj przykładowe szczegółowe komunikaty
    const detailMessages = [
      'Odkrywanie tajników ludzkiej świadomości...',
      'Analizowanie ukrytych wzorców psychologicznych...',
      'Mapowanie dynamiki energii osobowości...',
      'Kwantyfikacja unikalnych cech charakteru...',
      'Synteza behawioralnych sekwencji DNA...',
      'Dekodowanie głębokich struktur motywacyjnych...',
      'Odkrywanie nieświadomych schematów działania...',
      'Kalibrowanie wzorców komunikacji międzyludzkiej...',
      'Analiza równowagi emocjonalnej i kognitywnej...',
      'Uwypuklanie ukrytych talentów i predyspozycji...',
      'Tworzenie holograficznej mapy psychologicznej...',
      'Interpretacja symboli kwantowej osobowości...',
      'Translacja kodów emocjonalnych na język DNA...',
      'Odkrywanie wzorców relacji interpersonalnych...',
      'Synchronizacja z wielowymiarową naturą człowieka...',
      'Rekonfiguracja matrycy potencjału człowieka...',
      'Inicjalizacja protokołów głębokiego samopoznania...',
      'Odkodowywanie esencji Twojego prawdziwego Ja...'
    ]

    setDetailedMessages(detailMessages)
    
    // Animacja postępu
    let currentProgress = 0
    let messageIndex = 0
    
    const updateProgress = () => {
      if (currentProgress < 100) {
        currentProgress += 1
        setProgress(currentProgress)
        
        // Aktualizuj główny komunikat
        for (const step of introSteps) {
          if (currentProgress >= step.progress && currentProgress < step.progress + 15) {
            setCurrentStep(step.message)
            break
          }
        }
        
        // Aktualizuj szczegółowe komunikaty
        if (currentProgress % 5 === 0 && messageIndex < detailMessages.length) {
          const newDetailedMessages = [...detailMessages.slice(messageIndex, messageIndex + 4)]
          messageIndex += 1
          setDetailedMessages(newDetailedMessages)
        }
        
        // Kontynuuj animację
        timeoutRef.current = setTimeout(updateProgress, 50)
      } else {
        // Zakończ animację po pewnym czasie
        timeoutRef.current = setTimeout(() => {
          // Do not auto-dismiss to let user click button
        }, 1000)
      }
    }
    
    // Rozpocznij animację
    timeoutRef.current = setTimeout(updateProgress, 500)
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isVisible])
  
  // Funkcja dla animacji losowych znaków "hackingowych"
  const animate = () => {
    if (!isVisible) return
    
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight
      
      // Aktualizuj istniejące znaki
      setRandomChars(prevChars => 
        prevChars.map(char => ({
          ...char,
          char: Math.random() > 0.7 ? hackChars[Math.floor(Math.random() * hackChars.length)] : char.char,
          x: (char.x + (Math.random() * 6 - 3)) % containerWidth,
          y: (char.y + (Math.random() * 6 - 2)) % containerHeight,
          opacity: Math.max(0.1, Math.min(0.7, char.opacity + (Math.random() * 0.2 - 0.1)))
        }))
      )
    }
    
    timeoutRef.current = setTimeout(animate, 150)
  }
  
  // Uruchom animację losowych znaków
  useEffect(() => {
    if (isVisible) {
      animate()
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isVisible])
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="relative w-full max-w-4xl p-6 rounded-lg overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div ref={containerRef} className="absolute inset-0 overflow-hidden">
              {randomChars.map((item, idx) => (
                <motion.div
                  key={`random-${idx}`}
                  className="absolute text-green-500 opacity-50 text-xs font-mono pointer-events-none"
                  style={{
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    opacity: item.opacity
                  }}
                >
                  {item.char}
                </motion.div>
              ))}
            </div>
            
            <div className="relative z-10 bg-black bg-opacity-80 p-6 border border-green-800 rounded-lg shadow-xl">
              <div className="text-center mb-6">
                <motion.h2 
                  className="text-3xl font-mono text-green-400 mb-1"
                  animate={{ 
                    textShadow: ["0 0 5px rgba(0,255,0,0.7)", "0 0 15px rgba(0,255,0,0.9)", "0 0 5px rgba(0,255,0,0.7)"] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Matryca Kodu Osobowości
                </motion.h2>
                <motion.div 
                  className="h-px w-full bg-gradient-to-r from-transparent via-green-700 to-transparent mb-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-green-300 text-sm">Odkrywanie ukrytego DNA człowieka</p>
              </div>
              
              <div className="terminal-window mb-6 p-4 bg-black border border-green-900 font-mono text-sm text-green-400 rounded relative overflow-hidden">
                <div className="scanline absolute inset-0 pointer-events-none"></div>
                <div className="terminal-window-effect absolute inset-0 pointer-events-none"></div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Status systemu: {progress}%</span>
                    <span>{progress === 100 ? "Zakończono" : "Inicjalizacja..."}</span>
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
                
                <div className="text-center opacity-80 font-mono space-y-2 mt-4">
                  {/* Główny status */}
                  <div className="text-green-400">
                    {progress < 100 ? (
                      <motion.div
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex items-center justify-center">
                        <span className="inline-block h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        <span>{currentStep}</span>
                      </motion.div>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center"
                      >
                        <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                        System gotowy do pracy!
                      </motion.span>
                    )}
                  </div>
                  
                  {/* Szczegółowe komunikaty */}
                  <div className="mt-3 text-xs text-gray-400 max-w-2xl mx-auto space-y-1">
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
                        {message || 'Inicjalizacja systemu...'}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {progress === 100 && (
                <motion.div 
                  className="text-center mt-6" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="space-y-4 mb-6">
                    <motion.p 
                      className="text-green-400 text-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      Witaj w świecie, gdzie kodowanie rzeczywistości spotyka się z głębią ludzkiej natury.
                    </motion.p>
                    <motion.p 
                      className="text-green-300 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      ProfilMatrix to zaawansowany system dekodujący Twoje wewnętrzne DNA – unikalne wzorce zachowań,
                      emocji i myśli, które definiują Twoją osobowość na poziomie kwantowym.
                    </motion.p>
                    <motion.p 
                      className="text-green-300 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                    >
                      Każdy z nas posiada niepowtarzalny kod DNA osobowości, kompleksową strukturę
                      która determinuje nasze reakcje, wybory i potencjał. Odkryj swoją matrycę.
                    </motion.p>
                    <motion.p 
                      className="text-green-400 text-sm font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 }}
                    >
                      Stwórz swój profil, odkoduj swoje prawdziwe Ja i przekształć wiedzę w świadomość.
                    </motion.p>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.0, type: 'spring' }}
                  >
                    <Button 
                      onClick={onComplete}
                      className="bg-green-700 hover:bg-green-600 text-white font-mono group"
                    >
                      ODKODUJ SWOJĄ NATURĘ
                      <ArrowDownIcon className="ml-2 h-4 w-4 animate-bounce group-hover:animate-none" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
