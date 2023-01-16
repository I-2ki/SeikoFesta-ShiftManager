import { Accessor , children, ChildrenReturn, JSX, Setter, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { css } from "solid-styled-components";
import SVGImage from "./SVGImage";

import close from "../../assets/close.svg";

type ModalWindowProps = {
    isOpen : Accessor<boolean>,
    setIsOpen : Setter<boolean>,
    title : string,
    children :JSX.Element,
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
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        width: 80%;
        height : 90%;
        border : 1px black solid;
        background-color : white;
    `;

    const top = css`
        display: flex;
        align-items: center;
    `;

    const title = css`
        margin-left: 1vw;
        font-size: max(1vw,20px);
    `;

    const emptyStyle = css`
        margin-left: auto;
    `;

    const closeIconContainer = css`
        --size : max(2vw,40px);
        width : var(--size);
        height : var(--size);
        padding : 0.5vw;
        &:hover{
            cursor: pointer;
        }
    `;

    return (
        <Show when = {props.isOpen()}>
            <Portal>
                <div class = {background}></div>
                <div class = {container}>
                    <div class = {top}>
                        <div class = {title}>{props.title}</div>
                        <div class = {emptyStyle}></div>
                        <div onClick = {() => {props.setIsOpen(false)}} class = {closeIconContainer}>
                            <SVGImage src = {close}></SVGImage>
                        </div>
                    </div>
                    <div>{props.children}</div>
                </div>
            </Portal>
        </Show>
    );
}

export default ModalWindow;