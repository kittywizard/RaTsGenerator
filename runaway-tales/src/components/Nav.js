import Link from "./Link";

export default function Nav(props) {

    const links = [
        {
            name: "Home",
            href: "/index.html"
        },
        {
            name: "Github",
            href: "http://github.com/kittywizard/RaTsGenerator"
        },
        {
            name: "Discord",
            href: "#"
        }
    ];

    const linkMap  = links.map(link => (
        <Link name={link.name} href={link.href}/>
    ));

    return (
        <ul className="hidden md:flex items-center justify-between">
            {linkMap}
        </ul>
    )
}