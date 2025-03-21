import React from 'react'
import { ParsedDNASegment } from '@/lib/dna-code-mapping'
import { Badge } from '@/components/ui/badge'

interface DNATileVisualizerProps {
  parsedDna: ParsedDNASegment[]
}

export function DNATileVisualizer({ parsedDna }: DNATileVisualizerProps) {
  if (!parsedDna.length) return <EmptyState />

  return (
    <div className="p-4">
      {parsedDna.map((area, areaIndex) => (
        <div 
          key={areaIndex}
          className="mb-6"
        >
          <div className="flex items-center mb-3">
            <span className="text-3xl mr-3">{area.emoji}</span>
            <h3 className="text-xl font-bold text-white">{area.areaName}</h3>
            <Badge variant="outline" className="ml-2 bg-black bg-opacity-70 text-gray-300 border-green-800">
              {area.area}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {area.codes.map((code, codeIndex) => (
              <div 
                key={codeIndex}
                className="bg-gradient-to-br from-black via-black to-green-950 border border-green-700 rounded-lg p-5 shadow-lg shadow-green-900/20 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex justify-between items-start">
                  <div className="text-5xl mb-4">{code.segmentEmoji}</div>
                  <Badge className="bg-green-900 text-white">
                    {code.code}
                  </Badge>
                </div>
                
                <div className="text-xl font-semibold text-white mb-2">{code.decodedValue}</div>
                
                <div className="text-sm text-gray-300 mt-3">
                  {code.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-400 border border-green-900 border-dashed rounded-md bg-black bg-opacity-30 min-h-[300px]">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
      <div className="text-center">
        <div className="mb-2 font-medium">Brak danych do wizualizacji</div>
        <div className="text-sm">Wprowadź kod DNA, aby zobaczyć kafelki z atrybutami</div>
      </div>
    </div>
  )
}
