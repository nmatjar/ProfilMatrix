import React from 'react'
import { parseDNACode } from '@/lib/dna-code-mapping'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DNACodeDisplayProps {
  code: string
}

/**
 * Komponent wyświetlający kod DNA w bardziej czytelny sposób
 */
export function DNACodeDisplay({ code }: DNACodeDisplayProps) {
  if (!code) return null

  // Parsuj kod DNA
  const parsedSegments = parseDNACode(code)

  return (
    <div className="dna-code-display">
      <TooltipProvider>
        <div className="space-y-4">
          {parsedSegments.map((segment, areaIndex) => (
            <div key={areaIndex} className="category-container">
              <div className="category-header flex items-center gap-2 mb-2 text-green-400 font-semibold">
                <span className="text-xl">{segment.emoji}</span>
                <span>{segment.areaName}</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {segment.codes.length > 0 ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="dna-segment bg-green-950/30 p-3 rounded-md border border-green-800 hover:border-green-500 transition-colors flex flex-wrap items-center gap-2 cursor-help">
                        {segment.codes.map((codeItem, codeIndex) => (
                          <div key={codeIndex} className="flex items-center gap-1">
                            <span className="dna-code-item px-2 py-1 rounded-md text-sm bg-green-900/50 text-green-300 font-bold">
                              {codeItem.code}
                            </span>
                            <span className="dna-code-item px-2 py-1 rounded-md text-sm bg-black/40 text-white">
                              {codeItem.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-black border border-green-700 p-3 max-w-sm">
                      <div className="space-y-2">
                        {segment.codes.map((codeItem, codeIndex) => (
                          <div key={codeIndex} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-green-400">{codeItem.code}:</span>
                              <span className="text-white">{codeItem.decodedValue}</span>
                            </div>
                            <div className="text-xs text-gray-400">{codeItem.description}</div>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div className="text-gray-500 italic">Brak danych</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </div>
  )
}
