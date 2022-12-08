import { createContext, Dispatch, SetStateAction } from "react";

const Context = createContext({} as IAuth);

export default Context;

interface IAuth {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}
