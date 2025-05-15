import React, { useState } from 'react';
import MyButton from './MyButton';

function ItemList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' }
  ]);

  const [showOnlyEven, setShowOnlyEven] = useState(false);

  // Filter items based on condition
  const filteredItems = items.filter(item => {
    if (!showOnlyEven) return true;
    return item.id % 2 === 0;
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setShowOnlyEven(!showOnlyEven)}
          style={{
            padding: '10px 20px',
            backgroundColor: showOnlyEven ? '#ff6b6b' : '#646cff',
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
        {filteredItems.map(item => (
          <MyButton key={item.id} itemName={item.name} />
        ))}
      </div>
    </div>
  );
}

export default ItemList; 