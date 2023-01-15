import { Accessor , createEffect, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { css } from "solid-styled-components";
import SVGImage from "./SVGImage";

import close from "../../assets/close.svg";

type ModalWindowProps = {
    isOpen : Accessor<boolean>,
}

function ModalWindow(props :ModalWindowProps){
    const background = css`
        position: absolute;
        top : 0;
        left: 0;
        width: 100%;
        height : 100%;
        opacity: 30%;
        background-color : black;
    `;

    const container = css`
        display: flex;
        position: absolute;
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
        width : 10%;
        height : 10%;
    `;

    return (
        <Show when = {props.isOpen()}>
            <Portal>
                <div class = {background}></div>
                <div class = {container}>
                    <div class = {emptyStyle}></div>
                    <div class = {closeIconContainer}>
                        <SVGImage src = {close}></SVGImage>
                    </div>
                </div>
            </Portal>
        </Show>
    );
}

export default ModalWindow;