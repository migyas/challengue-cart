import React, { useState, useCallback, useEffect } from 'react';
import { Button, Grid, Modal, Paper } from '@material-ui/core';
import { AddShoppingCartOutlined, CloseOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';

import api from '../../services/api'
import * as S from './styled';
import Menu from '../../components/Menu';
import * as CartActions from '../../store/modules/cart/actions';


const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState({});
    const [status, setStatus] = useState({});
    const [open, setOpen] = useState(false);
    const history = useHistory();


    const productsCart = useSelector(state => state.cart.map(product => ({
        ...product,
        quantityCart: product.quantityCart,
    })));


    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getProduct = useCallback(async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            setDetails(response.data)
            handleOpen();

        } catch (e) {
            console.log('Erro do get ' + e)
        }

    }, []);

    useEffect(() => {
        async function getProducts() {
            const response = await api.get('/products');
            setProducts(response.data);
            setStatus(response.status);
        };

        getProducts();

    }, [])

    const handleAddProductToCart = useCallback(async (product) => {

        const cartItemIndex = await productsCart.find(e => e.id === product.id);

        if (product.quantity > cartItemIndex?.quantityCart) {
            dispatch(CartActions.addToCart(product));
            history.push('/cart')

        } else if (cartItemIndex === undefined) {
            dispatch(CartActions.addToCart(product));
            history.push('/cart')

        } else {
            alert('Quantidade de estoque no limite.');
            setOpen(false);
        }

    }, [dispatch, productsCart, history]);

    console.log('RESULTADO DO PRODUTOS', productsCart.map(e => e))


    const buyButton = (product) => {

        if (product.quantity > 0) {
            return (
                <Button fullWidth onClick={() => handleAddProductToCart(product)} style={{ backgroundColor: 'yellowgreen', color: '#fff', fontSize: '1.5rem', height: '5rem' }}>
                    Comprar
                    <AddShoppingCartOutlined fontSize="large" style={{ marginLeft: '1rem' }} />
                </Button>
            )
        }

        return (
            <Button fullWidth variant="contained" style={{ color: '#fff', fontSize: '1.5rem', height: '5rem' }}>
                Comprar
            </Button>
        )

    }


    return (
        <S.Container>
            <Menu />
            <S.List container xs direction="column">
                <h1>Listagem de Produtos</h1>

                {products.map(i =>
                    <S.Items key={i.id} container alignItems="center" onClick={() => getProduct(i.id)}>
                        <Grid xs={3}>
                            {status === 200 ? <img src={i.picture} alt="product ilustration" style={{ maxHeight: '18rem', maxWidth: '18rem', padding: '1rem' }} /> : <div style={{ width: '25rem', height: '20rem', backgroundColor: 'yellowgreen', }} />}
                        </Grid>
                        <Grid xs>
                            <h2 style={{ marginBottom: '3rem' }}>{i.title}</h2>

                            <span style={{ fontWeight: 'bold', fontSize: '2.2rem' }}>{i.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </Grid>
                    </S.Items>
                )}
            </S.List>

            <Modal open={open} onClose={handleClose}>
                <Paper
                    elevation={3}
                    style={{
                        maxWidth: '50rem',
                        backgroundColor: '#fff',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '5px',
                    }}>
                    <Grid container direction="column" alignItems="center" style={{ minWidth: '35rem' }} >
                        <Button onClick={() => handleClose()}>
                            <CloseOutlined />
                        </Button>
                        <h1 style={{ marginTop: '2rem' }}>{details.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                        <span style={{ fontSize: '1.7rem' }}>({details.quantity}) un</span>
                        <Grid container justify="center" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
                            <img src={details.picture} alt="product img" style={{ width: '15rem', height: '15rem' }} />
                            <h2>{details.title}</h2>
                            <p style={{ fontSize: '1.2rem' }}>{details.description}</p>
                        </Grid>
                        <Grid container item>
                            {buyButton(details)}
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>

        </S.Container>
    );
}

export default Catalog;