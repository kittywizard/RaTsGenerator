import Nav from "./Nav";

export default function Header(){
    return (
        <header className="p-6 mx-auto container flex items-center justify-between bg-gray-green-light">
            <div className="container">
               <h1 className="text-dark-green text-2xl font-bold">
                     Runaway Tales
                </h1>
                <p className="text-gray">A Writing Prompt Generator</p>
            </div>

            <Nav />
        </header>
    )
}