import React, { useState } from 'react';
import MyButton from './MyButton';

function ItemList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' }
  ]);

  const [newItemName, setNewItemName] = useState('');

  // Filter items based on condition
  const filteredItems = items.filter(item => {
    if (!showOnlyEven) return true;
    return item.id % 2 === 0;
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleAddItem}
          style={{
            padding: '8px 16px',
            backgroundColor: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showOnlyEven ? 'Show All Items' : 'Show Only Even IDs'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        {items.map(item => (
          <div key={item.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '8px'
          }}>
            <MyButton itemName={item.name} />
            <button
              onClick={() => handleRemoveItem(item.id)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList; 