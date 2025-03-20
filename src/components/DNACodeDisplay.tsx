import React from 'react'

interface DNACodeDisplayProps {
  rawCode: string
}

/**
 * Komponent wyświetlający kod DNA w bardziej czytelny sposób
 */
export function DNACodeDisplay({ rawCode }: DNACodeDisplayProps) {
  if (!rawCode) {
    return (
      <div className="dna-code-display">
        <div className="raw-code">
          <h3>Wygenerowany Profil DNA:</h3>
          <pre>Brak kodu DNA</pre>
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
    let isFirstEmojiInSegment = true
    
    // Znajdź wszystkie dopasowania emoji
    let match
    while ((match = emojiPattern.exec(rawCode)) !== null) {
      // Dodaj tekst przed emoji
      const textBefore = rawCode.substring(lastIndex, match.index)
      if (textBefore) {
        // Jeśli tekst przed emoji zawiera { lub ▪, resetuj flagę pierwszego emoji
        if (textBefore.includes('{') || textBefore.includes('▪')) {
          isFirstEmojiInSegment = true
        }
        parts.push(<span key={`text-${lastIndex}`}>{textBefore}</span>)
      }
      
      // Dodaj emoji z wyróżnieniem
      parts.push(
        <span key={`emoji-${match.index}`} className="text-xl" style={{ color: '#4ade80' }}>
          {match[0]}
        </span>
      )
      
      // Jeśli to pierwsze emoji w segmencie i następny znak to nie { ani =, dodaj znak =
      const nextChar = rawCode[match.index + match[0].length]
      if (isFirstEmojiInSegment && nextChar !== '{' && nextChar !== '=') {
        parts.push(<span key={`equals-${match.index}`}>=</span>)
      }
      
      isFirstEmojiInSegment = false
      lastIndex = match.index + match[0].length
    }
    
    // Dodaj pozostały tekst
    if (lastIndex < rawCode.length) {
      parts.push(<span key={`text-${lastIndex}`}>{rawCode.substring(lastIndex)}</span>)
    }
    
    return parts
  }

  // Funkcja do formatowania kodu z podziałem na linie
  const formatMultilineCode = (code: string) => {
    const areas = code.split('▪').filter(Boolean)
    const formattedAreas = areas.map((area, index) => {
      const parts = formatRawCode(area)
      return (
        <div key={`area-${index}`} className="mb-1">
          {parts}
          {index < areas.length - 1 && (
            <span className="text-green-500">▪</span>
          )}
        </div>
      )
    })
    return formattedAreas
  }

  return (
    <div className="dna-code-display">
      <div className="raw-code">
        <h3>Wygenerowany Profil DNA:</h3>
        <pre className="text-wrap leading-relaxed">
          {formatMultilineCode(rawCode)}
        </pre>
        <input type="hidden" id="raw-dna-code" value={rawCode} />
      </div>
    </div>
  )
}
