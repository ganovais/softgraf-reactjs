import React, { ReactNode } from "react";
import { Container, Input, Label, Content } from "./styles";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label: string;
   leftIcon?: ReactNode;
}

export function CustomInput({ label, leftIcon, ...rest }: CustomInputProps) {
   return (
      <Container>
         <Label>{label}</Label>
         <Content>
            {leftIcon}
            <Input {...rest} placeholder={label} />
         </Content>
      </Container>
   );
}
