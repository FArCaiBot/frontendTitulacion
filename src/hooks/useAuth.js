import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
/**
 * The `useAuth` function is a React hook that returns the `AuthContext` object
 */

export const useAuth = () => useContext(AuthContext);