import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";


import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { singOutUser } from "../../utils/firebase/firebase.utils";

import {NavigationContainer,LogoContainer,NavLinks,NavLink} from "./navigation.style.jsx";

const Navigation = () => {
  const { currentUser} = useContext(UserContext);
  const {isCartOpen}=useContext(CartContext);

 
  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            Shop
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={singOutUser}>SING OUT</NavLink>
          ) : (
            <NavLink to="/auth">
              Sing In
            </NavLink>
          )}
        <CartIcon/>
        </NavLinks>
        {isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet />
    </>
  );
};
export default Navigation;
