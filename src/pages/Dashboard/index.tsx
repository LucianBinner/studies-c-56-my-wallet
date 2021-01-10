import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectImput';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const name = [
    { value: 'Lucian', label: 'lucian' },
    { value: 'Paiva', label: 'paiva' },
    { value: 'Binner', label: 'binner' },
  ];
  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#e44c4e">
        {/* eslint-disable-next-line */}
        <SelectInput options={name} onChange={() => {}} />
        {/* eslint-disable-next-line */}
        <SelectInput options={name} onChange={() => {}} />
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
