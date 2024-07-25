import React, { useContext } from 'react'
import classes from './cart.module.css'
import LayOut from '../../Components/LayOut/LayOut';

  import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/product/ProductCard';
import CurrencyFormate from '../../Components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../Utils/action.type';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext)
  const total = basket.reduce((amount, item) => {
   return  item.price * item.amount+amount
  }, 0)

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length == 0?(<p>Opps | No item in your cart</p>):(basket?.map((item,i)=>{
            return (
              <section className={classes.cart_product}>
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                 />
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <MdOutlineKeyboardArrowUp size={30}/>
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <MdOutlineKeyboardArrowDown size={30}/>
                  </button>
                </div>
              </section>
            );
            
          })
          )
          }
        </div>
        <div>
          {basket?.length !== 0 && (
            <div className={classes.subtotal}>
              <div>
                <p>Sub total ({basket?.length} items)</p>
                <CurrencyFormate amount={ total} />
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to='./payments'>Continue to checkout</Link>
            </div>
   )}


        </div>


   </section>
    </LayOut>
  );
}

export default Cart