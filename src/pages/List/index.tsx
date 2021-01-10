import React, { useMemo, useState, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectImput';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listMonths from '../../utils/month';

import { Container, Content, Filters } from './styles';

interface IRouteParams {
  match: {
    // O match é disponibilizado pelo react-router-dom
    params: {
      type: string; // Type é definido como parametros da rota no arquivo app.routes
    };
  };
}

interface IData {
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear(),
  );
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState([
    'eventual',
    'recorrente',
  ]);

  const movimentType = match.params.type;

  const pageData = useMemo(() => {
    return movimentType === 'entry-balance'
      ? { Title: 'Entradas', lineColor: '#f7931b', listData: gains }
      : { Title: 'Saídas', lineColor: '#e44c4e', listData: expenses };
  }, [movimentType]);

  const year = useMemo(() => {
    const uniqueYears: number[] = [];

    pageData.listData.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, [pageData.listData]);

  const month = useMemo(() => {
    return listMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const handleFrequencyClick = (frequency: string): string => {
    const alreadySelected = frequencyFilterSelected.findIndex(
      (item) => item === frequency,
    );
    if (alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(
        (item) => item !== frequency,
      );
      setFrequencyFilterSelected(filtered);
    } else {
      setFrequencyFilterSelected((prev) => [...prev, frequency]);
    }
    return '';
  };

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error('Invalid month value. Is accept 0 - 24.');
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error('Invalid year value. Is accept integer number.');
    }
  };

  useEffect(() => {
    const filteredData = pageData.listData.filter((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return (
        month === monthSelected &&
        year === yearSelected &&
        frequencyFilterSelected.includes(item.frequency)
      );
    });

    const formattedData = filteredData.map((item) => {
      return {
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#e44c4e' : '#4e41f0',
      };
    });
    setData(formattedData);
  }, [
    pageData.listData,
    monthSelected,
    yearSelected,
    data.length,
    frequencyFilterSelected,
  ]);

  return (
    <Container>
      <ContentHeader title={pageData.Title} lineColor={pageData.lineColor}>
        <SelectInput
          options={month}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={year}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent ${
            frequencyFilterSelected.includes('recorrente') && 'tag-actived'
          }`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual ${
            frequencyFilterSelected.includes('eventual') && 'tag-actived'
          }`}
          onClick={() => handleFrequencyClick('eventual')}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map((item, index) => (
          <HistoryFinanceCard
            key={index}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dateFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
