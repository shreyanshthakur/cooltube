import React, { useEffect, useState } from "react";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestoins] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    console.log(searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1 ">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="https://th.bing.com/th/id/OIP.YwZImfZTSczA_EzsVXFJmAHaHa?w=167&h=180&c=7&r=0&o=5&pid=1.7"
        />
        <img
          className="h-7 mx-4"
          alt="youtube-logo"
          src="https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-9.png"
        />
      </div>
      <div className="col-span-10 ">
        <div>
          <input
            className="px-5 w-1/2 border border-gray-400  p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestoins(true)}
            onBlur={() => setShowSuggestoins(false)}
          />
          <button className="border border-gray-400 p-2 rounded-r-full bg-gray-100">
            Search
          </button>
        </div>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍{s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          alt="usericon"
          src="data:image/png;base64,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"
        ></img>
      </div>
    </div>
  );
};

export default Head;
