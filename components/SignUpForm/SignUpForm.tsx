import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { signUp } from "../../apiCalls/user";
import Button from "../Button/Button";
import AuthRedirectLink from "../AuthRedirectLink/AuthRedirectLink";
import { validateSignUp } from "../../dataValidations/signupValidation";

import Message from "../Message/Message";

const SignUpForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);

  const signUpUser = async () => {
    const validationMessage = validateSignUp({ name, email, password });
    if (validationMessage) {
      setMessage(validationMessage);
      setError(true);
      return;
    }
    try {
      setButtonLoading(true);

      const response = await signUp({
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setError(false);

        setMessage("Sign Up successful! Redirecting...");

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (err) {
      console.log("Sign Up Error", err);
      setError(true);
      setMessage("Error creating account");
      setButtonLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <h1>Create an Account</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1).toLowerCase()
            )
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          onClick={signUpUser}
          title="Sign Up"
          isLoading={isButtonLoading}
        />

        <AuthRedirectLink
          text="Already have an account?"
          linkText="Log in"
          href="/login"
        />

        {message && <Message text={message} isError={isError} />}
      </div>
    </div>
  );
};

export default SignUpForm;
