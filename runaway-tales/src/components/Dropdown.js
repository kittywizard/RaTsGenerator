import useDropdown from "../hooks/useDropdown"
import Option from "./Option";
import { nanoid } from "nanoid";

export default function Dropdown(props){

    const {flavorSet, handleChange, dropdownState} = useDropdown();

    const dropdownMap = [];
 
    flavorSet.forEach(option => {
        dropdownMap.push(        
        <Option 
            value={option}
            key={nanoid()}
        />)
    });


    return (
       <div className="container text-center p-4">
           <label htmlFor={props.name}>Select a theme:</label>
           <select name={props.name} 
                    className="p-2 m-2 bg-gray-green-light rounded-md"
                    onChange={handleChange}
                    value={dropdownState.theme}
            >
                <Option value="" />
                {dropdownMap}
           </select>
       </div>
    )
}