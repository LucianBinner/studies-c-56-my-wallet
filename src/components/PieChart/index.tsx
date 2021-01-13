import React from 'react';

import {
  PieChart as PieChartRecharts,
  Pie,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight,
} from './styles';

interface IPieChart {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const PieChart: React.FC<IPieChart> = ({ data }) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        {data.map((indicator, index) => (
          <Legend color={indicator.color} key={index}>
            <div>{indicator.percent}%</div>
            <span>{indicator.name}</span>
          </Legend>
        ))}
      </LegendContainer>
    </SideLeft>
    <SideRight>
      <ResponsiveContainer>
        <PieChartRecharts>
          <Pie data={data} dataKey="percent">
            {data.map((indicator, index) => (
              <Cell key={index} fill={indicator.color} />
            ))}
          </Pie>
        </PieChartRecharts>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default PieChart;
