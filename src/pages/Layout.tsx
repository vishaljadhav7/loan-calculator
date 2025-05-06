
import Navbar from '../components/Navbar';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box sx={{display : "flex", flexDirection : "column", minHeight : "100vh"}}>
      <Navbar/>
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet/>
      </Container>
    </Box>
  )
}

export default Layout;