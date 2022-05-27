import styled from "styled-components";

export const Container = styled.div`
   display: flex;
   background: ${({ theme }) => theme.colors.grey_50};
   border-radius: 4px;
   padding: 10px;
   align-items: center;

   .info {
      flex: 1;
   }

   svg {
      color: ${({ theme }) => theme.colors.red};
      cursor: pointer;
   }

   img {
      width: 48px;
      height: 48px;
      border-radius: 24px;
      margin-right: 10px;
   }

   .name {
      color: ${({ theme }) => theme.colors.texts.title};
   }

   .username {
      color: ${({ theme }) => theme.colors.orange_700};
      font-weight: bold;
      font-size: 0.85rem;
   }
`;

export const Avatar = styled.div`
   width: 48px;
   height: 48px;
   border-radius: 24px;
   margin-right: 10px;

   font-size: 18px;
   font-weight: bold;
   background-color: ${({ theme }) => theme.colors.orange_700};
   color: ${({ theme }) => theme.colors.grey_100};

   display: flex;
   align-items: center;
   justify-content: center;
`;
