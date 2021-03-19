import { Grid } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const List = styled(Grid)`
    margin-top: 2rem;
    margin-bottom: 2rem;

    h1 {
        color: #222;
        margin-top: 5rem;
    }
`;

export const Items = styled(Grid)`
    margin-top: 2rem;
    height: 22rem;
    border: 1px solid #00BFFF;
    box-shadow: 1px solid #222;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;

`;

