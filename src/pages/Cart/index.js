import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const Cart = () => {
    const products = useSelector(state => state.cart.map(product => ({
        ...product,
        subtotal: product.price * product.quantity
    })));

    const total = useSelector(state => state.cart.reduce((total, product) =>
        total + product.price * product.quantity,
        0
    )
    );

    console.log(products, total); 
    return (
        <>
            <Link to={'/'}>
                Voltar
            </Link>
            <h1>Cart</h1>
            <div>
                <span>TOTAL: </span>
            </div>
        </>
    );
}

export default Cart;