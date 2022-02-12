import styled from "styled-components";



export const ReciepeCotainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 3px 10px 0 #aaa;
`;
export const CoverImage = styled.img`
  height: 200px;
  object-fit:cover;
`;
export const ReciepeName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 10px;
`;
export const Ingrediants = styled.span`
  font-size: 18px;
  font-weight: bold;
  border: 1px solid green;
  text-align: center;
  padding: 8px 13px;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 4px;
  color: green;
`;
export const SeeMoreText = styled(Ingrediants)`
  color: red;
  border: 1px solid red;
`;