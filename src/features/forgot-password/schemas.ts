import * as Yup from "yup";

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("Email is required")
});
