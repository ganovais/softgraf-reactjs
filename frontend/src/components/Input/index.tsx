import {
   forwardRef,
   ForwardRefRenderFunction,
   ReactNode,
   useState,
   InputHTMLAttributes,
   useCallback,
} from "react";
import { FieldError } from "react-hook-form";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { Container, Input, Label, Content, Error } from "./styles";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
   label: string;
   leftIcon?: ReactNode;
   isPassword?: boolean;
   error?: FieldError;
   showPassword?: () => void;
   isShowingPassword?: boolean;
}

const InputBase: ForwardRefRenderFunction<
   HTMLInputElement,
   CustomInputProps
> = (
   {
      label,
      leftIcon,
      isPassword = false,
      error,
      showPassword,
      isShowingPassword = false,
      ...rest
   },
   ref
) => {
   const [isFocused, setIsFocused] = useState(false);
   const [isFilled, setIsFilled] = useState(false);

   const handleInputFocus = useCallback(() => {
      setIsFocused(true);
      console.log("hello");
   }, []);

   const handleInputBlur = (event: any) => {
      setIsFocused(false);

      setIsFilled(!!event.target.value);
   };

   return (
      <Container>
         <Label>{label}</Label>
         <Content isFilled={isFilled} isFocused={isFocused} error={!!error}>
            {leftIcon}
            <Input
               {...rest}
               placeholder={label}
               ref={ref}
               onFocus={handleInputFocus}
               onBlur={(event) => handleInputBlur(event)}
            />

            {isPassword &&
               (!isShowingPassword ? (
                  <FiEye onClick={showPassword} className="eye" />
               ) : (
                  <FiEyeOff onClick={showPassword} className="eye" />
               ))}
         </Content>
         {error && (
            <Error>
               <FiAlertCircle />
               <p>{error.message}</p>
            </Error>
         )}
      </Container>
   );
};

export const CustomInput = forwardRef(InputBase);
