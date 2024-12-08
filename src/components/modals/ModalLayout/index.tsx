import styles from "./styles.module.css";
import React, {PropsWithChildren} from "react";
import {CrossIcon} from "@/icons/index";

type ModalProps = {
    onClose: () => void;
}

export const ModalLayout = ({ children, onClose }: PropsWithChildren<ModalProps>) => {
    function onOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        onClose();
    }

    return (
        <div className={styles.overlay} onClick={(e) => onOverlayClick(e)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <CrossIcon className={styles.icon}/>
                </button>
                {children}
            </div>
        </div>
    )
}