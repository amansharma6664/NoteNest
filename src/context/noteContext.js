// Importing createContext from React to create a new context
import { createContext } from "react";

// Creating a context object for notes, which can be shared across components
const noteContext = createContext();

// Exporting the context so it can be used with useContext in child components
export default noteContext;
