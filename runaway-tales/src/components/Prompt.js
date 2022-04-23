export default function Prompt(props){ 

    const {prompt, number, flavor, promptType} = props.data;

    return (
        <div className="p-6 m-2 bg-gray-green-light">
            <h4 className="font-bold text-lg text-dark-green">{flavor}</h4>
            <p className="text-xs text-gray font-bold">{promptType}</p>
            <p className="text-dark-gray text-lg py-2">{number}. {prompt}</p>
        </div>
    )
}