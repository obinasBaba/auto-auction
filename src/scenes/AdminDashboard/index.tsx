import React from 'react';
import s from './admindashbaord.module.scss';
import { Box, Tab, Tabs } from '@mui/material';
import PendingPage from '@/scenes/AdminDashboard/Pending';
import {
  BlockTwoTone,
  CheckCircleTwoTone,
  PendingTwoTone,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ mt: 4 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={s.container}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Pending" icon={<PendingTwoTone />} iconPosition="start" />
          <Tab
            label="Accepted"
            icon={<CheckCircleTwoTone />}
            iconPosition="start"
          />
          <Tab label="Blocked" icon={<BlockTwoTone />} iconPosition="start" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PendingPage verifiedOnly={false} permissionValue="applied" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PendingPage verifiedOnly={true} permissionValue="accepted" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PendingPage verifiedOnly={true} permissionValue="rejected" />
      </TabPanel>
    </div>
  );
};

export default AdminDashboard;
