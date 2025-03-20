/**
 * Skrypt do łączenia danych z segment-data.ts i dna-code-mapping.ts
 * 
 * Ten skrypt:
 * 1. Wczytuje dane z obu plików
 * 2. Dla każdego segmentu w segment-data.ts sprawdza, czy istnieje mapowanie w dna-code-mapping.ts
 * 3. Jeśli tak, dodaje pola z mapowania do segmentu
 * 4. Zapisuje zaktualizowane dane do nowego pliku
 */

import * as fs from 'fs'
import * as path from 'path'

// Ścieżki do plików
const segmentDataPath = path.resolve(__dirname, '../src/lib/segment-data.ts')
const dnaCodeMappingPath = path.resolve(__dirname, '../src/lib/dna-code-mapping.ts')
const outputPath = path.resolve(__dirname, '../src/lib/segment-data-merged.ts')

// Wczytaj zawartość plików
const segmentDataContent = fs.readFileSync(segmentDataPath, 'utf8')
const dnaCodeMappingContent = fs.readFileSync(dnaCodeMappingPath, 'utf8')

// Znajdź definicję dnaCodeMappings w pliku dna-code-mapping.ts
const dnaCodeMappingsRegex = /export const dnaCodeMappings: DNACodeMapping\[] = \[([\s\S]*?)\]/
const dnaCodeMappingsMatch = dnaCodeMappingContent.match(dnaCodeMappingsRegex)

if (!dnaCodeMappingsMatch) {
  console.error('Nie znaleziono definicji dnaCodeMappings w pliku dna-code-mapping.ts')
  process.exit(1)
}

// Podziel mapowania na poszczególne obiekty
const dnaCodeMappingsStr = dnaCodeMappingsMatch[1]
const mappingRegex = /{\s*segmentId:\s*'([^']+)'[\s\S]*?}/g
const mappings: Record<string, any> = {}

let match
while ((match = mappingRegex.exec(dnaCodeMappingsStr)) !== null) {
  const segmentId = match[1]
  const mappingStr = match[0]
  
  // Wyciągnij potrzebne pola z mapowania
  const codeMatch = mappingStr.match(/code:\s*'([^']+)'/)
  const emojiMatch = mappingStr.match(/emoji:\s*'([^']+)'/)
  
  // Sprawdź, czy istnieje valueMap
  const valueMapMatch = mappingStr.match(/valueMap:\s*{([\s\S]*?)}/)
  const reverseValueMapMatch = mappingStr.match(/reverseValueMap:\s*{([\s\S]*?)}/)
  
  // Sprawdź, czy istnieje scaleType
  const scaleTypeMatch = mappingStr.match(/scaleType:\s*'([^']+)'/)
  
  // Sprawdź, czy istnieje formatTemplate
  const formatTemplateMatch = mappingStr.match(/formatTemplate:\s*'([^']+)'/)
  
  mappings[segmentId] = {
    code: codeMatch ? codeMatch[1] : undefined,
    emoji: emojiMatch ? emojiMatch[1] : undefined,
    valueMap: valueMapMatch ? `{${valueMapMatch[1]}}` : undefined,
    reverseValueMap: reverseValueMapMatch ? `{${reverseValueMapMatch[1]}}` : undefined,
    scaleType: scaleTypeMatch ? scaleTypeMatch[1] : undefined,
    formatTemplate: formatTemplateMatch ? formatTemplateMatch[1] : undefined
  }
}

console.log(`Znaleziono ${Object.keys(mappings).length} mapowań w dna-code-mapping.ts`)

// Znajdź definicje segmentów w pliku segment-data.ts
const segmentRegex = /id:\s*'([^']+)'[\s\S]*?areaId:\s*'([^']+)'[\s\S]*?description:\s*'([^']+)'/g
let updatedContent = segmentDataContent
let segmentCount = 0

while ((match = segmentRegex.exec(segmentDataContent)) !== null) {
  const segmentId = match[1]
  const mapping = mappings[segmentId]
  
  if (mapping && mapping.code) {
    segmentCount++
    
    // Znajdź koniec definicji segmentu
    const segmentEndIndex = segmentDataContent.indexOf('  },', match.index + match[0].length)
    if (segmentEndIndex === -1) continue
    
    // Przygotuj nowe pola do dodania
    let newFields = ''
    
    if (mapping.code) {
      newFields += `    code: '${mapping.code}',\n`
    }
    
    if (mapping.valueMap) {
      newFields += `    valueMap: ${mapping.valueMap},\n`
    }
    
    if (mapping.reverseValueMap) {
      newFields += `    reverseValueMap: ${mapping.reverseValueMap},\n`
    }
    
    if (mapping.scaleType) {
      newFields += `    scaleType: '${mapping.scaleType}',\n`
    }
    
    if (mapping.formatTemplate) {
      newFields += `    formatTemplate: '${mapping.formatTemplate}',\n`
    }
    
    // Dodaj nowe pola przed końcem definicji segmentu
    const beforeSegment = updatedContent.substring(0, segmentEndIndex)
    const afterSegment = updatedContent.substring(segmentEndIndex)
    
    updatedContent = beforeSegment + '\n' + newFields + afterSegment
  }
}

console.log(`Zaktualizowano ${segmentCount} segmentów w segment-data.ts`)

// Zapisz zaktualizowaną zawartość do nowego pliku
fs.writeFileSync(outputPath, updatedContent, 'utf8')

console.log(`Zapisano zaktualizowane dane do ${outputPath}`)
