export function addToCart(product) {
    return {
        type: 'ADD_TO_CART',
        product
    };
}

export function removeFromCart(id) {
    return {
        type: 'REMOVE_FROM_CART',
        id
    };
}

export function updateAmount(id, quantityCart) {
    return {
        type: 'UPDATE_AMOUNT',
        id,
        quantityCart,
    };
}

export function updateStock(id, quantity) {
    return {
        type: 'UPDATE_STOCK',
        id,
        quantity,
    };
}

export function RESET_ACTION()  {
    return {
        type: "RESET"
  }
}