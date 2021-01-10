import React from 'react';
import { Grid } from './styles';
import MainHeader from '../MainHeader';
import Aside from '../Aside';
import Content from '../Content';
import PropTypes from 'prop-types';

const Layout: React.FC = ({ children }) => {
  return (
    <Grid>
      <MainHeader />
      <Aside />
      <Content>{children}</Content>
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node]).isRequired,
};

export default Layout;
