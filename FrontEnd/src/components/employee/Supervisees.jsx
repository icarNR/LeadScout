import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Margin } from '@mui/icons-material';
import RecButton from '../common/Button.jsx';

const group = [
    { id: 1, name: 'John', image: 'john.jpg' },
    { id: 2, name: 'Alice', image: 'alice.jpg' },
    { id: 3, name: 'Bob', image: 'bob.jpg' },
    { id: 4, name: 'Emma', image: 'emma.jpg' }];

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }
// function generate(group, element) {
//   return group.map(item =>
//     React.cloneElement(element, {
//       key: item.id,
//       name: item.name,   
//       image: item.image,
//     })
//   );
// }
const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(7),
    height: theme.spacing(7),
  }));
const handleAssessClick = () => {
    // Action to perform when the button is clicked
    console.log('Button clicked!');
  };
export default function InteractiveList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
        
          <Demo sx={{background: 'white', borderRadius: '8px', border: '1px solid gray'}}>
            <List dense={dense}>
            {group.map(item => (
              <ListItem name={item.name}>
                <ListItemAvatar sx={{ paddingRight: '8px' }}>
                  <Avatar alt={item.name} src={item.image} />
                </ListItemAvatar>
                
                <ListItemText
                  sx={{ marginLeft: '20px' }}
                  primary={item.id}
                  secondary={secondary ? 'Secondary text' : null}
                />

                <ListItemText
                  primary={item.name}
                  secondary={secondary ? 'Secondary text' : null}
                />
                <RecButton text="Assess" onClick={handleAssessClick} />
              </ListItem>
            ))}
            </List>
          </Demo>
    </Box>
  );
}