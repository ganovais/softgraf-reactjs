import styled from "styled-components";

export const Container = styled.div`
   max-width: 1440px;
   margin: 0 auto;
   padding: 50px;
`;

export const Content = styled.div`
   display: flex;
`;

export const BodyPosts = styled.div`
   flex: 1;

   h1 {
      color: ${({ theme }) => theme.colors.texts.title};
      margin-top: 100px;
      margin-bottom: 15px;
   }
`;
