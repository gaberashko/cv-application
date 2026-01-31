import "./SidebarButton.scss";
import type { buttonProps } from "./Button";

type sidebarButtonProps = buttonProps & {
    hidden: boolean;
}

export default function SidebarButton(props: sidebarButtonProps) {
    return (
        <button className={"sidebar " + (props.hidden? "hidden" : "")} onClick={props.onClick} style={props.styles}>{props.text}</button>
        )
}