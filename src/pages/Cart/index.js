import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveIcon, Delete as CloseIcon } from '@material-ui/icons';

import * as CartActions from '../../store/modules/cart/actions';

import * as S from './styled';


const Cart = () => {
    const dispatch = useDispatch();

    const products = useSelector(state => state.cart.map(product => ({
        ...product,
        quantityCart: product.quantityCart,
        subtotal: product.price * product.quantityCart
    })));

    const total = useSelector(state => state.cart.reduce((total, product) =>
        total + product.price * product.quantityCart,
        0
    )
    );

    function increment(product) {
        if (product.quantityCart < product.quantity) {
            dispatch(CartActions.updateAmount(product.id, product.quantityCart + 1));
        } 
    }

    function decrement(product) {
        dispatch(CartActions.updateAmount(product.id, product.quantityCart - 1));
    }

    function removeItem(product) {
        dispatch(CartActions.removeFromCart(product));
    }


    console.log(products, total);
    return (
        <Grid container style={{ padding: '2rem' }}>
            <Link to={'/'} style={{ textDecoration: 'none', color: '#222', fontSize: '1.75rem' }}>
                Voltar
            </Link>
            <S.List container xs={8} direction="column">
                <h1>Carrinho</h1>


                {products.length > 0 ? products.map(i =>
                    <S.Items key={i.id} container alignItems="center" >

                        <Grid item >
                            <Grid container direction="column" style={{ marginBottom: '1.5rem' }}>

                                <Button onClick={() => removeItem(i.id)} style={{ width: '5rem', position: 'absolute', right: '2rem' }} >
                                    <CloseIcon />
                                </Button>

                                <Grid container xs={6} alignItems="center" justify="center" style={{ width: '30rem', border: '1px solid #222', backgroundColor: '#00BFFF', borderRadius: '2px' }}>
                                    <span style={{ fontSize: '2.5rem', padding: '1rem' }}>Subtotal: {i.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>

                                    <Grid style={{ padding: '1rem' }}>
                                        <Button onClick={() => decrement(i)} style={{ width: '1rem !important', height: '2rem' }}>
                                            <RemoveIcon />
                                        </Button>
                                        <span style={{ padding: '2rem' }}>{i.quantityCart}</span>
                                        <Button onClick={() => increment(i)} style={{ width: '1rem !important', height: '2rem' }}>
                                            <AddCircleIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <h2 style={{ marginBottom: '3rem' }}>{i.title}</h2>
                            <span style={{ fontWeight: 'bold', fontSize: '2.2rem' }}>Valor: {i.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>



                        </Grid>
                    </S.Items>
                ) : 'Sem nenhum item no carrinho'}
            </S.List>
            <div>
                <span style={{ fontSize: '2.5rem' }}>TOTAL: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
        </ Grid>
    );
}

export default Cart;