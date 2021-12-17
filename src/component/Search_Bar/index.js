import React, { useState, useRef } from "react";
import "./search.css";
import {BsSearch} from 'react-icons/bs';
import {ImCancelCircle} from 'react-icons/im'

const hints = [
    {
        hint:'what is the total revenue of year 2020'
    },
    {
        hint:'give me total revenue in 2020'
    },
    {
        hint:'give me department patient average in 2020'
    },
    {
        hint:'give total patient name in june 2020'
    },
    {
        hint:'give me total patient in each department'
    },
    {
        hint:'give me total patient in each department'
    },
]

function SearchBar() {
  const [filteredData, setFilteredData] = useState(undefined)
  const [wordEntered, setWordEntered] = useState("");
  const [isHintShow,setIsHintShow] = useState(undefined);
  
  const inputRef = useRef(null)


  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    
    const newFilter = hints && hints.length > 0 && hints.filter((value) => {
      return value.hint.toLocaleLowerCase().indexOf(searchWord.toLocaleLowerCase()) > -1;
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  

  return (
    <div className="search">
        <h2 className="searchBar">Search Bar</h2>
      <div className="searchInputs">
        <input
          type="text"
          value={wordEntered}
          onChange={handleFilter}
          onFocus={()=> setIsHintShow(true)}
          ref={inputRef}
        />
      <div className="searchIcon">
          {(filteredData && filteredData.length === 0) &&
           <ImCancelCircle id="clearBtn" onClick={clearInput} />
          }
        </div>
      </div>
      {isHintShow && filteredData && filteredData.length != 0 && (
          
        <div className="dataHints">
          {filteredData.map((value) => {
            return (
              <a onClick={()=> {
                setIsHintShow(false)
                setWordEntered(value.hint)
                if(inputRef && inputRef.current){
                    inputRef.current.focus()
                }
              } } className="dataItem" target="_blank">
                <p>{value.hint}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;