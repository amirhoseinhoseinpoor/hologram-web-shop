'use client'
import "./Styles/Header.scss";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    return(
        <section className="header-main-background">
           <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'inline-block' }}>
        Main Title
        <button aria-controls="menu" aria-haspopup="true" onClick={handleMenuOpen}>
          ▾
        </button>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{ 'aria-labelledby': 'menu' }}
        >
          <MenuItem onClick={handleMenuClose}>Sub Item 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Sub Item 2</MenuItem>
        </Menu>
      </Box>
    </Box>
        </section>
    )
}