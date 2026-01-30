import "./SidebarButton.scss";
import  Button from './Button';
import type { buttonProps } from "./Button";

type sidebarButtonProps = buttonProps & {
    
}

export default function SidebarButton(props: buttonProps) {
    return (
        <button className="sidebar" onClick={props.onClick} onKeyDown={(e) => {
                if (e.repeat) return;
                if (e.key == "Enter" || e.key == " ") props.onClick}}>{props.text}</button>
        )
}