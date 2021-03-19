import { Badge, IconButton } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons'
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <Link to={'/cart'}>
            <IconButton aria-label="cart">
                <ShoppingCart size="large" style={{ color: '#7FFFD4', fontSize: '3rem' }} />
                <Badge badgeContent={2} color="primary" style={{ right: 6, top: -5, padding: '0 3px', border: '2px solid #008080' }} />
            </IconButton>
        </Link>
    );
}

export default Menu;