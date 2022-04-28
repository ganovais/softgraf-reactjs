import styled from "styled-components";

export const Container = styled.div`
   background: #33373e;
   padding: 35px;
   border-radius: 30px;
   margin-bottom: 30px;
`;

export const PostHeader = styled.div`
   display: flex;
   align-items: center;

   img {
      margin-right: 20px;
      width: 48px;
      height: 48px;
      border-radius: 24px;
   }

   .username {
      color: #e58947;
      margin-bottom: 7px;
   }
   .postDate {
      color: #fff;
   }
`;
export const PostContent = styled.div`
   margin-top: 40px;
   margin-bottom: 40px;
   color: #fff;
`;
export const PostFooter = styled.div`
   display: flex;
   align-items: center;
   color: #fff;

   svg {
      margin-right: 10px;
      color: #e94a4a;
   }
`;
