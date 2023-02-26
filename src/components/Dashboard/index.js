import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddItem from "../AddItem";
import SearchItem from "../SearchItem";
import { actions as itemAction } from "../../redux/reducers/Reducer";
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { itemsList, pages, itemsPerPage, page } = useSelector((state) => state.reducer);
  
  const sortItems=(sortField, sortOrder)=>{
    dispatch(itemAction.changeSorting(sortField, sortOrder));
  }

  const deleteItem=(index)=>{
    itemsList.forEach((v,i)=>{
        if(v.index === index){
            itemsList.splice(i, 1);
        }
    })
    dispatch(itemAction.updateItems(itemsList));
  }

  const logout=()=>{
    dispatch(itemAction.setLoginSuccess(false));
    navigate('/');
  }

  return (
    <div className="container">
        <button className="btn btn-info" style={{float: 'right'}} onClick={logout}>Logout</button>
        <AddItem/>
        <SearchItem/>
    {itemsPerPage && itemsPerPage.length?<table className="table table-bordered" style={{marginTop: '10px'}}>
    <thead>
      <tr>
        <th>Name <i className="fa fa-sort-up" onClick={()=>{sortItems('name','asc')}}></i><i className="fa fa-sort-down" onClick={()=>{sortItems('name','desc')}}></i></th>
        <th>Price <i className="fa fa-sort-up" onClick={()=>{sortItems('price','asc')}}></i><i className="fa fa-sort-down" onClick={()=>{sortItems('price','desc')}}></i></th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {itemsPerPage?itemsPerPage.map((val,index)=>{
        return(
        <tr key={'item'+index}>
            <td>{val.name}</td>
            <td>{val.price}</td>
            <td><i className="fa fa-trash" onClick={()=>{deleteItem(val.index)}}></i></td>
          </tr>
          )
      }):null}
    </tbody>
  </table>:<p>No item found</p>}
  {pages?<ul className="pagination">
    {pages?pages.map((val,index)=>{
        return(<li key={'page'+index} className={page===index+1?"page-item active":"page-item"}><a style={{cursor: 'pointer'}} className="page-link" href={() => false} onClick={()=>{dispatch(itemAction.changePage(index+1));}}>{index+1}</a></li>);
    }):null}
  </ul>:null}
    </div>
  );
}

export default React.memo(Dashboard);
