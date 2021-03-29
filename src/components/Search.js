import React, { useState } from 'react';
import './app/App.css';

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
    };

    return (
        <div>
            <form onSubmit={updateSearch}>
                <div>
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={updateSearch}
                    />
                    <button type={'submit'}>Search</button>
                </div>
            </form>
        </div>
    );
}

export default Search;
