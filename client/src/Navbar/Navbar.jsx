import { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import './NavBar.css'

const ResponsiveAppBar = () => {

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const ref = useRef()

  function checkSize(){
    if (window.innerWidth > 700){
      setIsMenuVisible(false)
    }

  }
  window.addEventListener('resize', checkSize);

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuVisible && ref.current && !ref.current.contains(e.target)) {
        setIsMenuVisible(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isMenuVisible])

  const handleOpenNavMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleCloseNavMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#D0E0EF", position: 'relative', boxShadow: 'none'}}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>            
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
              <a onClick={handleCloseNavMenu} href='/' className='CentralLinksNavBar NavLinks'>
                Home
              </a>
              <a onClick={handleCloseNavMenu} href='#' className='CentralLinksNavBar NavLinks'>
                Donate
              </a>
            </Box>
          </Toolbar>
        </Container>
        {isMenuVisible && 
        <div className='ContainerDropdown' ref={ref} >
          <a href='/' className='DropDownElement'>Home</a>
          <a href='#' className='DropDownElement'>Donate</a>
        </div>}
        
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;