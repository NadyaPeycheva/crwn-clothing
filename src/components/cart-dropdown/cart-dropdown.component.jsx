import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../context/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {CartDropDownContainer,EmptyMessage,CartItems} from './cart-dropdown.style.jsx';


const CartDropdown=()=>{
    const {cartItems}=useContext(CartContext);
    const navigate=useNavigate();

    const goToCheckoutHandle=()=>{
        navigate('/checkout')
    }

    return(
<CartDropDownContainer>
    <CartItems>
        {cartItems.length?(cartItems.map(item=>(<CartItem key={item.id} cartItem={item}/>)))
        :(<EmptyMessage>Your cart is empty</EmptyMessage>)
        }
    </CartItems>
    <Button onClick={goToCheckoutHandle}>GO TO CHECKOUT</Button>
</CartDropDownContainer>
    )
}
export default CartDropdown;