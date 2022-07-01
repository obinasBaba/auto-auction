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
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const DashBoardSideNav = () => {
  const { data: session } = useSession();

  const [active, setActive] = useState<string>('Dashboard');

  if (!session) return null;

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
          <Link href={'/new-listing'}>
            <a>
              <Button
                className="btn"
                variant="contained"
                startIcon={<ShoppingCart />}
              >
                Sell You Car
              </Button>
            </a>
          </Link>
        </Paper>
      </div>
    </aside>
  );
};

export default DashBoardSideNav;
