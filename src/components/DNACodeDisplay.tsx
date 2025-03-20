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

  const formatRawCode = (rawCode: string) => {
    // Znajdź wszystkie emoji w kodzie DNA przy użyciu wyrażenia regularnego
    // Wzorzec obejmuje emoji jako znaki Unicode oraz połączenia emoji (jak flagi, rodziny, itp.)
    const emojiPattern = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji}\u200D\p{Emoji})+/gu
    const parts = []
    let lastIndex = 0
    
    // Znajdź wszystkie dopasowania emoji
    let match
    while ((match = emojiPattern.exec(rawCode)) !== null) {
      // Dodaj tekst przed emoji
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{rawCode.substring(lastIndex, match.index)}</span>)
      }
      
      // Dodaj emoji z wyróżnieniem
      parts.push(
        <span key={`emoji-${match.index}`} className="text-xl" style={{ color: '#4ade80' }}>
          {match[0]}
        </span>
      )
      
      lastIndex = match.index + match[0].length
    }
    
    // Dodaj pozostały tekst
    if (lastIndex < rawCode.length) {
      parts.push(<span key={`text-${lastIndex}`}>{rawCode.substring(lastIndex)}</span>)
    }
    
    return parts
  }

  return (
    <div className="dna-code-display">
      <div className="raw-code">
        <h3>Kod DNA:</h3>
        <pre className="text-wrap leading-relaxed">{formatRawCode(rawCode)}</pre>
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
                    <strong>{code.segmentEmoji || ''} {code.code}:</strong> {code.decodedValue} 
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
