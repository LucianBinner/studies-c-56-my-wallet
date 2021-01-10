import React, { useMemo } from 'react';

import Toggle from '../Toggle';
import emojis from '../../utils/emojis';

import { Container, Profile, Username, Welcome } from './styles';

// useMemo - É um hooks do react que decora valor

const MainHeader: React.FC = () => {
  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  }, []);

  return (
    <Container>
      <Toggle />
      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <Username>Lucian Binner</Username>
      </Profile>
    </Container>
  );
};

export default MainHeader;
