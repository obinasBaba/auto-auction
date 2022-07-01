import React, { useEffect, useState } from 'react';
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
import { ShoppingCart, ShoppingCartTwoTone } from '@mui/icons-material';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DashBoardSideNav = () => {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  const [active, setActive] = useState<string>(pathname);

  useEffect(() => {
    console.log('dashboard render');
  }, []);

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
                {items.map(({ name, Icon, link }) => (
                  <Link href={link} key={name}>
                    <a>
                      <ListItemButton
                        key={name}
                        selected={link === active}
                        onClick={() => setActive(link)}
                        className={clsx([
                          'list_item_btn',
                          { [s.active]: link === active },
                        ])}
                      >
                        <ListItemIcon>
                          <Icon
                            color={link === active ? 'primary' : 'secondary'}
                          />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                      </ListItemButton>
                    </a>
                  </Link>
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
                startIcon={<ShoppingCart color="primary" />}
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
