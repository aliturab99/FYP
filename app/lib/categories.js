// Utility functions for category management

export const fetchCategories = async () => {
  try {
    const res = await fetch('/api/categories');
    if (res.ok) {
      const categories = await res.json();
      return categories.filter(cat => cat.isActive).sort((a, b) => a.order - b.order);
    }
    return [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategoryById = (categories, id) => {
  return categories.find(cat => cat.id === id);
};

export const getCategoryName = (categories, id) => {
  const category = getCategoryById(categories, id);
  return category ? category.name : id.replace('-', ' ');
};

// Default categories for fallback
export const DEFAULT_CATEGORIES = [
  { id: 'medications', name: 'Medications', icon: '💊', order: 1 },
  { id: 'medical-supplies', name: 'Medical Supplies', icon: '🏥', order: 2 },
  { id: 'devices', name: 'Medical Devices', icon: '🔬', order: 3 },
  { id: 'first-aid', name: 'First Aid', icon: '🩹', order: 4 },
  { id: 'hygiene', name: 'Hygiene Products', icon: '🧼', order: 5 },
  { id: 'baby-care', name: 'Baby Care', icon: '👶', order: 6 }
];
