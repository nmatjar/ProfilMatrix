import React, { useState, useEffect } from 'react'
import { 
  SegmentWithIcon, 
  AreaWithIcon,
  Segment,
  ActiveSegment,
  SubOption
} from '../lib/segment-types'
import { 
  getAllAreas, 
  getAllSegments, 
  addSegment,
  updateSegment,
  removeSegment,
  addArea,
  updateArea,
  removeArea,
  addSubOption,
  removeSubOption,
  getAreaById,
  getSegmentById
} from '../lib/segment-service'
import { Plus, Trash2, Edit, Save, X, FolderPlus, Check, HelpCircle } from 'lucide-react'
import * as Icons from 'lucide-react'

// Interface for props to allow passing active segments from parent
interface SegmentManagerProps {
  activeSegments?: ActiveSegment[];
  onSegmentToggle?: (segmentId: string, active: boolean) => void;
}

export function SegmentManager({ activeSegments: propActiveSegments, onSegmentToggle }: SegmentManagerProps = {}) {
  const [areas, setAreas] = useState<AreaWithIcon[]>([])
  const [segments, setSegments] = useState<SegmentWithIcon[]>([])
  const [selectedAreaId, setSelectedAreaId] = useState<string>('')
  const [editingSegment, setEditingSegment] = useState<Partial<Segment> | null>(null)
  const [editingArea, setEditingArea] = useState<Partial<AreaWithIcon> | null>(null)
  const [isAddingSegment, setIsAddingSegment] = useState(false)
  const [isAddingArea, setIsAddingArea] = useState(false)
  const [editingSubOption, setEditingSubOption] = useState<Partial<SubOption> | null>(null)
  const [isAddingSubOption, setIsAddingSubOption] = useState(false)
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('')
  
  // Local state for active segments when not controlled by parent
  const [localActiveSegments, setLocalActiveSegments] = useState<Set<string>>(new Set())
  
  // Determine if we're using props or local state for active segments
  const isControlled = propActiveSegments !== undefined && onSegmentToggle !== undefined
  
  // Load data
  useEffect(() => {
    const loadData = () => {
      setAreas(getAllAreas())
      setSegments(getAllSegments())
      
      // Set default selected area if none is selected
      if (!selectedAreaId && getAllAreas().length > 0) {
        setSelectedAreaId(getAllAreas()[0].id)
      }
    }
    
    loadData()
  }, [selectedAreaId])
  
  // Toggle segment active state
  const toggleSegment = (segmentId: string) => {
    if (isControlled && onSegmentToggle) {
      // If controlled by parent, call the parent's handler
      onSegmentToggle(segmentId, !propActiveSegments?.some(s => s.segmentId === segmentId))
    } else {
      // Otherwise manage locally
      setLocalActiveSegments(prev => {
        const newSet = new Set(prev)
        if (newSet.has(segmentId)) {
          newSet.delete(segmentId)
        } else {
          newSet.add(segmentId)
        }
        return newSet
      })
    }
  }
  
  // Check if a segment is active
  const isSegmentActive = (segmentId: string): boolean => {
    if (isControlled) {
      return propActiveSegments?.some(s => s.segmentId === segmentId) || false
    }
    return localActiveSegments.has(segmentId)
  }
  
  // Handle adding a new segment
  const handleAddSegment = () => {
    if (!selectedAreaId) return
    
    setEditingSegment({
      name: '',
      iconName: 'Circle',
      type: 'toggle',
      options: [],
      areaId: selectedAreaId
    })
    setIsAddingSegment(true)
  }
  
  // Handle editing an existing segment
  const handleEditSegment = (segment: SegmentWithIcon) => {
    const { icon, ...segmentWithoutIcon } = segment;
    setEditingSegment(segmentWithoutIcon);
    setIsAddingSegment(false);
  }
  
  // Handle saving a segment (new or edited)
  const handleSaveSegment = () => {
    if (!editingSegment || !editingSegment.name || !editingSegment.iconName || !editingSegment.areaId) return
    
    try {
      if (isAddingSegment) {
        // Add new segment
        addSegment({
          name: editingSegment.name,
          iconName: editingSegment.iconName,
          type: editingSegment.type || 'toggle',
          options: editingSegment.options || [],
          areaId: editingSegment.areaId
        })
      } else if (editingSegment.id) {
        // Update existing segment
        updateSegment(editingSegment.id, {
          name: editingSegment.name,
          iconName: editingSegment.iconName,
          type: editingSegment.type,
          options: editingSegment.options,
          areaId: editingSegment.areaId
        })
      }
      
      // Refresh data and reset form
      setSegments(getAllSegments())
      setEditingSegment(null)
    } catch (error) {
      console.error('Error saving segment:', error)
    }
  }
  
  // Handle deleting a segment
  const handleDeleteSegment = (segmentId: string) => {
    if (confirm('Are you sure you want to delete this segment?')) {
      try {
        removeSegment(segmentId)
        setSegments(getAllSegments())
      } catch (error) {
        console.error('Error deleting segment:', error)
      }
    }
  }
  
  // Handle adding a new area
  const handleAddArea = () => {
    setEditingArea({
      name: '',
      iconName: 'Folder',
      description: ''
    })
    setIsAddingArea(true)
  }
  
  // Handle editing an existing area
  const handleEditArea = (area: AreaWithIcon) => {
    const { icon, ...areaWithoutIcon } = area;
    setEditingArea(areaWithoutIcon);
    setIsAddingArea(false);
  }
  
  // Handle saving an area (new or edited)
  const handleSaveArea = () => {
    if (!editingArea || !editingArea.name || !editingArea.iconName) return
    
    try {
      if (isAddingArea) {
        // Add new area
        addArea({
          name: editingArea.name,
          iconName: editingArea.iconName,
          description: editingArea.description || ''
        })
      } else if (editingArea.id) {
        // Update existing area
        updateArea(editingArea.id, {
          name: editingArea.name,
          iconName: editingArea.iconName,
          description: editingArea.description
        })
      }
      
      // Refresh data and reset form
      setAreas(getAllAreas())
      setEditingArea(null)
    } catch (error) {
      console.error('Error saving area:', error)
    }
  }
  
  // Handle deleting an area
  const handleDeleteArea = (areaId: string) => {
    if (confirm('Are you sure you want to delete this area? All associated segments will be orphaned.')) {
      try {
        removeArea(areaId)
        setAreas(getAllAreas())
        
        // If the deleted area was selected, select the first available area
        if (selectedAreaId === areaId) {
          const remainingAreas = getAllAreas()
          setSelectedAreaId(remainingAreas.length > 0 ? remainingAreas[0].id : '')
        }
      } catch (error) {
        console.error('Error deleting area:', error)
      }
    }
  }
  
  // Handle adding a new sub-option
  const handleAddSubOption = (segmentId: string) => {
    setSelectedSegmentId(segmentId)
    setEditingSubOption({
      label: '',
      value: '',
      parentOptionId: '' // Will need to be selected in the form
    })
    setIsAddingSubOption(true)
  }
  
  // Handle saving a sub-option
  const handleSaveSubOption = () => {
    if (!editingSubOption || !editingSubOption.label || !editingSubOption.value || !editingSubOption.parentOptionId || !selectedSegmentId) return
    
    try {
      addSubOption(selectedSegmentId, {
        label: editingSubOption.label,
        value: editingSubOption.value,
        parentOptionId: editingSubOption.parentOptionId
      })
      
      // Refresh data and reset form
      setSegments(getAllSegments())
      setEditingSubOption(null)
    } catch (error) {
      console.error('Error saving sub-option:', error)
    }
  }
  
  // Handle deleting a sub-option
  const handleDeleteSubOption = (segmentId: string, subOptionId: string) => {
    if (confirm('Are you sure you want to delete this sub-option?')) {
      try {
        removeSubOption(segmentId, subOptionId)
        setSegments(getAllSegments())
      } catch (error) {
        console.error('Error deleting sub-option:', error)
      }
    }
  }
  
  // Render the segment manager UI
  return (
    <div className="p-4 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">Segment Manager</h1>
      
      <div className="flex flex-row h-full">
        {/* Areas sidebar */}
        <div className="w-64 border-r pr-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Areas</h2>
            <button 
              className="p-1 bg-green-700 rounded hover:bg-green-600"
              onClick={handleAddArea}
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="space-y-2">
            {areas.map(area => (
              <div 
                key={area.id} 
                className={`flex justify-between items-center p-2 rounded cursor-pointer ${selectedAreaId === area.id ? 'bg-green-900 bg-opacity-30' : 'hover:bg-green-900 hover:bg-opacity-10'}`}
                onClick={() => setSelectedAreaId(area.id)}
              >
                <div className="flex items-center gap-2">
                  {React.isValidElement(area.icon) ? area.icon : null}
                  <span>{area.name}</span>
                </div>
                <div className="flex space-x-1">
                  <button 
                    className="p-1 text-yellow-500 hover:text-yellow-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditArea(area);
                    }}
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    className="p-1 text-red-500 hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteArea(area.id);
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Segments main content */}
        <div className="flex-1 pl-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {selectedAreaId ? `Segments for ${getAreaById(selectedAreaId)?.name || 'Selected Area'}` : 'Segments'}
            </h2>
            {selectedAreaId && (
              <button 
                className="p-2 bg-green-700 rounded hover:bg-green-600 flex items-center"
                onClick={handleAddSegment}
              >
                <Plus size={16} className="mr-1" />
                <span>Add Segment</span>
              </button>
            )}
          </div>
          
          {selectedAreaId ? (
            <div className="space-y-4">
              {segments
                .filter(segment => segment.areaId === selectedAreaId)
                .map(segment => (
                  <div key={segment.id} className="border border-gray-700 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        {React.isValidElement(segment.icon) ? segment.icon : null}
                        <h3 className="text-lg font-medium ml-2">{segment.name}</h3>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          className="p-1 bg-blue-700 rounded hover:bg-blue-600"
                          onClick={() => toggleSegment(segment.id)}
                        >
                          {isSegmentActive(segment.id) ? 'Deactivate' : 'Activate'}
                        </button>
                        <button 
                          className="p-1 bg-yellow-700 rounded hover:bg-yellow-600"
                          onClick={() => handleEditSegment(segment)}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="p-1 bg-red-700 rounded hover:bg-red-600"
                          onClick={() => handleDeleteSegment(segment.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <div className="text-sm text-gray-400">Type: {segment.type}</div>
                      
                      {segment.options && segment.options.length > 0 && (
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-sm font-medium">Options:</h4>
                            <button 
                              className="p-1 bg-green-700 rounded hover:bg-green-600 text-xs"
                              onClick={() => handleAddSubOption(segment.id)}
                            >
                              <Plus size={12} />
                              <span className="ml-1">Add Sub-option</span>
                            </button>
                          </div>
                          <ul className="list-disc list-inside space-y-1">
                            {segment.options.map(option => (
                              <li key={option.id} className="text-sm">
                                {option.label} ({option.value})
                                
                                {/* Sub-options for this option */}
                                {segment.subOptions && segment.subOptions.filter(sub => sub.parentOptionId === option.id).length > 0 && (
                                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                                    {segment.subOptions
                                      .filter(sub => sub.parentOptionId === option.id)
                                      .map(subOption => (
                                        <li key={subOption.id} className="text-xs flex items-center">
                                          <span>{subOption.label} ({subOption.value})</span>
                                          <button 
                                            className="ml-2 text-red-500 hover:text-red-400"
                                            onClick={() => handleDeleteSubOption(segment.id, subOption.id)}
                                          >
                                            <Trash2 size={10} />
                                          </button>
                                        </li>
                                      ))
                                    }
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-8">
              Please select an area to manage its segments
            </div>
          )}
        </div>
      </div>
      
      {/* Area edit/add modal */}
      {editingArea && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{isAddingArea ? 'Add New Area' : 'Edit Area'}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  value={editingArea.name || ''}
                  onChange={(e) => setEditingArea({...editingArea, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <select 
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  value={editingArea.iconName || ''}
                  onChange={(e) => setEditingArea({...editingArea, iconName: e.target.value})}
                >
                  {Object.keys(Icons).map(iconName => (
                    <option key={iconName} value={iconName}>{iconName}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  value={editingArea.description || ''}
                  onChange={(e) => setEditingArea({...editingArea, description: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button 
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                onClick={() => setEditingArea(null)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-green-700 rounded hover:bg-green-600 flex items-center"
                onClick={handleSaveArea}
                disabled={!editingArea.name || !editingArea.iconName}
              >
                <Save size={16} className="mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Segment edit/add modal */}
      {editingSegment && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{isAddingSegment ? 'Add New Segment' : 'Edit Segment'}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  value={editingSegment.name || ''}
                  onChange={(e) => setEditingSegment({...editingSegment, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <select 
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  value={editingSegment.iconName || ''}
                  onChange={(e) => setEditingSegment({...editingSegment, iconName: e.target.value})}
                >
                  {Object.keys(Icons).map(iconName => (
                    <option key={iconName} value={iconName}>{iconName}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select 
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  value={editingSegment.type || 'toggle'}
                  onChange={(e) => setEditingSegment({...editingSegment, type: e.target.value as 'toggle' | 'slider' | 'input' | 'select'})}
                >
                  <option value="toggle">Toggle</option>
                  <option value="slider">Slider</option>
                  <option value="input">Input</option>
                  <option value="select">Select</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Area</label>
                <select 
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  value={editingSegment.areaId || ''}
                  onChange={(e) => setEditingSegment({...editingSegment, areaId: e.target.value})}
                >
                  {areas.map(area => (
                    <option key={area.id} value={area.id}>{area.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Options editor (simplified for this example) */}
              {(editingSegment.type === 'toggle' || editingSegment.type === 'select') && (
                <div>
                  <label className="block text-sm font-medium mb-1">Options</label>
                  <div className="space-y-2">
                    {(editingSegment.options || []).map((option, index) => (
                      <div key={index} className="flex space-x-2">
                        <input 
                          type="text" 
                          placeholder="Label"
                          className="flex-1 p-2 bg-gray-700 rounded border border-gray-600"
                          value={option.label}
                          onChange={(e) => {
                            const newOptions = [...(editingSegment.options || [])];
                            newOptions[index] = {...newOptions[index], label: e.target.value};
                            setEditingSegment({...editingSegment, options: newOptions});
                          }}
                        />
                        <input 
                          type="text" 
                          placeholder="Value"
                          className="w-20 p-2 bg-gray-700 rounded border border-gray-600"
                          value={option.value}
                          onChange={(e) => {
                            const newOptions = [...(editingSegment.options || [])];
                            newOptions[index] = {...newOptions[index], value: e.target.value};
                            setEditingSegment({...editingSegment, options: newOptions});
                          }}
                        />
                        <button 
                          className="p-2 bg-red-700 rounded hover:bg-red-600"
                          onClick={() => {
                            const newOptions = [...(editingSegment.options || [])];
                            newOptions.splice(index, 1);
                            setEditingSegment({...editingSegment, options: newOptions});
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    
                    <button 
                      className="w-full p-2 bg-green-700 rounded hover:bg-green-600 flex items-center justify-center"
                      onClick={() => {
                        const newOptions = [...(editingSegment.options || [])];
                        newOptions.push({
                          id: `option-${Date.now()}`,
                          label: '',
                          value: ''
                        });
                        setEditingSegment({...editingSegment, options: newOptions});
                      }}
                    >
                      <Plus size={16} className="mr-1" />
                      Add Option
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button 
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                onClick={() => setEditingSegment(null)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-green-700 rounded hover:bg-green-600 flex items-center"
                onClick={handleSaveSegment}
                disabled={!editingSegment.name || !editingSegment.iconName || !editingSegment.areaId}
              >
                <Save size={16} className="mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Sub-option add modal */}
      {editingSubOption && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Sub-option</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Parent Option</label>
                <select 
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  value={editingSubOption.parentOptionId || ''}
                  onChange={(e) => setEditingSubOption({...editingSubOption, parentOptionId: e.target.value})}
                >
                  <option value="">Select a parent option</option>
                  {getSegmentById(selectedSegmentId)?.options?.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Label</label>
                <input 
                  type="text" 
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  value={editingSubOption.label || ''}
                  onChange={(e) => setEditingSubOption({...editingSubOption, label: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Value</label>
                <input 
                  type="text" 
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  value={editingSubOption.value || ''}
                  onChange={(e) => setEditingSubOption({...editingSubOption, value: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button 
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                onClick={() => setEditingSubOption(null)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-green-700 rounded hover:bg-green-600 flex items-center"
                onClick={handleSaveSubOption}
                disabled={!editingSubOption.label || !editingSubOption.value || !editingSubOption.parentOptionId}
              >
                <Save size={16} className="mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
