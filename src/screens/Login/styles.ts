import styled from "styled-components";

export const Container = styled.div`
   display: flex;
`;

export const DivLeft = styled.div`
   height: 100vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   background: ${({ theme }) => theme.colors.grey};
   flex: 1;

   & > .logo {
      width: 300px;
      margin-top: 140px;
   }

   & > .undraw {
      width: 70%;
   }
`;
