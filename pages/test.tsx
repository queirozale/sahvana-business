import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import ChipInput from 'material-ui-chip-input';
import Button from '@material-ui/core/Button';

const App = () =>{
  const [yourChips, setYourChips] = useState([]);
  const [chips, setChips] = useState(['foo', 'bar']);

  const handleChange = (chips) => {
    setChips(chips);
  };

  const handleAddChip = (chip) => {
    setYourChips([...chips, chip]);
  };

  const handleClick = () => {
    console.log(chips)
  }


  return(
    <div>
      {/* // uncontrolled input */}
      UNCONTROLLED
      <ChipInput
        defaultValue={['foo', 'bar']}
        onChange={(chips) => handleChange(chips)}
      />
      <Button onClick={handleClick}>
        CLICK ME
      </Button>
      <h3>{chips}</h3>
    </div>
  );
};

export default App;