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
  ShoppingCart,
} from '@mui/icons-material';

export const items = [
  { items: [{ name: 'Dashboard', Icon: Dashboard }] },
  {
    title: 'Auction',
    items: [
      { name: 'Auctions', Icon: MailIcon },
      { name: 'Calendar', Icon: CalendarMonth },
      { name: 'Active Bids', Icon: OnlinePrediction },
      { name: 'saved', Icon: BookmarkBorder },
    ],
  },
  {
    title: 'Vehicle finder',
    items: [
      { name: 'search', Icon: SearchOutlined },
      { name: 'listings', Icon: ListOutlined },
      { name: 'Recent view', Icon: HistoryOutlined },
      { name: 'help center', Icon: HeadsetMic },
    ],
  },
];
