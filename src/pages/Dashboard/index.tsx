import React, { useCallback, useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectImput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChart from '../../components/PieChart';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';

import listMonths from '../../utils/month';

import { Container, Content } from './styles';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinning from '../../assets/grinning.svg';
import ops from '../../assets/ops.svg';

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear(),
  );

  const year = useMemo(() => {
    const uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
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
  }, []);

  const month = useMemo(() => {
    return listMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total = 0;
    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount! Amount must be number');
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total = 0;
    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount! Amount must be number');
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Que triste!',
        description: 'Neste mês, você gastou mais do que deveria.',
        footer:
          'Verifique seus gastos e tente cortar algumas coisas desnecessárias.',
        icon: sadImg,
      };
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: 'Ops!',
        description:
          'Neste mês, neste mês não há registros de entradas e saídas.',
        footer:
          'Parece que você não fez nenhum registro no mês e ano selecionado.',
        icon: ops,
      };
    } else if (totalBalance === 0) {
      return {
        title: 'Ufaa!',
        description: 'Neste mês, você gastou exatamente o que ganhou.',
        footer: 'Tenha cuidado. No próximo mês tente poupar o seu dinheiro.',
        icon: grinning,
      };
    } else {
      return {
        title: 'Muito bem!',
        description: 'Sua carteira está positiva!',
        footer: 'Continue assim. Considere investir o saldo.',
        icon: happyImg,
      };
    }
  }, [totalBalance, totalGains, totalExpenses]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = ((totalGains * 100) / total).toFixed(0);
    const percentExpenses = ((totalExpenses * 100) / total).toFixed(0);

    const data = [
      {
        name: 'Entradas',
        value: totalGains,
        percent: Number(percentGains) ? Number(percentGains) : 0,
        color: '#e44c4e',
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: Number(percentExpenses) ? Number(percentExpenses) : 0,
        color: '#f7931b',
      },
    ];

    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return listMonths
      .map((_, month) => {
        let amountEntry = 0;
        gains.forEach((gain) => {
          const date = new Date(gain.date);
          const gainMonth = date.getMonth();
          const gainYear = date.getFullYear();
          if (gainMonth === month && gainYear === yearSelected) {
            try {
              amountEntry += Number(gain.amount);
            } catch {
              throw new Error(
                'amountEntry is invalid. amountEntry must be number.',
              );
            }
          }
        });
        let amountOutput = 0;
        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const expenseMonth = date.getMonth();
          const expenseYear = date.getFullYear();
          if (expenseMonth === month && expenseYear === yearSelected) {
            try {
              amountOutput += Number(expense.amount);
            } catch {
              throw new Error(
                'amountOutput is invalid. amountOutput must be number.',
              );
            }
          }
        });
        console.log();
        return {
          monthNumber: month,
          month: listMonths[month].substr(0, 3),
          amountEntry,
          amountOutput,
        };
      })
      .filter((item) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return (
          (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
          yearSelected < currentYear
        );
      });
  }, [yearSelected, monthSelected]);

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === 'recorrente') {
          return (amountRecurrent += Number(expense.amount));
        }
        if (expense.frequency === 'eventual') {
          return (amountEventual += Number(expense.amount));
        }
      });

    const total = amountEventual + amountRecurrent;

    const percentRecurrent = Number(
      ((amountRecurrent * 100) / total).toFixed(0),
    );

    const percentEventual = Number(((amountEventual * 100) / total).toFixed(0));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#f7931b',
      },
      {
        name: 'Eventual',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#e44c4e',
      },
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === 'recorrente') {
          return (amountRecurrent += Number(gain.amount));
        }
        if (gain.frequency === 'eventual') {
          return (amountEventual += Number(gain.amount));
        }
      });
    const total = amountEventual + amountRecurrent;

    const percentRecurrent = Number(
      ((amountRecurrent * 100) / total).toFixed(0),
    );

    const percentEventual = Number(((amountEventual * 100) / total).toFixed(0));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#f7931b',
      },
      {
        name: 'Eventual',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#e44c4e',
      },
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = useCallback(
    (month: string) => {
      try {
        const parseMonth = Number(month);
        setMonthSelected(parseMonth);
      } catch (error) {
        throw new Error('Invalid month value. Is accept 0 - 24.');
      }
    },
    [monthSelected],
  );

  const handleYearSelected = useCallback(
    (year: string) => {
      try {
        const parseYear = Number(year);
        setYearSelected(parseYear);
      } catch (error) {
        throw new Error('Invalid year value. Is accept integer number.');
      }
    },
    [yearSelected],
  );

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
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
      <Content>
        <WalletBox
          title="saldo"
          color="#4e41f0"
          amount={totalBalance}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="dolar"
        />
        <WalletBox
          title="entradas"
          color="#f7931b"
          amount={totalGains}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="arrowUp"
        />
        <WalletBox
          title="saídas"
          color="#e44c4e"
          amount={totalExpenses}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="arrowDown"
        />
        <MessageBox
          description={message.description}
          footerText={message.footer}
          icon={message.icon}
          title={message.title}
        />
        <PieChart data={relationExpensesVersusGains} />
        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#f7931b"
          lineColorAmountOutput="#e44c4e"
        />
        <BarChartBox
          data={relationExpensevesRecurrentVersusEventual}
          title="Saídas"
        />
        <BarChartBox
          data={relationGainsRecurrentVersusEventual}
          title="Entradas"
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
