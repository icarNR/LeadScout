// MenuAppBar.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import logo from '../../assets/Group 20.png';
import CustomizedProgressBars from '../common/ProgressBar'; // Import the CustomizedProgressBars component
import DepartmentFilter from './DepartmentFilter'; // Import the DepartmentFilter component

export default function MenuAppBar({ percentage }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [department, setDepartment] = useState('All Departments');
  const departments = ['All Departments', 'it', 'HR', 'management'];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '12px', paddingBottom: '12px' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: '100px', sm: '180px' }, flexShrink: { xs: 1, sm: 0 } }}>
              <img
                src={logo}
                alt="LeadScoutLogo"
                style={{ marginRight: '16px', width: '100%', objectFit: 'contain' }} // Adjust width and margin as needed
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DepartmentFilter
                department={department}
                setDepartment={setDepartment}
                departments={departments}
              />
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 34, height: 34 }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
          <Box className="w-full fixed top-16">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
              <CustomizedProgressBars progress={percentage} />
            </div>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}

export function MenuAppBarWithoutProgressBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [department, setDepartment] = useState('All Departments');
  const departments = ['All Departments', 'it', 'HR', 'management'];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between', paddingTop: '15px', paddingBottom: '15px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt="LeadScout Logo"
              style={{ width: '180px', marginRight: '16px' }} // Adjust width and margin as needed
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DepartmentFilter
              department={department}
              setDepartment={setDepartment}
              departments={departments}
            />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 34, height: 34 }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
