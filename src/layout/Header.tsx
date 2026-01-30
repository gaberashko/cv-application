import "./Header.scss";

type headerProps = {
    title?: string;
    children?: React.ReactNode;
}
export default function Header({title, children}: headerProps) {
    return (<header>
        <h1>{title}</h1>
        {children}
    </header>)
}