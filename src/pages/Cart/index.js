import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Modal, Paper, TextField } from '@material-ui/core';
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveIcon, Delete as CloseIcon } from '@material-ui/icons';
import { Formik } from 'formik';

import validations from './validations';
import { maskCpfEvent, maskCepEvent } from '../../util/remask';

import * as CartActions from '../../store/modules/cart/actions';
import * as S from './styled';

const Cart = () => {
    const [open, setOpen] = useState(false);
    const [initialValues] = useState({
        name: '',
        email: '',
        cpf: '',
        cep: '',
        rua: '',
        numero: '',
    });
    const history = useHistory();
    const dispatch = useDispatch();


    function handleSubmitForm(values) {
        console.log(values);
        handleClose();
        localStorage.removeItem('persist:cart');
        history.go(0);
        history.push('/');
    }

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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function increment(product) {
        if (product.quantityCart < product.quantity) {
            dispatch(CartActions.updateAmount(product.id, product.quantityCart + 1));
        } else {
            alert(`Limite de estoque atingido. (${product.quantity})`)
        }
    }

    function decrement(product) {
        if (product.quantityCart <= 1) {
            return;
        } else {
            dispatch(CartActions.updateAmount(product.id, product.quantityCart - 1));
        }
    }

    function removeItem(product) {
        dispatch(CartActions.removeFromCart(product));
    }

    console.log(products, total);
    return (
        <>

            <Grid container style={{ padding: '2rem' }}>
                <Link to={'/'} style={{ textDecoration: 'none', color: '#222', fontSize: '1.75rem' }}>
                    Voltar
            </Link>
                <S.List container direction="column">
                    <h1>Carrinho</h1>


                    {products.length > 0 ? products.map(i =>
                        <S.Items key={i.id} container alignItems="center" >
                            <Grid item >
                                <Grid container direction="column" style={{ marginBottom: '1.5rem' }}>
                                    <Grid container alignItems="center" justify="center">
                                        <Button onClick={() => removeItem(i.id)} style={{ width: '5rem', padding: '1.2rem' }} >
                                            <CloseIcon />
                                        </Button>
                                    </Grid>


                                    <Grid container alignItems="center" xs sm={8} lg={8} justify="center" style={{ border: '1px solid #222', backgroundColor: '#00BFFF', borderRadius: '2px' }}>
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
                    ) : <p style={{ fontSize: '2.5rem', marginTop: '2.5rem' }}>Sem nenhum item no carrinho</p>}
                </S.List>
                {products.length > 0 && <Grid container style={{ marginTop: '4rem', padding: '2rem' }} justify="space-between" alignItems="center">
                    <Button color="primary" onClick={() => handleOpen()} style={{ color: '#fff', backgroundColor: '#24C64A', padding: '.5rem 1.5rem', marginRight: '1.2rem', marginBottom: '2rem', fontSize: '2rem' }} >
                        FINALIZAR COMPRA
                    </Button>
                    <span style={{ fontSize: '2.5rem' }}>TOTAL: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </Grid>} 
            </ Grid>

            <Modal open={open} onClose={handleClose}>
                <Paper
                    elevation={3}
                    style={{
                        width: '60rem',
                        height: '67rem',
                        backgroundColor: '#fff',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '5px',
                    }}>
                    <Grid container xs={12} direction="column" alignItems="center" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '2rem' }}>Finalizar Compras</h2>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmitForm}
                            validationSchema={validations}
                        >
                            {({
                                handleSubmit,
                                handleBlur,
                                handleChange,
                                values,
                                errors,
                                touched,
                                setFieldValue
                            }) => (
                                <form onSubmit={handleSubmit} style={{ padding: '4rem 2rem', width: '100%', fontSize: '2.5rem' }}>
                                    <Grid container xs={12}>
                                        <TextField
                                            label="Nome"
                                            type="text"
                                            placeholder="Nome"
                                            variant="outlined"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            error={!!errors.name && touched.name}
                                            helperText={
                                                errors.name && touched.name ? errors.name : null
                                            }
                                            style={{ width: '100%' }}
                                        />
                                    </Grid>

                                    <Grid container xs={12}>
                                        <TextField
                                            label="E-mail"
                                            type="email"
                                            placeholder="E-mail"
                                            variant="outlined"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            error={!!errors.email && touched.email}
                                            helperText={
                                                errors.email && touched.email ? errors.email : null
                                            }
                                            style={{ width: '100%', marginTop: '1.2rem' }}
                                        />
                                    </Grid>

                                    <Grid container xs={12}>
                                        <TextField
                                            label="CPF"
                                            type="text"
                                            placeholder="CPF"
                                            variant="outlined"
                                            name="cpf"
                                            onChange={e => setFieldValue('cpf', maskCpfEvent(e))}
                                            onBlur={handleBlur}
                                            value={values.cpf}
                                            error={!!errors.cpf && touched.cpf}
                                            helperText={
                                                errors.cpf && touched.cpf ? errors.cpf : null
                                            }
                                            style={{ width: '100%', marginTop: '1.2rem', marginBottom: '1.2rem' }}
                                        />
                                    </Grid>
                                    <label>Endereço</label>
                                    <Grid container xs={12}>
                                        <TextField
                                            label="CEP"
                                            type="text"
                                            placeholder="CEP"
                                            variant="outlined"
                                            name="cep"
                                            onChange={e => setFieldValue('cep', maskCepEvent(e))}
                                            onBlur={handleBlur}
                                            value={values.cep}
                                            error={!!errors.cep && touched.cep}
                                            helperText={
                                                errors.cep && touched.cep ? errors.cep : null
                                            }
                                            style={{ width: '100%', marginTop: '1.2rem' }}
                                        />
                                    </Grid>
                                    <Grid container xs={12}>
                                        <TextField
                                            label="Rua"
                                            type="text"
                                            placeholder="Rua"
                                            variant="outlined"
                                            name="rua"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.rua}
                                            error={!!errors.rua && touched.rua}
                                            helperText={
                                                errors.rua && touched.rua ? errors.rua : null
                                            }
                                            style={{ width: '100%', marginTop: '1.2rem' }}
                                        />
                                    </Grid>
                                    <Grid container xs={7} justify="space-between">
                                        <TextField
                                            label="Bairro"
                                            type="text"
                                            placeholder="Bairro"
                                            variant="outlined"
                                            name="bairro"
                                            multiline
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.bairro}
                                            error={!!errors.bairro && touched.bairro}
                                            helperText={
                                                errors.bairro && touched.bairro ? errors.bairro : null
                                            }
                                            style={{ marginTop: '1.2rem' }}
                                        />
                                        <TextField
                                            label="Nº"
                                            type="text"
                                            placeholder="Complemento"
                                            variant="outlined"
                                            name="numero"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            multiline
                                            size="medium"
                                            value={values.numero}
                                            error={!!errors.numero && touched.numero}
                                            helperText={
                                                errors.numero && touched.numero ? errors.numero : null
                                            }
                                            style={{ marginTop: '1.2rem', fontSize: '3rem' }}
                                        />
                                    </Grid>

                                    <Button type="submit" style={{ width: '24rem', height: '3.5rem', fontSize: '2rem', color: '#fff', backgroundColor: '#24C64A', marginTop: '4rem' }}>
                                        ENVIAR
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    </Grid>
                </Paper>
            </Modal>
        </>
    );
}

export default Cart;