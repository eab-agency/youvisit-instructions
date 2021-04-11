import React, { useState } from 'react';

function Search(props) {
    const [search, setSearch] = useState({
        query: '',
    });
    const updateSearch = (ev) => {
        ev.preventDefault();
        //get input value
        const input = ev.target.value;
        //update state
        setSearch({ ...search, query: input });
        //check APP then pass state of search back up to app
        props.onChildChange && props.onChildChange(search);

        console.log(search);
    };

    return (
        <div>
            <form onSubmit={updateSearch}>
                <div>
                    <input
                        className="searchBar"
                        type="text"
                        placeholder="Institution Name"
                        onChange={updateSearch}
                    />
                    <button className="button" type={'submit'}>
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Search;
