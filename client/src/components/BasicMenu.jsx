import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (data) => {
    if (data) {
      switch (data) {
        case 'report-bug':
          window.open('https://github.com/faticamer/playlist-converter/issues')
          break
        case 'source-code':
          window.open('https://github.com/faticamer/playlist-converter')
          break
        case 'about-playlistify':
          window.open('http://localhost:5173/info')
          break
        default:
          setAnchorEl(null)
          break;
      }
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='size-6'><path fill="#f6f5f4" d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l87 87 87-87c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 345c-9.4 9.4-24.6 9.4-33.9 0L135 241z"/></svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleClose('report-bug')}>Report a Bug</MenuItem>
        <MenuItem onClick={() => handleClose('source-code')}>Check it on GitHub</MenuItem>
        <MenuItem onClick={() => handleClose('about-playlistify')} className=''>About Playlistify</MenuItem>
      </Menu>
    </div>
  );
}