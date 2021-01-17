import styled from 'styled-components';

export const ButtonDiv = styled.button.attrs({
    type: 'submit'
})`
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
    border: 0;
    border-radius: 3em;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    color: white;
    background-color: #1ea7fd;
    font-size: 12px;
    padding: 10px 16px;
    margin-top: 0.5rem;
`;