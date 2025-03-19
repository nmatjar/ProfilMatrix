import { ReactNode } from 'react'

export interface SegmentOption {
  id: string
  label: string
  value: string
  emoji?: string
}

export interface Segment {
  id: string
  name: string
  iconName: string // Store icon name instead of React component
  emoji?: string
  type: 'toggle' | 'slider' | 'input' | 'select'
  options?: SegmentOption[]
  min?: number
  max?: number
  step?: number
  defaultValue?: string | number
  categoryId: string // Reference by ID instead of embedding
  description?: string
}

export interface SegmentCategory {
  id: string
  name: string
  iconName: string
  description?: string
}

export interface MicrosegmentGroup {
  id: string
  name: string
  iconName: string
  segmentIds: string[] // Reference segments by ID
  categoryId: string
  description?: string
}

export interface ActiveSegment {
  id: string
  value: string | number
  segmentId: string // Reference by ID instead of embedding
  visible: boolean
  order?: number
}

// Extended interfaces with icon components (for UI use)
export interface SegmentWithIcon extends Segment {
  icon: ReactNode
}

export interface CategoryWithIcon extends SegmentCategory {
  icon: ReactNode
}

export interface MicrosegmentGroupWithIcon extends Omit<MicrosegmentGroup, 'segmentIds'> {
  icon: ReactNode
  segments: SegmentWithIcon[]
}
