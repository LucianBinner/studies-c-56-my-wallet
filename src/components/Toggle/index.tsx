import React, { useState } from 'react';

import { Container, ToggleLabel, ToggleSelector } from './styles';

const Toggle: React.FC = () => {
  const [toogleChange, setToogleChange] = useState<boolean>(true);

  const handleChangeToggle = (): boolean => {
    setToogleChange(!toogleChange);
    return toogleChange;
  };

  return (
    <Container>
      <ToggleLabel>Light</ToggleLabel>
      <ToggleSelector
        checked={toogleChange}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={handleChangeToggle}
      />
      <ToggleLabel>Dark</ToggleLabel>
    </Container>
  );
};

export default Toggle;
