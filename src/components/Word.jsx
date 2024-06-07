import styled from "styled-components"

const [background,color] = ["#0c0c0c","aliceblue"]


const Piece = styled.div
`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: ${background};
    color:${color};
    font-weight:500;
    border-radius:.5rem;
    padding:0.5rem 1rem;
    margin:.5rem .5rem;
    border:1px solid transparent;
    font-size:14px;
    &:hover{
        border-color:${color};
    }
`;

const Word = (props) =>{
    return(
        <Piece>
            {props.text}
        </Piece>
    )
}

export default Word