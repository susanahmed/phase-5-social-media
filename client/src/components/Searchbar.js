import React , {useState} from 'react'

function Searchbar(){
    const [searchInput, setSearchInput] = useState("");
    
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    return (
        <div>
            <input type ='text' onChange={handleChange} />

        </div>

    )
}

export default Searchbar