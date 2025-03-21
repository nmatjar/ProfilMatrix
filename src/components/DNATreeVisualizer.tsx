import React from 'react'
import { ParsedDNASegment } from '@/lib/dna-code-mapping'
import { Card, CardContent } from '@/components/ui/card'

interface DNATreeVisualizerProps {
  parsedDna: ParsedDNASegment[]
}

export function DNATreeVisualizer({ parsedDna }: DNATreeVisualizerProps) {
  if (!parsedDna.length) return <EmptyState />

  return (
    <div className="p-4 pb-10 overflow-auto">
      <div className="flex justify-center">
        <div className="tree-root bg-black bg-opacity-70 border border-green-700 rounded-md p-4 text-white mb-2">
          <span className="text-lg font-bold">Profil DNA</span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="tree-connector h-8 w-px bg-green-400 mx-auto"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-4">
        {parsedDna.map((segment, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="area-node bg-black bg-opacity-90 border border-green-700 rounded-md p-3 min-w-40 text-center">
              <div className="flex items-center justify-center mb-1">
                <span className="text-2xl mr-2">{segment.emoji}</span>
                <span className="font-bold text-green-400">{segment.areaName}</span>
              </div>
              <span className="text-sm text-gray-400">{segment.area}</span>
            </div>

            <div className="tree-connector h-8 w-px bg-green-400 mx-auto"></div>

            <div className="flex flex-wrap justify-center gap-4">
              {segment.codes.map((code, codeIndex) => (
                <div 
                  key={codeIndex} 
                  className="code-node transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-900/50"
                >
                  <Card className="border border-green-900 bg-black bg-opacity-80 w-40 overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-center items-center mb-2">
                        <span className="text-3xl">{code.segmentEmoji}</span>
                      </div>
                      <div className="text-center">
                        <div className="text-green-400 font-semibold mb-1">{code.code}</div>
                        <div className="text-white font-medium">
                          {code.decodedValue}
                        </div>
                        <div className="text-xs text-gray-400 mt-2 line-clamp-2">
                          {code.description}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-400 border border-green-900 border-dashed rounded-md bg-black bg-opacity-30 min-h-[300px]">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <div className="text-center">
        <div className="mb-2 font-medium">Brak danych do wizualizacji</div>
        <div className="text-sm">Wprowadź kod DNA, aby zobaczyć drzewo dekodowania</div>
      </div>
    </div>
  )
}
