import { Grid } from '@material-ui/core';
import styled from 'styled-components';

export const List = styled(Grid)`
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 80rem;

    h1 {
        color: #222; 
        margin-top: 5rem;
    }
`;

export const Items = styled(Grid)`
    margin-top: 2rem;
    border: 1px solid #00BFFF;
    box-shadow: 1px solid #222;
    border-radius: 5px;
    background-color: #fff;
    padding: 1rem 2rem;
    position: relative;
`;
