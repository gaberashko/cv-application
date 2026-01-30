import "./SidebarButton.scss";
import type { buttonProps } from "./Button";


export default function SidebarButton(props: buttonProps) {
    return (
        <button className="sidebar" onClick={props.onClick}>{props.text}</button>
        )
}