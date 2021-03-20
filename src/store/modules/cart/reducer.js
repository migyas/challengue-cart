import produce from 'immer';

export default function cart(state = [], action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.product.id);
                const qtdStock = action.product.quantity;


                if (productIndex >= 0) {
                    draft[productIndex].quantityCart += 1;
                    draft[productIndex].quantity -= 1;

                } else {
                    draft.push({
                        ...action.product,
                        quantityCart: 1,
                        quantity: action.product.quantity - 1
                    });
                }

                if (qtdStock == 0) {
                    throw new Error('Sem estoque')
                }

                console.log(qtdStock)

            });
        case 'REMOVE_FROM_CART':
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);


                if (productIndex >= 0) {
                    draft.splice(productIndex, 1);
                }
            });
        case 'UPDATE_AMOUNT': {

            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);


                if (productIndex >= 0) {
                    draft[productIndex].quantityCart = Number(action.quantityCart);
                }
            });

        };
        case 'UPDATE_STOCK': {

            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);


                if (productIndex >= 0) {
                    draft[productIndex].quantity = Number(action.quantity);
                }
            });

        };
        case "RESET":
            return state;

        default:
            return state;
    }
}