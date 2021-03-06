/* eslint-disable @next/next/no-img-element */
import { execOnce } from "next/dist/shared/lib/utils";
import styles from "../styles/WindowArrow.module.scss";

const WindowArrow = ({ htmlFor, isLeftward }) => {
    const scrollIntoViewById = (htmlFor) => {
        if (typeof window === "undefined") return;
        const element = document.getElementById(htmlFor);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    }

    return (
        <img 
            src={`./svg/window-arrow.svg`}
            className={`${styles.windowArrow} ${isLeftward ? styles.leftward : styles.rightward}`}
            alt="window-arrow"
            onClick={
                event => {
                    event.stopPropagation();
                    scrollIntoViewById(htmlFor);
                }
            }
        />
    )
}

export default WindowArrow;