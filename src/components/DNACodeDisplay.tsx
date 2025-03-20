import React from 'react'
import { ParsedDNASegment } from '../lib/dna-code-mapping'
import { dnaCategories } from '../lib/dna-code-mapping'

interface DNACodeDisplayProps {
  parsedCode: ParsedDNASegment[]
  rawCode: string
}

/**
 * Komponent wyświetlający kod DNA w bardziej czytelny sposób
 */
export function DNACodeDisplay({ parsedCode, rawCode }: DNACodeDisplayProps) {
  // Jeśli nie ma sparsowanego kodu, wyświetl tylko surowy kod
  if (!parsedCode || parsedCode.length === 0) {
    return (
      <div className="dna-code-display">
        <div className="raw-code">
          <h3>Kod DNA:</h3>
          <pre>{rawCode || 'Brak kodu DNA'}</pre>
        </div>
      </div>
    )
  }

  return (
    <div className="dna-code-display">
      <div className="raw-code">
        <h3>Kod DNA:</h3>
        <pre className="text-wrap">{rawCode}</pre>
      </div>
      
      <div className="parsed-code">
        <h3>Zdekodowany profil:</h3>
        
        {parsedCode.map((segment, index) => {
          // Znajdź nazwę obszaru
          const area = dnaCategories.find(c => c.id === segment.area)
          const areaName = area ? area.name : segment.area

          return (
            <div key={index} className="area-section">
              <h4>
                {segment.emoji} {areaName}
              </h4>
              
              <ul>
                {segment.codes.map((code, codeIndex) => (
                  <li key={codeIndex}>
                    <strong>{code.code}:</strong> {code.decodedValue} 
                    <span className="text-muted"> - {code.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
