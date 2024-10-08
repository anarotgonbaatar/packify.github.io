import React, { useState } from 'react'

const PackList = ({ packingList, days }) => {
    // Checkbox logic
    const [ checkedItems, setCheckedItems ] = useState(() => {
        // Init all items unchecked
        return packingList.reduce(( acc, item ) => {
            acc[ item.name ] = false;
            return acc;
        }, {});
    })

    // Toggle the checked state of an item
    const handleCheckboxChange = ( itemName ) => {
        setCheckedItems(( prev ) => ({
            ...prev,
            [itemName]: !prev[itemName]
        }));
    }

    // Only unique items are displayed
    const uniqueItems = Array.from( new Set( packingList.map( item => item.name ))); 

    return (
        <div className='cont'>
            <h2>Items to Pack</h2>
            {uniqueItems.length > 0 ? (
            <ul>
                {uniqueItems.map(( itemName, index ) => {
                    const item = packingList.find(item => item.name === itemName);
                    const quantity = item.quantified ? item.quantity * days : item.quantity;  // Only multiply if quantified is true
                    return (
                        <li key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checkedItems[itemName]}
                                    onChange={() => handleCheckboxChange(itemName)}
                                />
                                {quantity} x {itemName}
                            </label>
                        </li>
                    );
                })}
            </ul>
            ) : (
            <span>Select attributes and press Submit to generate a list.</span>
            )}
            <span>Note: The generated list is only a suggestion and it's up to you to remember our specific needs.</span>
        </div>
    );
};

export default PackList