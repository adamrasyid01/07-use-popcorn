import { useEffect, useState } from "react";

const KEY = "7227245d";

export default function useMovies(query, handleCloseMovie) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setIsError("");
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });

          if (!res.ok) throw new Error("Something went wrong with fetching movies");
          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie Not Found");

          setMovies(data.Search);
          setIsError("");
          console.log(data.Search);
          // console.log(movies);
        } catch (err) {
          // console.error(err.message);
          if (err.name !== "Abort Error") {
            setIsError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setIsError("");
        return;
      }
      handleCloseMovie();
      fetchMovies();
      // Batalkan request sebelumnya saat render terbaru
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, isError };
}
