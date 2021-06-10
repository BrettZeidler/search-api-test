const SearchBar = () => {
    return (
        <div>
            <input
                key="userSearchBar"
                value=""
                placeholder={"Search users"}
                onChange={(e) => "" }
            />
            <button onClick="">Search</button>
        </div>
    );
}

export default SearchBar;