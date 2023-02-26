import { put, takeLatest, select } from "redux-saga/effects";

export const actionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGIN: "LOGIN",
  UPDATE_ITEMS: "UPDATE_ITEMS",
  CHANGE_PAGE: "CHANGE_PAGE",
  CHANGE_SORTING: "CHANGE_SORTING",
  DELETE_ITEM: "DELETE_ITEM",
  SEARCH_ITEMS: "SEARCH_ITEMS",
  CLEAR_SEARCH: "CLEAR_SEARCH",
};

const initialState = {
  starRepoList: [],
  listLoading: false,
  listSuccess: false,
  page:1,
  users:[
    {
      email:'test@gmail.com',
      password:'123'
    }
  ],
  auth: false,
  itemsList: [],
  pages: 0,
  itemsPerPage:[],
  maxRecordPerPage: 2,
  searchItems:[],
  searchEnable:false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SET_CURRENT_PAGE: {
      const { data } = action.payload;
      return {
        ...state,
        page: data
      };
    }

    case actionTypes.LOGIN_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        auth: data,
      };
    }

    case actionTypes.UPDATE_ITEMS: {
      const { data } = action.payload;
      let itemsPerPageTemp = JSON.parse(JSON.stringify(data));
      let pagesTemp = Math.ceil(data.length/state.maxRecordPerPage);
      let tempArr = [];
      for(let i=0;i<pagesTemp;i++){
        tempArr.push(i);
      }
      let tempSlice = [];
      let minusPage = false;
      tempSlice = itemsPerPageTemp.slice((state.page - 1) * state.maxRecordPerPage, state.page * state.maxRecordPerPage);
      if(tempSlice.length){
        tempSlice = itemsPerPageTemp.slice((state.page - 1) * state.maxRecordPerPage, state.page * state.maxRecordPerPage);
        
      }else{
        tempSlice = itemsPerPageTemp.slice((state.page - 2) * state.maxRecordPerPage, (state.page-1) * state.maxRecordPerPage);
        minusPage = true;
      }
      return {
        ...state,
        itemsList: data,
        pages: tempArr,
        itemsPerPage: tempSlice,
        page: minusPage?state.page-1:state.page,
      };
    }

    case actionTypes.CHANGE_PAGE: {
      const { data } = action.payload;
      return {
        ...state,
        page: data,
        itemsPerPage: state.searchEnable ? state.searchItems.slice((data- 1) * state.maxRecordPerPage, data* state.maxRecordPerPage):
        state.itemsList.slice((data- 1) * state.maxRecordPerPage, data* state.maxRecordPerPage),
      };
    }

    case actionTypes.CHANGE_SORTING: {
      const { sortField, sortOrder } = action.payload;
      let sorted;
      if (sortField && state.searchEnable) {
        sorted = [...state.searchItems].sort((a, b) => {
         return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
           numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
         );
        });
       }else{
        sorted = [...state.itemsList].sort((a, b) => {
          return (
           a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
           }) * (sortOrder === "asc" ? 1 : -1)
          );
         });
       }
       let itemsPerPageTemp = JSON.parse(JSON.stringify(sorted));
      let pagesTemp = Math.ceil(sorted.length/state.maxRecordPerPage);
      let tempArr = [];
      for(let i=0;i<pagesTemp;i++){
        tempArr.push(i);
      }
      let tempSlice = [];
      let minusPage = false;
      tempSlice = itemsPerPageTemp.slice((state.page - 1) * state.maxRecordPerPage, state.page * state.maxRecordPerPage);
      if(tempSlice.length){
        tempSlice = itemsPerPageTemp.slice((state.page - 1) * state.maxRecordPerPage, state.page * state.maxRecordPerPage);
      }else{
        tempSlice = itemsPerPageTemp.slice((state.page - 2) * state.maxRecordPerPage, (state.page-1) * state.maxRecordPerPage);
        minusPage = true;
      }
      return {
        ...state,
        itemsList: sorted,
        searchItems: sorted,
        pages: tempArr,
        itemsPerPage: tempSlice,
        page: minusPage?state.page-1:state.page,
      };
    }

    case actionTypes.SEARCH_ITEMS: {
      const { search,searchBy } = action.payload;
      let searchTemp = new RegExp(search);
      let result = state.itemsList.filter(function (el) {
        return searchTemp.test(el[searchBy]);
      });      
      let itemsPerPageTemp = JSON.parse(JSON.stringify(result));
      let pagesTemp = Math.ceil(result.length/state.maxRecordPerPage);
      let tempArr = [];
      for(let i=0;i<pagesTemp;i++){
        tempArr.push(i);
      }
      let tempSlice = [];
      let minusPage = false;
      tempSlice = itemsPerPageTemp.slice((state.page - 1) * state.maxRecordPerPage, state.page * state.maxRecordPerPage);
      if(tempSlice.length){
        tempSlice = itemsPerPageTemp.slice((state.page - 1) * state.maxRecordPerPage, state.page * state.maxRecordPerPage);
      }else{
        tempSlice = itemsPerPageTemp.slice((state.page - 2) * state.maxRecordPerPage, (state.page-1) * state.maxRecordPerPage);
        minusPage = true;
      }
      return {
        ...state,
        searchItems: result,
        searchEnable: true,
        pages: tempArr,
        itemsPerPage: tempSlice,
        page: minusPage?state.page-1:state.page,
      };
    }

    case actionTypes.CLEAR_SEARCH: {
      let itemsPerPageTemp = JSON.parse(JSON.stringify(state.itemsList));
      let pagesTemp = Math.ceil(state.itemsList.length/state.maxRecordPerPage);
      let tempArr = [];
      for(let i=0;i<pagesTemp;i++){
        tempArr.push(i);
      }
      let tempSlice = [];
      let minusPage = false;
      tempSlice = itemsPerPageTemp.slice((state.page - 1) * state.maxRecordPerPage, state.page * state.maxRecordPerPage);
      if(tempSlice.length){
        tempSlice = itemsPerPageTemp.slice((state.page - 1) * state.maxRecordPerPage, state.page * state.maxRecordPerPage);
        
      }else{
        tempSlice = itemsPerPageTemp.slice((state.page - 2) * state.maxRecordPerPage, (state.page-1) * state.maxRecordPerPage);
        minusPage = true;
      }
      return {
        ...state,
        searchEnable: false,
        pages: tempArr,
        itemsPerPage: tempSlice,
        page: minusPage?state.page-1:state.page,
      };
    }

    default: {
      return state;
    }
  }
};

export const actions = {
  setCurrentPage: (page) => ({
    type: actionTypes.SET_CURRENT_PAGE,
    payload: { page },
  }),
  setLoginSuccess: (data) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: { data },
  }),
  login: (email, password) => ({
    type: actionTypes.LOGIN,
    payload: { email, password },
  }),
  updateItems: (data) => ({
    type: actionTypes.UPDATE_ITEMS,
    payload: { data },
  }),
  changePage: (data) => ({
    type: actionTypes.CHANGE_PAGE,
    payload: { data },
  }),
  changeSorting: (sortField, sortOrder) => ({
    type: actionTypes.CHANGE_SORTING,
    payload: { sortField, sortOrder },
  }),
  searchItems:(search,searchBy) => ({
    type: actionTypes.SEARCH_ITEMS,
    payload: { search,searchBy },
  }),
  clearSearch:() => ({
    type: actionTypes.CLEAR_SEARCH,
  }),
};

export function* saga() {
  yield takeLatest(actionTypes.LOGIN, loginSaga);
}

function* loginSaga(action) {
  const { email, password } = action.payload;
  const {users} = yield select((state)=>state.reducer)
  let loginSuccess = false;
  users.forEach((u)=>{
    if(u.email === email && u.password === password){
      loginSuccess = true;
    }
  })
  yield put(actions.setLoginSuccess(loginSuccess));
}