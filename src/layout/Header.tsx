import "./Header.scss";
import Button from '../components/Button';

type headerProps = {
    title?: string;
}
export default function Header({title}: headerProps) {
    return (<header>
        <h1>{title}</h1>
    </header>)
}