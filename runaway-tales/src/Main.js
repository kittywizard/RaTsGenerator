import Button from "./components/Button"
import useGenerator from "./hooks/useGenerator"

export default function Main() {

    const {test} = useGenerator;
    console.log(test)
    return (
        <main className="container mx-auto flex justify-center">
           <h2 className="m-2 p-2">Generate a Flavor?</h2>
           <Button 
                handleClick={useGenerator}/>
        </main>
    )
}