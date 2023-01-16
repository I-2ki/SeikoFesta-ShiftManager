import { Accessor , Setter, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { css } from "solid-styled-components";
import SVGImage from "./SVGImage";

import close from "../../assets/close.svg";

type ModalWindowProps = {
    isOpen : Accessor<boolean>,
    setIsOpen : Setter<boolean>,
    title : string,
}

function ModalWindow(props :ModalWindowProps){
    const background = css`
        position: fixed;
        top : 0;
        left: 0;
        width: 100%;
        height : 100%;
        opacity: 30%;
        background-color : black;
    `;

    const container = css`
        display: flex;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        width: 50%;
        height : 50%;
        border : 1px black solid;
        background-color : white;
    `;

    const emptyStyle = css`
        margin-left: auto;
    `;

    const closeIconContainer = css`
        --size : max(3vw,40px);
        width : var(--size);
        height : var(--size);
        &:hover{
            cursor: pointer;
        }
    `;

    return (
        <Show when = {props.isOpen()}>
            <Portal>
                <div class = {background}></div>
                <div class = {container}>
                    <div>{props.title}</div>
                    <div class = {emptyStyle}></div>
                    <div onClick = {() => {props.setIsOpen(false)}} class = {closeIconContainer}>
                        <SVGImage src = {close}></SVGImage>
                    </div>
                </div>
            </Portal>
        </Show>
    );
}

export default ModalWindow;