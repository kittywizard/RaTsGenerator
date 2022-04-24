import { useState } from "react";
import { flavorData } from "../data/flavors";


export default function useDropdown() {


    const flavorSet = new Set(flavorData.map(flavor => flavor.theme))
    
    const [dropdownState, setDropdownState] = useState({
        theme: ""
    });
    

    function handleChange(event) {
        const {value} = event.target;
        console.log(value)
        setDropdownState(() => {
            return {
                theme: value
            }
        })
    }
    return {flavorSet, handleChange, dropdownState}
}