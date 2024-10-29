import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <h2>Esto es una app de prueba</h2>
      <h2>Hecho por Luis Alejandro Realpe</h2>
      <a
        href="https://github.com/LuisAlejandroRe/bookstore-frontend"
        target="blank"
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/clone-e814f.appspot.com/o/github-logo_icon-icons.com_73546.png?alt=media&token=ce9e67e4-87ba-494d-ada2-821fe3e5f551"
          alt="github logo"
        />
        Repositorio
      </a>
    </div>
  );
}

export default Footer;
