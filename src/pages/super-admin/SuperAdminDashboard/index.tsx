import React from 'react';
import s from './superadmindashboard.module.scss';
import { Box, Tab, Tabs } from '@mui/material';
import {
  BlockTwoTone,
  CheckCircleTwoTone,
  PendingTwoTone,
} from '@mui/icons-material';
import PendingPage from '@/scenes/ManagerDashboard/Pending';
import { TabPanel } from '@/scenes/ManagerDashboard';
import ManagerList from '@/pages/super-admin/SuperAdminDashboard/ManagerList';

const Superadmindashboard = () => {
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
          <Tab label="All" icon={<PendingTwoTone />} iconPosition="start" />
          <Tab
            label="Accepted"
            icon={<CheckCircleTwoTone />}
            iconPosition="start"
          />
          <Tab label="Blocked" icon={<BlockTwoTone />} iconPosition="start" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ManagerList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>page 2</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>page 3</h1>
      </TabPanel>
    </div>
  );
};

export default Superadmindashboard;
