import styled from "styled-components";

export const Container = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #33373e;
   border-radius: 30px;
   padding: 25px;
   gap: 23px;

   img {
      width: 48px;
      height: 48px;
      border-radius: 24px;
   }

   input {
      flex: 1;
      height: 50px;
      border: none;
      border-radius: 4px;
      padding: 0 20px;
      background: #565d67;
      color: #fff;

      &:focus {
         outline: none;
      }
   }

   & > .button {
      color: #fff;
      width: 48px;
      height: 48px;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
   }

   #file-input {
      display: none;
   }

   .addImage {
      background: #f49d6e;
   }

   .createPost {
      background: #e58947;
   }
`;
