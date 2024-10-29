import "./Home.css";
import Product from "../Product/Product";
import { Book } from "../../types";
import { useEffect, useState } from "react";
import client from "../../api/client";
import Loader from "../Loader/Loader";

function Home() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await client.get("/book");
        setBooks(res.data.body.books as Book[]);
      } catch (error: any) {
        console.log(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="home">
      {loading && <Loader />}
      <div className="home__container">
        <div className="home__row__title">
          <h2>Libros</h2>
        </div>
        <div className="home__row">
          {books.map((book) => (
            <Product key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
