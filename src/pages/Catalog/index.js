import React, { useEffect, useState } from 'react';
import { Button, Grid, Modal, Paper } from '@material-ui/core';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';

import api from '../../services/api'
import * as S from './styled';
import Menu from '../../components/Menu';


const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState({});

    const [status, setStatus] = useState({});

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getProduct = async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            setDetails(response.data)
            handleOpen();

        } catch (e) {
            console.log('Erro do get ' + e)
        }
    };


    useEffect(async () => {
        const response = await api.get('/products');
        setProducts(response.data);

        setStatus(response.status);

    }, []);

    useEffect(() => {
        getProduct();

    }, []);

    console.log('Log', details.picture);


    return (
        <S.Container>
            <Menu />
            <S.List container xs={8} direction="column">
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
                        width: '60rem',
                        height: '75rem',
                        backgroundColor: '#fff',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '5px',
                    }}>
                    <Grid container item xs={12} direction="column" alignItems="center" style={{ padding: '2rem' }}>
                        <h1>{details.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                        <span style={{ fontSize: '1.7rem' }}>({details.quantity}) un</span>
                        <Grid container justify="center" style={{ padding: '1.5rem', marginTop: '1.5rem', height: '60rem' }}>
                            <img src={details.picture} alt="product img" style={{ width: '15rem', height: '15rem' }} />
                            <h2>{details.title}</h2>
                            <p style={{ fontSize: '1.5rem' }}>{details.description}</p>
                        </Grid>
                        <Grid container item>
                            <Button fullWidth style={{ backgroundColor: 'yellowgreen', color: '#fff', fontSize: '1.5rem', height: '5rem' }}>
                                Comprar
                                <AddShoppingCartOutlinedIcon fontSize="large" style={{ marginLeft: '1rem' }} />
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </S.Container>
    );
}

export default Catalog;