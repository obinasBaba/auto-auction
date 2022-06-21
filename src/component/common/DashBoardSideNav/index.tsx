import React from 'react';
import s from './dashboard.module.scss';
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { Mail as MailIcon, ShoppingCart } from '@mui/icons-material';

const items = [
  { items: ['Dashboard'] },
  {
    title: 'Auction',
    items: ['Auctions', 'Calendar', 'Active Bids', 'saved'],
  },
  {
    title: 'Vehicle finder',
    items: ['search', 'listings', 'Recent view', 'help center'],
  },
];

const DashBoardSideNav = () => {
  return (
    <aside className={s.container}>
      <div className="dashboard_wrapper">
        {items.map(({ title, items }, idx) => (
          <div key={idx}>
            <div className="block">
              {title && (
                <h4 className="block_title">
                  <span style={{ fontStyle: 'initial' }}> {title}</span>
                </h4>
              )}
              <div className="block_list">
                {items.map((item, idx) => (
                  <ListItemButton key={item}>
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItemButton>
                ))}
              </div>
            </div>
          </div>
        ))}

        <Paper className="sell_car">
          <p>
            A new way to buy
            <br /> modern and sell old cars
          </p>
          <Button
            className="btn"
            variant="contained"
            startIcon={<ShoppingCart />}
          >
            Sell You Car
          </Button>
        </Paper>
      </div>
    </aside>
  );
};

export default DashBoardSideNav;
