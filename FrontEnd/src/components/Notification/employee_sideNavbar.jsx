import { PiMaskHappy } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { HiOutlineBellAlert } from "react-icons/hi2";

import * as React from 'react';


import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 140;
const icons = [<GoHome />, <PiMaskHappy />, <HiOutlineBellAlert />];


export default function ClippedDrawer({content, pagename}) {
  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Toolbar />

        <Box sx={{ overflow: 'auto' }}>  
          <List> 
            {['Home', 'Personality', 'Notifications'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px', // Add padding for spacing
                  }}
                  onMouseEnter={(e) => e.currentTarget.childNodes[0].style.color = '#f00'}
                  onMouseLeave={(e) => e.currentTarget.childNodes[0].style.color = 'inherit'}
                >
                  <ListItemIcon
                    sx={{
                      color: 'primary.main',
                      mb: 1,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      fontSize: '30px', // Increase icon size
                    }}
                  >
                    {icons[index]}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{
                      textAlign: 'center',
                      alignSelf: 'center',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>  
        </Box>
      </Drawer>
 
    
  );
}