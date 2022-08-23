import { css } from "solid-styled-components";

function SVGImage(props :any){
    const mask = css`
        width:100%;
        height: 100%;
    `;
  
    const maskImage = css`
      display: block;
      width: 100%;
      height: 100%;
      background-color: #4150BF;
      mask: url(${props.src}) no-repeat center center / contain;
      -webkit-mask: url(${props.src}) no-repeat center center / contain;
    `;
    return (
      <div class = {mask}>
        <span class = {maskImage}></span>
      </div>
    );
}

export default SVGImage;