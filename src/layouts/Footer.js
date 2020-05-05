import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';

function Footer() {
  return (
    <>
      <AppBar position="static">
        <Tabs value={0} aria-label="simple tabs example">
          <Tab label="Item One" />
        </Tabs>
      </AppBar>
      <Tab value={1} index={0}>
        Item One
      </Tab>
    </>
  );
}

export default Footer;
