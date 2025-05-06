import { 
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useLocation } from 'react-router-dom';
import '../navbar.css'
import { useState } from 'react';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Exchange Rates (Live)', path: '/exchange_rates_live' },
  { label: 'Error Page', path: '/error_page' },
];



const Navbar : React.FC= () => {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const location = useLocation();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
    <AppBar position='static' color='primary' sx={{width : "100%"}} >
      <Toolbar>
        <Box sx={{display : { xs : "flex" , sm : "none"}, marginX: "15px"}}>
         <IconButton
         size="large"
         edge="end"
         color='inherit'
         onClick={() => setDrawerOpen(true)}
         >
          <MenuIcon/>
         </IconButton>
        </Box> 

        <Typography variant="h6" component="div" sx={{  flexGrow: 1 , gap: "10px"}}>
          Loan Calculator
        </Typography>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item : NavItem ) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive } : {isActive : boolean}) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {item.label}
              </NavLink>
            ))}
        </Box>
      </Toolbar>
    </AppBar>

    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
         <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton 
                component={NavLink} 
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    }
                  }
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Box>
      </Drawer>
    </>

  )
}

export default Navbar;