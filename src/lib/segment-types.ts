import { ReactNode } from 'react'

export interface SegmentOption {
  id: string
  label: string
  value: string
  emoji?: string
  description?: string
}

export interface SubOption {
  id: string
  label: string
  value: string
  emoji?: string
  parentOptionId: string // ID opcji nadrzędnej
}

export interface Segment {
  id: string
  name: string
  iconName: string
  emoji?: string
  type: 'toggle' | 'slider' | 'input' | 'select' | 'multiselect'
  options?: SegmentOption[]
  subOptions?: SubOption[] // Subopcje dla segmentu
  min?: number
  max?: number
  step?: number
  defaultValue?: string | number
  areaId: string // Powiązanie z obszarem zamiast kategorią
  description?: string
  // Pola z DNACodeMapping
  code?: string // Kod DNA (np. 'ORG', 'WF')
  valueMap?: Record<string, string> // Mapowanie wartości na kody
  reverseValueMap?: Record<string, string> // Mapowanie kodów na wartości (do dekodowania)
  scaleType?: 'P' | 'T' | 'F' | 'C' | 'A' | 'S' // Typ skali
  formatTemplate?: string // Szablon formatowania
}

export interface Area {
  id: string
  name: string
  iconName: string
  emoji?: string
  description?: string
}

export interface ActiveSegment {
  id: string
  value: string | number | string[] // Dodana obsługa tablicy stringów dla multiselect
  segmentId: string
  visible: boolean
  order?: number
  subOptionId?: string // Opcjonalnie ID wybranej subopcji
}

// Interfejsy z komponentami ikon (dla UI)
export interface SegmentWithIcon extends Segment {
  icon: ReactNode
}

export interface AreaWithIcon extends Area {
  icon: ReactNode
}
