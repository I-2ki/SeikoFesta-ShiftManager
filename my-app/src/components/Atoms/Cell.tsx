import { css } from "solid-styled-components";

function Cell(){
    const cell = css`
        background-color: #D1D1D1;
        min-width: 100px;
        width: 100px;
        max-width: 100px;
        height: 200px;
        border-left: black 0.5px solid;
        border-right: black 0.5px solid;
        &:hover{
            cursor: pointer;
        }
    `;
  
    return(
      <td class = {cell} onClick = {() => console.log("OK")}></td>
    );
}

export default Cell;