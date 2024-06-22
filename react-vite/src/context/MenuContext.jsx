import { useState, useContext, createContext } from "react";

const MenuContext = createContext();

export const useMenuContext = () => useContext(MenuContext);

export default function MenuProvider(props) {
  const [showRecipes, setShowRecipes] = useState(false);
  const [showMealplans, setShowMealplans] = useState(false);

  return (
    <MenuContext.Provider
      value={{ showRecipes, setShowRecipes, showMealplans, setShowMealplans }}
    >
      {props.children}
    </MenuContext.Provider>
  );
}
