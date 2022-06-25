import React, { useState } from 'react';
import s from './dashboard.module.scss';
import {
  Button,
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { items as data } from './data';
import { ShoppingCart } from '@mui/icons-material';
import clsx from 'clsx';

const DashBoardSideNav = () => {
  const [active, setActive] = useState<string>('Dashboard');

  return (
    <aside className={s.container}>
      <div className="dashboard_wrapper">
        {data.map(({ title, items }, idx) => (
          <div key={idx}>
            <div className="block">
              {title && (
                <h4 className="block_title">
                  <span style={{ fontStyle: 'initial' }}> {title}</span>
                </h4>
              )}
              <div className="block_list">
                {items.map(({ name, Icon }, itemIdx) => (
                  <ListItemButton
                    key={name}
                    selected={name === active}
                    onClick={() => setActive(name)}
                    className={clsx([
                      'list_item_btn',
                      { [s.active]: name === active },
                    ])}
                  >
                    <ListItemIcon>
                      <Icon color={name === active ? 'primary' : 'secondary'} />
                    </ListItemIcon>
                    <ListItemText primary={name} />
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
