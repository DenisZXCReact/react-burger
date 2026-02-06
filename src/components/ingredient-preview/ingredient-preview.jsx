import React from 'react';

import IngredientDetails from '@components/ingredient-details/ingredient-details.jsx';

export default function IngredientPreview({ className, ingredient, children }) {
  const [showIngredientsDetails, setShowIngredientsDetails] = React.useState(false);

  return (
    <div className={className} onClick={() => setShowIngredientsDetails(true)}>
      {children}
      {showIngredientsDetails && (
        <IngredientDetails
          ingredient={ingredient}
          onClose={() => setShowIngredientsDetails(false)}
        />
      )}
    </div>
  );
}
