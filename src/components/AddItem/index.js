import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as itemAction } from "../../redux/reducers/Reducer";
function AddItem() {
  const dispatch = useDispatch();
  const { itemsList } = useSelector((state) => state.reducer);
  const [name,setName] = useState('');
  const [price,setPrice] = useState('');

  const handleSubmit =()=>{
    if(name && price){
      itemsList.push({name:name,price:price,index:itemsList.length});
      dispatch(itemAction.updateItems(itemsList));
      setName('');
      setPrice('');
    }else{
      if(!name){
        alert('Please enter name');
      }
      if(!price){
        alert('Please enter price');
      }
    }
  }

  return (
    <div style={{display: 'flex',marginTop: '10px'}}>
      <div className="form-group  flex-item">
            <input type="text" className="form-control" placeholder="Enter name" id="name" value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>
          <div className="form-group  flex-item">
            <input type="number" className="form-control" placeholder="Enter price" id="price" value={price}
              onChange={(e)=>{setPrice(e.target.value)}}
            />
          </div>
          <div className="form-group flex-item">
            <button className="btn btn-primary" onClick={handleSubmit} data-dismiss="modal">Add Item</button>
          </div>
    </div>
  );
}

export default React.memo(AddItem);
