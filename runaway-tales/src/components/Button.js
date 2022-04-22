export default function Button(props) {
    return (
        <button 
            className="rounded-md bg-dark-green px-6 py-2 m-2 font-bold text-white hover:bg-green hover:text-dark-green"
            onClick={props.handleClick}>
            Generate
        </button>
    )
}