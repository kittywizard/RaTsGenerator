
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro' 


export default function Nav() {

    return (
        <ul className="hidden md:flex items-center justify-between">
            <li>
                <FontAwesomeIcon icon={brands('github')} />
            </li>
            <li>
                <FontAwesomeIcon icon={brands('discord')} />
            </li>
        </ul>
    )
}