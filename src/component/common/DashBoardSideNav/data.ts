import {
  BookmarkBorder,
  CalendarMonth,
  Dashboard,
  HeadsetMic,
  HistoryOutlined,
  ListOutlined,
  Mail as MailIcon,
  OnlinePrediction,
  SearchOutlined,
} from '@mui/icons-material';

export const items = [
  { items: [{ name: 'Dashboard', Icon: Dashboard, link: '/dashboard' }] },
  {
    title: 'Auction',
    items: [
      { name: 'Auctions', Icon: MailIcon, link: '/dashboard/auction' },
      { name: 'Calendar', Icon: CalendarMonth, link: '/dashboard/calendar' },
      {
        name: 'Active Bids',
        Icon: OnlinePrediction,
        link: '/dashboard/active-bids',
      },
      { name: 'saved', Icon: BookmarkBorder, link: '/dashboard/saved' },
    ],
  },
  {
    title: 'Vehicle finder',
    items: [
      { name: 'search', Icon: SearchOutlined, link: '/dashboard/search' },
      { name: 'listings', Icon: ListOutlined, link: '/dashboard/listings' },
      {
        name: 'Recent view',
        Icon: HistoryOutlined,
        link: '/dashboard/recent-view',
      },
      { name: 'help center', Icon: HeadsetMic, link: '/dashboard/help-center' },
    ],
  },
];
