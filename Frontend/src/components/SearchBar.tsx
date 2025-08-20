import React, { useEffect, useState } from "react";
import searchIcon from "../assets/search.svg";
import { useNavigate, useParams } from "react-router-dom";

function SearchBar() {
    const navigate = useNavigate();
    const {search} = useParams();
    const [searchInp, setSearchInp] = useState("");

    useEffect(()=>{
        if(search !== undefined) setSearchInp(search);
    },[])


    const handleSearchInpChange = (inp: string) => {
        // logic behind search
        setSearchInp(inp);
        if(searchInp.length === 0) navigate('/')
        navigate(`/search/${inp}`);
    };

    return (
        <>
            <form className="bg-[#181818] h-[3rem] w-[50%] flex items-center ml-5 px-4 rounded-full ">
                <input
                    value={searchInp}
                    placeholder="Find your next favorite song"
                    className="h-full text-xl mx-1 w-full focus:outline-none"
                    onChange={(e: any) => handleSearchInpChange(e.target.value)}
                />
                <img src={searchIcon} />
            </form>
        </>
    );
}

export default SearchBar;
