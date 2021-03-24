import { Badge, Grid, IconButton } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons'
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Menu = () => {

    const products = useSelector(state => state.cart);
    const total = useSelector(state => state.cart.reduce((total, product) =>
        total + product.price * product.quantityCart,
        0
    )
    );

    return (
        <>
            <Link to={'/cart'}>
                <IconButton aria-label="cart" >
                    <ShoppingCart size="large" style={{ color: '#7FFFD4', fontSize: '3rem' }} />
                    <Badge badgeContent={products.length > 0 ? products.length : '0'} color="secondary" style={{ right: 6, top: -5, padding: '0 3px', border: '2px solid #008080', fontSize: '1.75rem' }} />
                </IconButton>
            </Link>
            <Grid>
                <h2>Total das compras: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
            </Grid> 
        </>
    );
}

export default Menu;