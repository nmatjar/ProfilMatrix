import { categories, segments, microsegmentGroups } from './segment-data'
import { 
  SegmentCategory, 
  Segment, 
  MicrosegmentGroup, 
  SegmentWithIcon,
  CategoryWithIcon,
  MicrosegmentGroupWithIcon
} from './segment-types'
import * as Icons from 'lucide-react'
import React from 'react'

// Helper to convert icon name to component
function getIconComponent(iconName: string): React.ReactNode {
  return Icons[iconName] || Icons.HelpCircle
}

/**
 * Get all categories with their icon components
 * This function could be replaced with a database query in the future
 */
export function getAllCategories(): CategoryWithIcon[] {
  return categories.map(category => ({
    ...category,
    icon: getIconComponent(category.iconName)
  }))
}

/**
 * Get segments by category ID with their icon components
 * This function could be replaced with a database query in the future
 */
export function getSegmentsByCategory(categoryId: string): SegmentWithIcon[] {
  return segments
    .filter(segment => segment.categoryId === categoryId)
    .map(segment => ({
      ...segment,
      icon: getIconComponent(segment.iconName)
    }))
}

/**
 * Get microsegment groups by category ID with their icon components and segments
 * This function could be replaced with a database query in the future
 */
export function getMicrosegmentGroups(categoryId: string): MicrosegmentGroupWithIcon[] {
  return microsegmentGroups
    .filter(group => group.categoryId === categoryId)
    .map(group => {
      const segmentsWithIcons: SegmentWithIcon[] = group.segmentIds
        .map(id => segments.find(s => s.id === id))
        .filter((segment): segment is Segment => segment !== undefined)
        .map(segment => ({
          ...segment,
          icon: getIconComponent(segment.iconName)
        }))
      
      return {
        ...group,
        icon: getIconComponent(group.iconName),
        segments: segmentsWithIcons
      }
    })
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
 * Get all segments with their icon components
 * This function could be replaced with a database query in the future
 */
export function getAllSegments(): SegmentWithIcon[] {
  return segments.map(segment => ({
    ...segment,
    icon: getIconComponent(segment.iconName)
  }))
}

/**
 * Get a category by ID with its icon component
 * This function could be replaced with a database query in the future
 */
export function getCategoryById(id: string): CategoryWithIcon | null {
  const category = categories.find(c => c.id === id)
  if (!category) return null
  
  return {
    ...category,
    icon: getIconComponent(category.iconName)
  }
}

/**
 * Get a microsegment group by ID with its icon component and segments
 * This function could be replaced with a database query in the future
 */
export function getMicrosegmentGroupById(id: string): MicrosegmentGroupWithIcon | null {
  const group = microsegmentGroups.find(g => g.id === id)
  if (!group) return null
  
  const segmentsWithIcons: SegmentWithIcon[] = group.segmentIds
    .map(id => segments.find(s => s.id === id))
    .filter((segment): segment is Segment => segment !== undefined)
    .map(segment => ({
      ...segment,
      icon: getIconComponent(segment.iconName)
    }))
  
  return {
    ...group,
    icon: getIconComponent(group.iconName),
    segments: segmentsWithIcons
  }
}

/**
 * Get all microsegment groups with their icon components and segments
 * This function could be replaced with a database query in the future
 */
export function getAllMicrosegmentGroups(): MicrosegmentGroupWithIcon[] {
  return microsegmentGroups.map(group => {
    const segmentsWithIcons: SegmentWithIcon[] = group.segmentIds
      .map(id => segments.find(s => s.id === id))
      .filter((segment): segment is Segment => segment !== undefined)
      .map(segment => ({
        ...segment,
        icon: getIconComponent(segment.iconName)
      }))
    
    return {
      ...group,
      icon: getIconComponent(group.iconName),
      segments: segmentsWithIcons
    }
  })
}

/**
 * Add a new segment
 * This function could be replaced with a database insert in the future
 */
export function addSegment(segment: Omit<Segment, 'id'>): SegmentWithIcon {
  const id = generateId(segment.name)
  const newSegment: Segment = {
    ...segment,
    id
  }
  
  // In a real database, this would be a transaction
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
  
  // In a real database, this would be a transaction
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
  
  // In a real database, this would be a transaction with cascading deletes
  // Remove segment from all microsegment groups
  microsegmentGroups.forEach(group => {
    const segmentIndex = group.segmentIds.indexOf(id)
    if (segmentIndex !== -1) {
      group.segmentIds.splice(segmentIndex, 1)
    }
  })
  
  // Remove the segment
  segments.splice(index, 1)
  
  return true
}

/**
 * Add a new microsegment group
 * This function could be replaced with a database insert in the future
 */
export function addMicrosegmentGroup(group: Omit<MicrosegmentGroup, 'id'>): MicrosegmentGroupWithIcon {
  const id = generateId(group.name)
  const newGroup: MicrosegmentGroup = {
    ...group,
    id
  }
  
  // In a real database, this would be a transaction
  microsegmentGroups.push(newGroup)
  
  const segmentsWithIcons: SegmentWithIcon[] = newGroup.segmentIds
    .map(id => segments.find(s => s.id === id))
    .filter((segment): segment is Segment => segment !== undefined)
    .map(segment => ({
      ...segment,
      icon: getIconComponent(segment.iconName)
    }))
  
  return {
    ...newGroup,
    icon: getIconComponent(newGroup.iconName),
    segments: segmentsWithIcons
  }
}

/**
 * Update an existing microsegment group
 * This function could be replaced with a database update in the future
 */
export function updateMicrosegmentGroup(id: string, groupData: Partial<MicrosegmentGroup>): MicrosegmentGroupWithIcon | null {
  const index = microsegmentGroups.findIndex(g => g.id === id)
  if (index === -1) return null
  
  const updatedGroup: MicrosegmentGroup = {
    ...microsegmentGroups[index],
    ...groupData
  }
  
  // In a real database, this would be a transaction
  microsegmentGroups[index] = updatedGroup
  
  const segmentsWithIcons: SegmentWithIcon[] = updatedGroup.segmentIds
    .map(id => segments.find(s => s.id === id))
    .filter((segment): segment is Segment => segment !== undefined)
    .map(segment => ({
      ...segment,
      icon: getIconComponent(segment.iconName)
    }))
  
  return {
    ...updatedGroup,
    icon: getIconComponent(updatedGroup.iconName),
    segments: segmentsWithIcons
  }
}

/**
 * Remove a microsegment group
 * This function could be replaced with a database delete in the future
 */
export function removeMicrosegmentGroup(id: string): boolean {
  const index = microsegmentGroups.findIndex(g => g.id === id)
  if (index === -1) return false
  
  // In a real database, this would be a transaction
  microsegmentGroups.splice(index, 1)
  
  return true
}

/**
 * Add a segment to a microsegment group
 * This function could be replaced with a database insert in the future
 */
export function addSegmentToGroup(groupId: string, segmentId: string): boolean {
  const group = microsegmentGroups.find(g => g.id === groupId)
  if (!group) return false
  
  if (group.segmentIds.includes(segmentId)) return true
  
  // In a real database, this would be a transaction
  group.segmentIds.push(segmentId)
  
  return true
}

/**
 * Remove a segment from a microsegment group
 * This function could be replaced with a database delete in the future
 */
export function removeSegmentFromGroup(groupId: string, segmentId: string): boolean {
  const group = microsegmentGroups.find(g => g.id === groupId)
  if (!group) return false
  
  const index = group.segmentIds.indexOf(segmentId)
  if (index === -1) return false
  
  // In a real database, this would be a transaction
  group.segmentIds.splice(index, 1)
  
  return true
}

/**
 * Generate a unique ID from a name
 */
function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .concat('-', Math.floor(Math.random() * 10000).toString())
}
