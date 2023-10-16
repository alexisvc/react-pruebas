import { useState } from "react";
import userService from "../services/users";
import { toast } from "react-toastify";

export function useRegistration() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (user) => {
    try {
      await userService.registerUser(user);
      setIsRegistered(true);
      toast.success("User registered successfully.", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      setError(error.response ? error.response.data.error : "Registration failed.");
      toast.error(error.response ? error.response.data.error : "Registration failed.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return { isRegistered, error, registerUser };
}
