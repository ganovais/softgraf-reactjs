import styled from "styled-components";

export const Container = styled.div`
   max-width: 1440px;
   margin: 0 auto;
   padding: 50px;
`;

export const Content = styled.div`
   display: flex;
`;

export const BodyContent = styled.div`
   flex: 1;

   & > .name {
      color: ${({ theme }) => theme.colors.texts.title};
   }

   & > .username {
      margin-bottom: 50px;
      color: ${({ theme }) => theme.colors.orange_700};
   }

   .MuiTab-root[aria-selected="false"] {
      color: ${({ theme }) => theme.colors.texts.title} !important;
   }

   .MuiTab-root[aria-selected="true"] {
      font-weight: bold;
   }
`;
