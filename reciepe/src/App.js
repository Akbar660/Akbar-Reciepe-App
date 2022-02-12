import { useState } from "react";
import * as React from 'react';

import Axios from "axios";
import styled from "styled-components";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';


import {
  Header,
  APPNameComponent,
  AppIcon,
  SearchComponent,
  SearchIcon,
  SearchInput,
} from "./components/headercomponent";

import {
  ReciepeCotainer,
  CoverImage,
  ReciepeName,
  Ingrediants,
  SeeMoreText
} from "./components/reciepeComponent"

const APP_ID="07b6c0da";
const APP_KEY="37a69186a7b487ac47b58083eaf73cd8";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

 const ReciepeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
`;

const Placeholder=styled.img`
width: 20%;
margin-top: 8%;
`


const ReciepeComponent=(props)=>{
  const {item}=props;
  const [open, setOpen] = React.useState(false);

  // console.log(item)
return(
  <>
  <Dialog open={open} >
  <DialogTitle>{"Ingredients"}</DialogTitle>
   <DialogContent>
        <table>
           <thead>
             <th>Ingredients</th>
             <th>Weight</th>
           </thead>
           <tbody>
           {item.ingredients.map((ingredient)=>{
              return <tr>
                <td>{ingredient.text}</td>
                <td>{ingredient.weight}</td>
               </tr>
            })}
           </tbody>
        </table>
   </DialogContent>
   <DialogActions>
   <SeeMoreText onClick={()=>window.open(item.url)}>See Complete Recepie</SeeMoreText>
   <SeeMoreText onClick={()=>setOpen(false)}>Close</SeeMoreText>
    </DialogActions>
  </Dialog>

  <ReciepeCotainer>
  <CoverImage src={item.image} alt="..loading"/>
  <ReciepeName>{item.label}</ReciepeName>
  <Ingrediants onClick={()=>setOpen(true)}>Ingrediants</Ingrediants>
  <SeeMoreText onClick={()=>window.open(item.url)}>See Complete Recepie</SeeMoreText>
</ReciepeCotainer>
  </>
);
};


function App() {
  const [timeoutId, UpdateTimeoutId] = useState();

  const [reciepeList,setReciepeList]=useState([]);

  const fetchReciepe=async (searchName)=>{
    const response= await Axios.get(`https://api.edamam.com/search?q=${searchName}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    
    console.log(response.data.hits);
    setReciepeList(response.data.hits)
  }

  // debouncing for Apicalls
  const onTextchange = (e) => {
    clearInterval(timeoutId);
    const timeout = setTimeout(() => {
      // console.log(e.target.value);
      fetchReciepe(e.target.value)
    },500);
    UpdateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <APPNameComponent>
          <AppIcon src="hamburger.svg"/>
          Reciepe Finder
        </APPNameComponent>

        <SearchComponent>
          <SearchIcon src="search.svg"/>
          <SearchInput onChange={onTextchange} placeholder="Search Reciepe" />
        </SearchComponent>
      </Header>

      <ReciepeListContainer>
  
         {reciepeList.length ? reciepeList.map((item)=>{
             return <ReciepeComponent item={item.recipe} />
         }):<Placeholder src="hamburger.svg"/>}
          
        
          
      </ReciepeListContainer>
    </Container>
  );
}

export default App;
