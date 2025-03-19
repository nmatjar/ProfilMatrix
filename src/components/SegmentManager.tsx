import React, { useState, useEffect } from 'react'
import { 
  SegmentWithIcon, 
  CategoryWithIcon, 
  MicrosegmentGroupWithIcon,
  Segment,
  ActiveSegment
} from '../lib/segment-types'
import { 
  getAllCategories, 
  getAllSegments, 
  getAllMicrosegmentGroups,
  addSegment,
  updateSegment,
  removeSegment,
  addMicrosegmentGroup,
  updateMicrosegmentGroup,
  removeMicrosegmentGroup,
  addSegmentToGroup,
  removeSegmentFromGroup
} from '../lib/segment-service'
import { Plus, Trash2, Edit, Save, X, FolderPlus, Check, HelpCircle } from 'lucide-react'
import * as Icons from 'lucide-react'

// Interface for props to allow passing active segments from parent
interface SegmentManagerProps {
  activeSegments?: ActiveSegment[];
  onSegmentToggle?: (segmentId: string, active: boolean) => void;
}

export function SegmentManager({ activeSegments: propActiveSegments, onSegmentToggle }: SegmentManagerProps = {}) {
  const [categories, setCategories] = useState<CategoryWithIcon[]>([])
  const [segments, setSegments] = useState<SegmentWithIcon[]>([])
  const [microsegmentGroups, setMicrosegmentGroups] = useState<MicrosegmentGroupWithIcon[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [editingSegment, setEditingSegment] = useState<Partial<Segment> | null>(null)
  const [isAddingSegment, setIsAddingSegment] = useState(false)
  
  // Local state for active segments when not controlled by parent
  const [localActiveSegments, setLocalActiveSegments] = useState<Set<string>>(new Set())
  
  // Determine if we're using props or local state for active segments
  const isControlled = propActiveSegments !== undefined && onSegmentToggle !== undefined
  
  // Load data
  useEffect(() => {
    const loadData = () => {
      setCategories(getAllCategories())
      setSegments(getAllSegments())
      setMicrosegmentGroups(getAllMicrosegmentGroups())
      
      // If we have categories but no selection, select the first one
      setSelectedCategoryId(prev => prev || categories[0]?.id || '')
      
      // If we have active segments from props, update local state
      if (propActiveSegments) {
        const activeIds = new Set(propActiveSegments
          .filter(s => s.visible)
          .map(s => s.segmentId))
        setLocalActiveSegments(activeIds)
      }
    }
    
    loadData()
  }, [propActiveSegments])
  
  // Filter segments by selected category
  const filteredSegments = selectedCategoryId 
    ? segments.filter(segment => segment.categoryId === selectedCategoryId)
    : segments
  
  // Filter microsegment groups by selected category
  const filteredGroups = selectedCategoryId
    ? microsegmentGroups.filter(group => group.categoryId === selectedCategoryId)
    : microsegmentGroups
  
  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    setEditingSegment(null)
    setIsAddingSegment(false)
  }
  
  // Handle adding a new segment
  const handleAddSegment = () => {
    setEditingSegment({
      name: '',
      iconName: 'Tag',
      type: 'toggle',
      categoryId: selectedCategoryId || categories[0]?.id || ''
    })
    setIsAddingSegment(true)
  }
  
  // Handle editing a segment
  const handleEditSegment = (segment: SegmentWithIcon) => {
    setEditingSegment({
      id: segment.id,
      name: segment.name,
      iconName: segment.iconName,
      type: segment.type,
      categoryId: segment.categoryId,
      description: segment.description,
      emoji: segment.emoji,
      options: segment.options,
      min: segment.min,
      max: segment.max,
      step: segment.step,
      defaultValue: segment.defaultValue
    })
    setIsAddingSegment(false)
  }
  
  // Handle saving a segment
  const handleSaveSegment = () => {
    if (!editingSegment) return
    
    if (isAddingSegment) {
      // Add new segment
      if (editingSegment.name && editingSegment.categoryId) {
        const newSegment = addSegment(editingSegment as Omit<Segment, 'id'>)
        setSegments([...segments, newSegment])
      }
    } else {
      // Update existing segment
      if (editingSegment.id) {
        const updatedSegment = updateSegment(editingSegment.id, editingSegment)
        if (updatedSegment) {
          setSegments(segments.map(s => s.id === updatedSegment.id ? updatedSegment : s))
        }
      }
    }
    
    setEditingSegment(null)
    setIsAddingSegment(false)
  }
  
  // Handle removing a segment
  const handleRemoveSegment = (segmentId: string) => {
    if (confirm('Are you sure you want to remove this segment?')) {
      const success = removeSegment(segmentId)
      if (success) {
        setSegments(segments.filter(s => s.id !== segmentId))
        
        // Also update microsegment groups that might contain this segment
        setMicrosegmentGroups(getAllMicrosegmentGroups())
      }
    }
  }
  
  // Handle adding a new microsegment group
  const handleAddGroup = () => {
    if (!selectedCategoryId) {
      alert('Please select a category first')
      return
    }
    
    const groupName = prompt('Enter group name:')
    if (!groupName) return
    
    const newGroup = addMicrosegmentGroup({
      name: groupName,
      iconName: 'FolderHeart',
      segmentIds: [],
      categoryId: selectedCategoryId,
      description: 'New microsegment group'
    })
    
    setMicrosegmentGroups([...microsegmentGroups, newGroup])
  }
  
  // Handle removing a microsegment group
  const handleRemoveGroup = (groupId: string) => {
    if (confirm('Are you sure you want to remove this group?')) {
      const success = removeMicrosegmentGroup(groupId)
      if (success) {
        setMicrosegmentGroups(microsegmentGroups.filter(g => g.id !== groupId))
      }
    }
  }
  
  // Handle adding a segment to a group
  const handleAddSegmentToGroup = (groupId: string, segmentId: string) => {
    const success = addSegmentToGroup(groupId, segmentId)
    if (success) {
      setMicrosegmentGroups(getAllMicrosegmentGroups())
    }
  }
  
  // Handle removing a segment from a group
  const handleRemoveSegmentFromGroup = (groupId: string, segmentId: string) => {
    const success = removeSegmentFromGroup(groupId, segmentId)
    if (success) {
      setMicrosegmentGroups(getAllMicrosegmentGroups())
    }
  }
  
  // Check if a segment is active
  const isSegmentActive = (segmentId: string): boolean => {
    if (isControlled && propActiveSegments) {
      // Sprawdź, czy segment jest aktywny w propActiveSegments
      const result = propActiveSegments.some(s => s.segmentId === segmentId && s.visible);
      console.log(`Checking if segment ${segmentId} is active:`, result);
      return result;
    }
    return localActiveSegments.has(segmentId);
  }
  
  // Toggle segment active state
  const toggleSegmentActive = (segmentId: string) => {
    const currentActive = isSegmentActive(segmentId);
    console.log('Toggling segment:', segmentId, 'Current state:', currentActive, 'New state:', !currentActive);
    
    if (isControlled && onSegmentToggle) {
      // Use parent handler if controlled
      onSegmentToggle(segmentId, !currentActive);
    } else {
      // Otherwise use local state
      setLocalActiveSegments(prevActive => {
        const newActive = new Set(prevActive);
        if (currentActive) {
          newActive.delete(segmentId);
        } else {
          newActive.add(segmentId);
        }
        return newActive;
      });
    }
  }
  
  // Render icon helper function
  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[iconName] || HelpCircle
    return <IconComponent className="h-5 w-5" />
  }
  
  return (
    <div className="segment-manager">
      <div className="segment-manager-header">
        <h2>Menedżer Segmentów</h2>
        <div className="segment-manager-actions">
          <button 
            className="btn btn-primary" 
            onClick={handleAddSegment}
            disabled={!selectedCategoryId}
          >
            <Plus size={16} /> Dodaj Segment
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={handleAddGroup}
            disabled={!selectedCategoryId}
          >
            <FolderPlus size={16} /> Dodaj Mikrosegment
          </button>
        </div>
      </div>
      
      <div className="segment-manager-content">
        <div className="segment-manager-sidebar">
          <h3>Kategorie</h3>
          <ul className="category-list">
            {categories.map(category => {
              const IconComponent = Icons[category.iconName] || HelpCircle
              return (
                <li 
                  key={category.id} 
                  className={`category-item ${selectedCategoryId === category.id ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <span className="category-icon">
                    <IconComponent className="h-5 w-5" />
                  </span>
                  <span className="category-name">{category.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
        
        <div className="segment-manager-main">
          {editingSegment ? (
            <div className="segment-editor">
              <h3>{isAddingSegment ? 'Dodaj Nowy Segment' : 'Edytuj Segment'}</h3>
              <form className="segment-form">
                <div className="form-group">
                  <label htmlFor="segment-name">Nazwa</label>
                  <input 
                    id="segment-name"
                    type="text" 
                    value={editingSegment.name || ''} 
                    onChange={e => setEditingSegment({...editingSegment, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="segment-icon">Ikona</label>
                  <div className="icon-preview">
                    {editingSegment.iconName && renderIcon(editingSegment.iconName)}
                  </div>
                  <select 
                    id="segment-icon"
                    value={editingSegment.iconName || ''} 
                    onChange={e => setEditingSegment({...editingSegment, iconName: e.target.value})}
                  >
                    <option value="">Wybierz ikonę</option>
                    {Object.keys(Icons)
                      .filter(key => typeof Icons[key] === 'function' && key !== '__esModule')
                      .map(iconName => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="segment-emoji">Emoji (opcjonalnie)</label>
                  <input 
                    id="segment-emoji"
                    type="text" 
                    value={editingSegment.emoji || ''} 
                    onChange={e => setEditingSegment({...editingSegment, emoji: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="segment-type">Typ</label>
                  <select 
                    id="segment-type"
                    value={editingSegment.type || 'toggle'} 
                    onChange={e => setEditingSegment({
                      ...editingSegment, 
                      type: e.target.value as 'toggle' | 'slider' | 'input' | 'select'
                    })}
                  >
                    <option value="toggle">Przełącznik</option>
                    <option value="slider">Suwak</option>
                    <option value="input">Pole tekstowe</option>
                    <option value="select">Lista wyboru</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="segment-category">Kategoria</label>
                  <select 
                    id="segment-category"
                    value={editingSegment.categoryId || ''} 
                    onChange={e => setEditingSegment({...editingSegment, categoryId: e.target.value})}
                    required
                  >
                    <option value="">Wybierz kategorię</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="segment-description">Opis (opcjonalnie)</label>
                  <textarea 
                    id="segment-description"
                    value={editingSegment.description || ''} 
                    onChange={e => setEditingSegment({...editingSegment, description: e.target.value})}
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleSaveSegment}
                  >
                    <Save size={16} /> Zapisz
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setEditingSegment(null)
                      setIsAddingSegment(false)
                    }}
                  >
                    <X size={16} /> Anuluj
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {selectedCategoryId ? (
                <div className="segments-container">
                  <h3>Segmenty</h3>
                  <div className="segments-list">
                    {filteredSegments.length > 0 ? (
                      filteredSegments.map(segment => {
                        const IconComponent = Icons[segment.iconName] || HelpCircle
                        const isActive = isSegmentActive(segment.id)
                        
                        return (
                          <div key={segment.id} className="segment-item">
                            <div className="segment-item-header">
                              <span className="segment-icon">
                                <IconComponent className="h-5 w-5" />
                              </span>
                              <span className="segment-name">{segment.name}</span>
                              <div className="segment-toggle" onClick={(e) => {
                                e.stopPropagation(); // Zapobiega propagacji kliknięcia
                                toggleSegmentActive(segment.id);
                              }}>
                                <div className={`toggle-switch ${isActive ? 'active' : ''}`}>
                                  <div className="toggle-slider"></div>
                                </div>
                                <span className="toggle-label">{isActive ? 'ON' : 'OFF'}</span>
                              </div>
                              <div className="segment-actions">
                                <button 
                                  className="btn btn-icon" 
                                  onClick={() => handleEditSegment(segment)}
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  className="btn btn-icon btn-danger" 
                                  onClick={() => handleRemoveSegment(segment.id)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            {segment.description && (
                              <div className="segment-description">{segment.description}</div>
                            )}
                          </div>
                        )
                      })
                    ) : (
                      <div className="empty-state">Brak segmentów w tej kategorii</div>
                    )}
                  </div>
                  
                  <h3>Grupy Mikrosegmentów</h3>
                  <div className="groups-list">
                    {filteredGroups.length > 0 ? (
                      filteredGroups.map(group => {
                        const GroupIconComponent = Icons[group.iconName] || HelpCircle
                        
                        return (
                          <div key={group.id} className="group-item">
                            <div className="group-item-header">
                              <span className="group-icon">
                                <GroupIconComponent className="h-5 w-5" />
                              </span>
                              <span className="group-name">{group.name}</span>
                              <div className="group-actions">
                                <button 
                                  className="btn btn-icon btn-danger" 
                                  onClick={() => handleRemoveGroup(group.id)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            {group.description && (
                              <div className="group-description">{group.description}</div>
                            )}
                            <div className="group-segments">
                              <h4>Segmenty w tej grupie</h4>
                              {group.segments.length > 0 ? (
                                <ul className="group-segments-list">
                                  {group.segments.map(segment => {
                                    const SegIconComponent = Icons[segment.iconName] || HelpCircle
                                    
                                    return (
                                      <li key={segment.id} className="group-segment-item">
                                        <span className="segment-icon">
                                          <SegIconComponent className="h-5 w-5" />
                                        </span>
                                        <span className="segment-name">{segment.name}</span>
                                        <button 
                                          className="btn btn-icon btn-danger" 
                                          onClick={() => handleRemoveSegmentFromGroup(group.id, segment.id)}
                                        >
                                          <X size={14} />
                                        </button>
                                      </li>
                                    )
                                  })}
                                </ul>
                              ) : (
                                <div className="empty-state">Brak segmentów w tej grupie</div>
                              )}
                              <div className="add-to-group">
                                <select 
                                  className="segment-select"
                                  onChange={e => {
                                    if (e.target.value) {
                                      handleAddSegmentToGroup(group.id, e.target.value)
                                      e.target.value = ''
                                    }
                                  }}
                                >
                                  <option value="">Dodaj segment do grupy...</option>
                                  {filteredSegments
                                    .filter(s => !group.segments.some(gs => gs.id === s.id))
                                    .map(segment => (
                                      <option key={segment.id} value={segment.id}>
                                        {segment.name}
                                      </option>
                                    ))
                                  }
                                </select>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="empty-state">Brak grup mikrosegmentów w tej kategorii</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <p>Wybierz kategorię, aby zarządzać segmentami</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
