import "./Button.scss";

export type buttonProps = {
    text?: string;
    id?: string;
    type?: "primary" | "secondary";
    onClick?: (e:React.MouseEvent<Element>) => void;
}

export default function Button({text, id, type="primary", onClick = () => {}}: buttonProps) {
    return (
        <button id={id} className={`button--${type}`} onClick={onClick}>{text}</button>
    )
}