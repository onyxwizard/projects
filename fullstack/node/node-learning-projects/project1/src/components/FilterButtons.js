import React from 'react';

function FilterButtons({ filter, setFilter }) {
  const filters = ['all', 'active', 'completed'];

  return (
    <div>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={{ fontWeight: filter === f ? 'bold' : 'normal' }}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;