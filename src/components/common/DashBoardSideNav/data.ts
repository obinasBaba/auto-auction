import {
  BookmarkBorder,
  CalendarMonth,
  Dashboard,
  Drafts,
  ListOutlined,
  Mail as MailIcon,
  OnlinePrediction,
  SearchOutlined,
  Sell,
} from '@mui/icons-material';

export const items = [
  { items: [{ name: 'Dashboard', Icon: Dashboard, link: '/dashboard' }] },
  {
    title: 'Auction',
    items: [
      { name: 'Auctions', Icon: MailIcon, link: '/dashboard/auction' },
      {
        name: 'Bids/Purchase',
        Icon: CalendarMonth,
        link: '/dashboard/purchase-bids',
      },
      {
        name: 'Active Bids',
        Icon: OnlinePrediction,
        link: '/dashboard/active-bids',
      },
      { name: 'saved', Icon: BookmarkBorder, link: '/dashboard/saved' },
      { name: 'search', Icon: SearchOutlined, link: '/dashboard/search' },
    ],
  },
  {
    title: 'Your Business',
    items: [
      { name: 'scheduled', Icon: ListOutlined, link: '/dashboard/scheduled' },
      {
        name: 'active',
        Icon: OnlinePrediction,
        link: '/dashboard/active',
      },
      { name: 'sold', Icon: Sell, link: '/dashboard/sold' },
      { name: 'draft', Icon: Drafts, link: '/dashboard/draft' },
    ],
  },
];
