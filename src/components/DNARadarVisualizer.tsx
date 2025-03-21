import React, { useEffect, useRef, useState } from 'react'
import { ParsedDNASegment } from '@/lib/dna-code-mapping'

interface DNARadarVisualizerProps {
  parsedDna: ParsedDNASegment[]
}

export function DNARadarVisualizer({ parsedDna }: DNARadarVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeSegment, setActiveSegment] = useState<{ code: string, value: string, decodedValue: string, description: string, emoji: string } | null>(null)
  
  useEffect(() => {
    if (!parsedDna.length || !canvasRef.current) {
      return
    }
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Ustawienia canvas dla odpowiedniej jakości na różnych ekranach
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    
    // Czyszczenie canvas
    ctx.clearRect(0, 0, rect.width, rect.height)
    
    // Przygotowanie danych do radaru
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const maxRadius = Math.min(centerX, centerY) * 0.8
    
    // Przygotuj wszystkie kody DNA do radaru
    let allCodes: { code: string; value: string; decodedValue: string; description: string; emoji: string }[] = []
    parsedDna.forEach(segment => {
      segment.codes.forEach(code => {
        allCodes.push({
          code: code.code,
          value: code.value,
          decodedValue: code.decodedValue,
          description: code.description,
          emoji: code.segmentEmoji || '❓'
        })
      })
    })
    
    // Ustawienia radaru
    const numPoints = allCodes.length
    if (numPoints === 0) return
    
    const angleStep = (Math.PI * 2) / numPoints
    
    // Rysuj tło radaru - kręgi
    const circles = 4 // Liczba koncentrycznych kręgów
    for (let i = 1; i <= circles; i++) {
      const radius = (maxRadius / circles) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.2)' // jasny zielony, prawie przezroczysty
      ctx.stroke()
    }
    
    // Rysuj linie od środka
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep
      const endX = centerX + Math.cos(angle) * maxRadius
      const endY = centerY + Math.sin(angle) * maxRadius
      
      // Linia
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(endX, endY)
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.3)'
      ctx.stroke()
      
      // Etykieta (emoji)
      const labelDistance = maxRadius + 20
      const labelX = centerX + Math.cos(angle) * labelDistance
      const labelY = centerY + Math.sin(angle) * labelDistance
      
      ctx.font = '16px Arial'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(allCodes[i].emoji, labelX, labelY)
      
      // Dodaj małą etykietę z kodem
      const codeX = centerX + Math.cos(angle) * (maxRadius + 40)
      const codeY = centerY + Math.sin(angle) * (maxRadius + 40)
      
      ctx.font = '10px Arial'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.fillText(allCodes[i].code, codeX, codeY)
    }
    
    // Rysuj dane DNA jako radar
    ctx.beginPath()
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep
      // Wartość między 0.2 a 1 (minimum 20% promienia, by był widoczny)
      const value = 0.2 + 0.8 * Math.random() // Tu symulujemy wartość, można mapować faktyczne wartości
      const pointRadius = maxRadius * value
      
      const x = centerX + Math.cos(angle) * pointRadius
      const y = centerY + Math.sin(angle) * pointRadius
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    
    // Zamknij ścieżkę
    ctx.lineTo(
      centerX + Math.cos(0) * (maxRadius * (0.2 + 0.8 * Math.random())),
      centerY + Math.sin(0) * (maxRadius * (0.2 + 0.8 * Math.random()))
    )
    
    // Wypełnienie
    ctx.fillStyle = 'rgba(74, 222, 128, 0.2)'
    ctx.fill()
    
    // Obramowanie
    ctx.strokeStyle = 'rgba(74, 222, 128, 0.8)'
    ctx.lineWidth = 2
    ctx.stroke()
    
    // Dodaj punkty na wierzchołkach
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep
      const value = 0.2 + 0.8 * Math.random()
      const pointRadius = maxRadius * value
      
      const x = centerX + Math.cos(angle) * pointRadius
      const y = centerY + Math.sin(angle) * pointRadius
      
      // Rysuj punkt
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fillStyle = '#4ade80'
      ctx.fill()
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1
      ctx.stroke()
    }
    
    // Dodaj interaktywność - wykrywaj, który punkt został kliknięty
    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = (event.clientX - rect.left) * (canvas.width / rect.width)
      const clickY = (event.clientY - rect.top) * (canvas.height / rect.height)
      
      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep
        const value = 0.2 + 0.8 * Math.random()
        const pointRadius = maxRadius * value
        
        const x = centerX + Math.cos(angle) * pointRadius * dpr
        const y = centerY + Math.sin(angle) * pointRadius * dpr
        
        // Sprawdź, czy kliknięcie było blisko punktu
        const distance = Math.sqrt(Math.pow(clickX - x, 2) + Math.pow(clickY - y, 2))
        
        if (distance <= 15 * dpr) {
          setActiveSegment(allCodes[i])
          return
        }
      }
      
      setActiveSegment(null)
    }
    
    canvas.addEventListener('click', handleCanvasClick)
    
    return () => {
      canvas.removeEventListener('click', handleCanvasClick)
    }
  }, [parsedDna])
  
  if (!parsedDna.length) return <EmptyState />
  
  return (
    <div className="p-4">
      <div className="text-center mb-4 text-gray-300 text-sm">
        Kliknij w punkt na radarze, aby zobaczyć szczegóły
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-black bg-opacity-70 border border-green-900 rounded-md p-4">
          <canvas 
            ref={canvasRef} 
            className="w-full h-[400px] cursor-pointer"
            style={{ touchAction: 'none' }}
          />
        </div>
        
        {activeSegment && (
          <div className="w-full md:w-80 bg-black bg-opacity-90 border border-green-700 rounded-md p-4 animate-fadeIn">
            <div className="flex items-center mb-3">
              <span className="text-4xl mr-3">{activeSegment.emoji}</span>
              <div>
                <div className="text-green-400 font-bold">{activeSegment.code}</div>
                <div className="text-white text-lg">{activeSegment.decodedValue}</div>
              </div>
            </div>
            
            <div className="mt-3 text-gray-300 text-sm">
              {activeSegment.description}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-400 border border-green-900 border-dashed rounded-md bg-black bg-opacity-30 min-h-[300px]">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <div className="text-center">
        <div className="mb-2 font-medium">Brak danych do wizualizacji</div>
        <div className="text-sm">Wprowadź kod DNA, aby zobaczyć radar umiejętności</div>
      </div>
    </div>
  )
}
