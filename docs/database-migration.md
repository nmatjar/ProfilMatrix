# Database Migration Strategy for ProfileMatrix

This document outlines the strategy for transitioning the ProfileMatrix segment library from a file-based system to a database-backed solution.

## Current Architecture

The current implementation uses a file-based approach with the following structure:

- `src/lib/segment-types.ts` - TypeScript interfaces defining the data structure
- `src/lib/segment-data.ts` - Static data arrays containing all segments, categories, and microsegment groups
- `src/lib/segment-service.ts` - Service layer that provides access to the data

This architecture was designed with future database migration in mind, using:

1. **ID-based references** instead of nested objects
2. **Single source of truth** for all data
3. **Service abstraction layer** to hide the data source implementation

## Database Schema

When migrating to a database, the following schema should be implemented:

### Tables

#### `categories`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(50) | Primary key, matches the current ID format |
| name | VARCHAR(100) | Display name |
| icon_name | VARCHAR(50) | Name of the icon from Lucide React |
| description | TEXT | Optional description |

#### `segments`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(50) | Primary key, matches the current ID format |
| name | VARCHAR(100) | Display name |
| icon_name | VARCHAR(50) | Name of the icon from Lucide React |
| emoji | VARCHAR(10) | Optional emoji character |
| type | ENUM | 'toggle', 'slider', 'input', or 'select' |
| min | INT | Minimum value for sliders |
| max | INT | Maximum value for sliders |
| step | FLOAT | Step value for sliders |
| default_value | VARCHAR(50) | Default value as string |
| category_id | VARCHAR(50) | Foreign key to categories.id |
| description | TEXT | Optional description |

#### `segment_options`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(50) | Primary key |
| segment_id | VARCHAR(50) | Foreign key to segments.id |
| label | VARCHAR(100) | Display label |
| value | VARCHAR(50) | Value to use in code generation |
| emoji | VARCHAR(10) | Optional emoji character |

#### `microsegment_groups`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(50) | Primary key |
| name | VARCHAR(100) | Display name |
| icon_name | VARCHAR(50) | Name of the icon from Lucide React |
| category_id | VARCHAR(50) | Foreign key to categories.id |
| description | TEXT | Optional description |

#### `microsegment_group_segments`
| Column | Type | Description |
|--------|------|-------------|
| group_id | VARCHAR(50) | Foreign key to microsegment_groups.id |
| segment_id | VARCHAR(50) | Foreign key to segments.id |

#### `user_profiles`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(50) | Primary key |
| user_id | VARCHAR(50) | User identifier |
| name | VARCHAR(100) | Profile name |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

#### `active_segments`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(50) | Primary key |
| profile_id | VARCHAR(50) | Foreign key to user_profiles.id |
| segment_id | VARCHAR(50) | Foreign key to segments.id |
| value | VARCHAR(100) | Selected value |
| visible | BOOLEAN | Whether segment is visible in code |
| order | INT | Display order |

## Migration Steps

### 1. Set Up Database

```sql
-- Create tables based on the schema above
CREATE TABLE categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  description TEXT
);

-- Create other tables...
```

### 2. Seed Initial Data

Create a migration script that reads the current data from `segment-data.ts` and inserts it into the database:

```typescript
import { categories, segments, microsegmentGroups } from '../lib/segment-data';
import { db } from './database-connection';

async function seedDatabase() {
  // Insert categories
  for (const category of categories) {
    await db.query(
      'INSERT INTO categories (id, name, icon_name, description) VALUES (?, ?, ?, ?)',
      [category.id, category.name, category.iconName, category.description]
    );
  }

  // Insert segments
  for (const segment of segments) {
    await db.query(
      'INSERT INTO segments (id, name, icon_name, emoji, type, min, max, step, default_value, category_id, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        segment.id, 
        segment.name, 
        segment.iconName, 
        segment.emoji, 
        segment.type, 
        segment.min, 
        segment.max, 
        segment.step, 
        segment.defaultValue, 
        segment.categoryId, 
        segment.description
      ]
    );

    // Insert segment options if any
    if (segment.options) {
      for (const option of segment.options) {
        await db.query(
          'INSERT INTO segment_options (id, segment_id, label, value, emoji) VALUES (?, ?, ?, ?, ?)',
          [option.id, segment.id, option.label, option.value, option.emoji]
        );
      }
    }
  }

  // Insert microsegment groups and their relationships
  // ...
}

seedDatabase().catch(console.error);
```

### 3. Update Service Layer

Modify `segment-service.ts` to use database queries instead of static arrays:

```typescript
import { db } from './database-connection';
import * as Icons from 'lucide-react';

// Helper to convert icon name to component
function getIconComponent(iconName) {
  return Icons[iconName] || Icons.HelpCircle;
}

export async function getAllCategories() {
  const [rows] = await db.query('SELECT * FROM categories ORDER BY name');
  return rows.map(category => ({
    ...category,
    icon: getIconComponent(category.icon_name)
  }));
}

export async function getSegmentsByCategory(categoryId) {
  const [rows] = await db.query(
    'SELECT * FROM segments WHERE category_id = ? ORDER BY name',
    [categoryId]
  );
  
  // For each segment, fetch its options
  const segmentsWithOptions = await Promise.all(rows.map(async segment => {
    const [options] = await db.query(
      'SELECT * FROM segment_options WHERE segment_id = ? ORDER BY id',
      [segment.id]
    );
    
    return {
      ...segment,
      icon: getIconComponent(segment.icon_name),
      options: options
    };
  }));
  
  return segmentsWithOptions;
}

// Implement other methods...
```

### 4. Update Components

Update React components to handle asynchronous data loading:

```tsx
import { useEffect, useState } from 'react';
import { getAllCategories } from '../lib/segment-service';

function SegmentCategorySelector() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadCategories();
  }, []);
  
  if (isLoading) return <div>Loading categories...</div>;
  
  return (
    // Component JSX using categories data
  );
}
```

## Admin Interface

Consider building a simple admin interface for managing segments and categories:

1. Create CRUD operations in the service layer
2. Build admin pages for:
   - Category management
   - Segment management
   - Microsegment group management
   - Option management

## Performance Considerations

1. **Caching**: Implement caching for frequently accessed data
2. **Pagination**: Add pagination for large data sets
3. **Indexing**: Ensure proper database indexes on foreign keys and frequently queried columns

## Security Considerations

1. **Input Validation**: Validate all user inputs before database operations
2. **Parameterized Queries**: Use parameterized queries to prevent SQL injection
3. **Access Control**: Implement proper access control for admin functionality

## Testing Strategy

1. Create unit tests for the service layer
2. Create integration tests for database operations
3. Create end-to-end tests for the UI components

## Rollback Plan

1. Keep the file-based implementation as a fallback
2. Implement feature flags to switch between implementations
3. Create database snapshots before major changes

---

By following this migration strategy, the transition from a file-based system to a database-backed solution should be smooth and maintainable.
