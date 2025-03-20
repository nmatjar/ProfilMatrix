import { areas, segments } from './segment-data'
import { 
  Area, 
  Segment, 
  SegmentWithIcon,
  AreaWithIcon,
  SegmentOption,
  SubOption
} from './segment-types'
import * as Icons from 'lucide-react'
import React from 'react'

// Helper to convert icon name to component
function getIconComponent(iconName: string): React.ReactNode {
  const IconComponent = Icons[iconName] || Icons.HelpCircle;
  return React.createElement(IconComponent);
}

/**
 * Get all areas with their icon components
 * This function could be replaced with a database query in the future
 */
export function getAllAreas(): AreaWithIcon[] {
  return areas.map(area => ({
    ...area,
    icon: getIconComponent(area.iconName)
  }))
}

/**
 * Get segments by area ID with their icon components
 * This function could be replaced with a database query in the future
 */
export function getSegmentsByArea(areaId: string): SegmentWithIcon[] {
  return segments
    .filter(segment => segment.areaId === areaId)
    .map(segment => ({
      ...segment,
      icon: getIconComponent(segment.iconName)
    }))
}

/**
 * Get a segment by ID with its icon component
 * This function could be replaced with a database query in the future
 */
export function getSegmentById(id: string): SegmentWithIcon | null {
  const segment = segments.find(s => s.id === id)
  if (!segment) return null
  
  return {
    ...segment,
    icon: getIconComponent(segment.iconName)
  }
}

/**
 * Get all segments
 * This function could be replaced with a database query in the future
 */
export function getAllSegments(): Segment[] {
  return segments
}

/**
 * Get all segments with their icon components
 * This function could be replaced with a database query in the future
 */
export function getAllSegmentsWithIcons(): SegmentWithIcon[] {
  return segments.map(segment => ({
    ...segment,
    icon: getIconComponent(segment.iconName)
  }))
}

/**
 * Get an area by ID with its icon component
 * This function could be replaced with a database query in the future
 */
export function getAreaById(id: string): AreaWithIcon | null {
  const area = areas.find(a => a.id === id)
  if (!area) return null
  
  return {
    ...area,
    icon: getIconComponent(area.iconName)
  }
}

/**
 * Get sub-options for a segment option
 * This function could be replaced with a database query in the future
 */
export function getSubOptionsForOption(segment: Segment, optionId: string): SubOption[] {
  if (!segment.subOptions) return []
  
  return segment.subOptions.filter(subOption => subOption.parentOptionId === optionId)
}

/**
 * Add a new segment
 * This function could be replaced with a database insert in the future
 */
export function addSegment(segment: Omit<Segment, 'id'>): SegmentWithIcon {
  const newId = generateId(segment.name)
  const newSegment: Segment = {
    id: newId,
    ...segment
  }
  
  // In a real app, this would be a database insert
  segments.push(newSegment)
  
  return {
    ...newSegment,
    icon: getIconComponent(newSegment.iconName)
  }
}

/**
 * Update an existing segment
 * This function could be replaced with a database update in the future
 */
export function updateSegment(id: string, segmentData: Partial<Segment>): SegmentWithIcon | null {
  const index = segments.findIndex(s => s.id === id)
  if (index === -1) return null
  
  const updatedSegment: Segment = {
    ...segments[index],
    ...segmentData
  }
  
  // In a real app, this would be a database update
  segments[index] = updatedSegment
  
  return {
    ...updatedSegment,
    icon: getIconComponent(updatedSegment.iconName)
  }
}

/**
 * Remove a segment
 * This function could be replaced with a database delete in the future
 */
export function removeSegment(id: string): boolean {
  const index = segments.findIndex(s => s.id === id)
  if (index === -1) return false
  
  // In a real app, this would be a database delete
  segments.splice(index, 1)
  
  return true
}

/**
 * Add a new area
 * This function could be replaced with a database insert in the future
 */
export function addArea(area: Omit<Area, 'id'>): AreaWithIcon {
  const newId = generateId(area.name)
  const newArea: Area = {
    id: newId,
    ...area
  }
  
  // In a real app, this would be a database insert
  areas.push(newArea)
  
  return {
    ...newArea,
    icon: getIconComponent(newArea.iconName)
  }
}

/**
 * Update an existing area
 * This function could be replaced with a database update in the future
 */
export function updateArea(id: string, areaData: Partial<Area>): AreaWithIcon | null {
  const index = areas.findIndex(a => a.id === id)
  if (index === -1) return null
  
  const updatedArea: Area = {
    ...areas[index],
    ...areaData
  }
  
  // In a real app, this would be a database update
  areas[index] = updatedArea
  
  return {
    ...updatedArea,
    icon: getIconComponent(updatedArea.iconName)
  }
}

/**
 * Remove an area
 * This function could be replaced with a database delete in the future
 */
export function removeArea(id: string): boolean {
  const index = areas.findIndex(a => a.id === id)
  if (index === -1) return false
  
  // In a real app, this would be a database delete
  areas.splice(index, 1)
  
  return true
}

/**
 * Add a sub-option to a segment
 * This function could be replaced with a database insert in the future
 */
export function addSubOption(segmentId: string, subOption: Omit<SubOption, 'id'>): boolean {
  const segment = segments.find(s => s.id === segmentId)
  if (!segment) return false
  
  const newId = generateId(subOption.label)
  const newSubOption: SubOption = {
    id: newId,
    ...subOption
  }
  
  if (!segment.subOptions) {
    segment.subOptions = []
  }
  
  segment.subOptions.push(newSubOption)
  return true
}

/**
 * Remove a sub-option from a segment
 * This function could be replaced with a database delete in the future
 */
export function removeSubOption(segmentId: string, subOptionId: string): boolean {
  const segment = segments.find(s => s.id === segmentId)
  if (!segment || !segment.subOptions) return false
  
  const index = segment.subOptions.findIndex(so => so.id === subOptionId)
  if (index === -1) return false
  
  segment.subOptions.splice(index, 1)
  return true
}

/**
 * Generate a unique ID from a name
 */
function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .concat('-', Math.floor(Math.random() * 1000).toString())
}
