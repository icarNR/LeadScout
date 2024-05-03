import PropTypes from 'prop-types'; // Import PropTypes
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {ThemeProvider } from '@mui/material/styles';
import {theme} from '../../App';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs({ panelcontent1, panelcontent2 }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={'sd:w-550'} sx={{  overflow: 'hidden' ,flex:'column'}}>
      <Box sx={{ width: 'fit-content', border: 1, borderColor: 'divider', borderRadius: 2 }}>
      <ThemeProvider theme={theme}><Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          
          TabIndicatorProps={{
            style: {
              backgroundColor: 'lightgreen', // Background color of the selected tab
              height:4, // Remove the default underline
              borderRadius: 3, // Apply border radius to the selected tab
              width:71,
              marginLeft: 11
             ,
            },
          }}
        >
          <Tab label="Me" />

          <Tab label="Others" />
        </Tabs></ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0}>
      {panelcontent1}  
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      {panelcontent2}
      </CustomTabPanel>
    </Box>
  );
}
