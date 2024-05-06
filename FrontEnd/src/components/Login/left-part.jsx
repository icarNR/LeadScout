import React from 'react';
import firstImage from '../../icons/firstImage.png';

function LeftPart() {
  return (
    <div className="left-part h-full w-1/2 bg-cover" style={{ backgroundImage: `url(${firstImage})` }}>
    <div className="logo" style={{ backgroundImage: `url(${MagnifyingGlass})` }}>
      <p>LEADSCOUT</p>
      </div>
    </div>
  );
}

export default LeftPart;
