import styled from "styled-components";

export const Container = styled.div`
   width: 100%;

   &:not(:last-child) {
      margin-bottom: 30px;
   }
`;

export const Input = styled.input`
   background: transparent;
   height: 60px;
   width: 100%;
   border: none;
   margin-left: 20px;
   color: ${({ theme }) => theme.colors.texts.label};
   font-size: 16px;

   &:focus {
      outline: none;
   }
`;

export const Label = styled.div`
   font-size: 14px;
   color: ${({ theme }) => theme.colors.texts.label};
   margin-bottom: 8px;
`;

export const Content = styled.div`
   background: ${({ theme }) => theme.colors.grey_50};
   opacity: 0.8;
   height: 60px;
   width: 100%;
   border-radius: 4px;
   display: flex;
   align-items: center;
   padding: 0 20px;

   & > svg {
      color: ${({ theme }) => theme.colors.texts.title};
      font-size: 24px;
   }
`;
