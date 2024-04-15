import LogoIcon from "../../assets/logo.svg"
import { Link } from "react-router-dom"

export default function Logo() {
    return<>
        <Link className="h-full flex items-center" to={'/'}>
            <img width={48} src={LogoIcon} alt="logo" />
        </Link>
    </>
}