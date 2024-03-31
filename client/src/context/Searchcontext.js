import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [Search, SetSearch] = useState({
    Keyword: "",
    Products:[],
  });

  return (
    <SearchContext.Provider value={[Search, SetSearch]}>
      {children}
    </SearchContext.Provider>
  );
}

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
