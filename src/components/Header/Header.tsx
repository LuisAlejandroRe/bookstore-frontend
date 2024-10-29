import "./Header.css";
import CartIcon from "../../../public/icons/cart.svg";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function Header() {
  const { currentUser } = useAuth();
  const { state } = useCart();

  const handleAuthentication = () => {
    if (currentUser) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <h2 className="font-bold text-4xl uppercase ml-7">Bookstore</h2>
      </Link>

      <div className="header__nav">
        {currentUser ? (
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">{currentUser.email}</span>
            <span className="header__optionLineTwo">Cerrar sesión</span>
          </div>
        ) : (
          <Link to="/login">
            <div onClick={handleAuthentication} className="header__option">
              <span className="header__optionLineOne">Hola Invitado</span>
              <span className="header__optionLineTwo">Iniciar sesión</span>
            </div>
          </Link>
        )}

        {currentUser && (
          <Link to="/orders">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>
        )}

        <Link to="/checkout">
          <div className="header__option">
            <span className="header__optionLineOne">Basket</span>
            <div className="flex items-center gap-5">
              <img src={CartIcon} alt="" className="w-5" />
              <span>{state.items.length}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
