import { ReactNode } from "react";
import { Container } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   title: string;
   icon?: ReactNode;
}

export function Button({ title, icon, ...rest }: ButtonProps) {
   return (
      <Container {...rest}>
         {title}
         {icon}
      </Container>
   );
}
