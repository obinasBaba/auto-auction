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
import {
  AllInclusiveTwoTone,
  CelebrationTwoTone,
  ExpandMore,
  ShoppingCart,
  ShoppingCartCheckoutTwoTone,
  SmsFailedTwoTone,
} from '@mui/icons-material';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

const PurchaseHistory = ({}: any) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  const links = [
    '/dashboard/purchase-bids/bidding',
    '/dashboard/purchase-bids/wins',
    '/dashboard/purchase-bids/lost',
  ];

  console.log('pathname :', pathname);

  return (
    <List component="nav">
      <ListItemButton
        onClick={() => setOpen(!open)}
        className="list_item_btn"
        selected={links.includes(pathname)}
      >
        <ListItemIcon>
          <ShoppingCartCheckoutTwoTone />
        </ListItemIcon>
        <ListItemText primary="Purchase/Bids" />
        {open ? (
          <ExpandLess fontSize="small" />
        ) : (
          <ExpandMore fontSize="small" />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding dense className="sub_list">
          <Link href="/dashboard/purchase-bids/bidding">
            <a>
              <ListItemButton
                sx={{ ml: 4 }}
                selected={pathname === '/dashboard/purchase-bids/bidding'}
                className={clsx([
                  'list_item_btn',
                  {
                    [s.active]: '/dashboard/purchase-bids/bidding' === pathname,
                  },
                ])}
              >
                <ListItemIcon>
                  <AllInclusiveTwoTone
                    color={
                      '/dashboard/purchase-bids/bidding' === pathname
                        ? 'primary'
                        : 'secondary'
                    }
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText primary="Bidding" />
              </ListItemButton>
            </a>
          </Link>
          <Link href="/dashboard/purchase-bids/lost">
            <a>
              <ListItemButton
                sx={{ ml: 4 }}
                selected={pathname === '/dashboard/purchase-bids/lost'}
                className={clsx([
                  'list_item_btn',
                  {
                    [s.active]: '/dashboard/purchase-bids/lost' === pathname,
                  },
                ])}
              >
                <ListItemIcon>
                  <SmsFailedTwoTone
                    fontSize="small"
                    color={
                      '/dashboard/purchase-bids/lost' === pathname
                        ? 'primary'
                        : 'secondary'
                    }
                  />
                </ListItemIcon>
                <ListItemText primary="Loosed" />
              </ListItemButton>
            </a>
          </Link>
          <Link href="/dashboard/purchase-bids/wins">
            <a>
              <ListItemButton
                sx={{ ml: 4 }}
                selected={pathname === '/dashboard/purchase-bids/wins'}
                className={clsx([
                  'list_item_btn',
                  {
                    [s.active]: '/dashboard/purchase-bids/wins' === pathname,
                  },
                ])}
              >
                <ListItemIcon>
                  <CelebrationTwoTone
                    fontSize="small"
                    color={
                      '/dashboard/purchase-bids/wins' === pathname
                        ? 'primary'
                        : 'secondary'
                    }
                  />
                </ListItemIcon>
                <ListItemText primary="Wins" />
              </ListItemButton>
            </a>
          </Link>
        </List>
      </Collapse>
    </List>
  );
};

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
                    {items.map(({ name, Icon, link }) =>
                      name === 'Bids/Purchase' ? (
                        <PurchaseHistory />
                      ) : (
                        <Link href={link} key={name}>
                          <a>
                            <ListItemButton
                              key={name}
                              selected={link === pathname}
                              onClick={() => setActive(link)}
                              className={clsx([
                                'list_item_btn',
                                { [s.active]: link === pathname },
                              ])}
                            >
                              <ListItemIcon>
                                <Icon
                                  color={
                                    link === pathname ? 'primary' : 'secondary'
                                  }
                                />
                              </ListItemIcon>
                              <ListItemText primary={name} />
                            </ListItemButton>
                          </a>
                        </Link>
                      ),
                    )}
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
