import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions as itemAction } from "../../redux/reducers/Reducer";
function SearchItem() {
  const dispatch = useDispatch();
  const [search,setSearch] = useState('');
  const [searchBy,setSearchBy] = useState('name');

  const handleSearch=()=>{
    dispatch(itemAction.searchItems(search,searchBy));
  }

  const clearSearch=()=>{
    setSearch('');
    setSearchBy('name');
    dispatch(itemAction.clearSearch());
  }

  return (
    <div style={{display: 'flex',marginTop: '10px'}}>
            <div className="form-group flex-item">
                <input type="text" className="form-control" placeholder="Search" value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}
                    />
            </div>
            <div className="form-group flex-item">
                <select className="form-control" id="sel1" onChange={(e)=>{setSearchBy(e.target.value)}} value={searchBy}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </select>
            </div>   
            <div className="form-group flex-item">
                <button type="button" className="btn btn-secondary" onClick={handleSearch}>
                Search
                </button>
                <button style={{marginLeft: '10px'}} type="button" className="btn btn-secondary" onClick={clearSearch}>
                Clear Search
                </button>
            </div> 
        </div>
  );
}

export default React.memo(SearchItem);
