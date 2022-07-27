import React, { useEffect, useState } from 'react';
import s from './dashboard.module.scss';
import {
  Button,
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { items as data } from './data';
import { ShoppingCart } from '@mui/icons-material';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context';

const DashBoardSideNav = () => {
  const { currentUser } = useAppContext();
  const { pathname } = useRouter();

  const [active, setActive] = useState<string>(pathname);
  const { businessAccount } = useAppContext();

  useEffect(() => {
    console.log('dashboard render');
  }, [currentUser, pathname]);

  if (!currentUser?.id) return null;

  return (
    <aside className={s.container}>
      <div className="dashboard_wrapper">
        {data.slice(0, 1).map(({ title, items }, idx) => (
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

        {!currentUser?.isAdmin && (
          <>
            {data.slice(1, 2).map(({ title, items }, idx) => (
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
                                color={
                                  link === active ? 'primary' : 'secondary'
                                }
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

            {businessAccount && (
              <>
                {data.slice(2, 3).map(({ title, items }, idx) => (
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
                                    color={
                                      link === active ? 'primary' : 'secondary'
                                    }
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

                <div className="sell_car">
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
                </div>
              </>
            )}
          </>
        )}
      </div>
    </aside>
  );
};

export default DashBoardSideNav;
