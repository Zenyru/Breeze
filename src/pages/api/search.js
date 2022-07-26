import axios from "axios";

export default async function searchQuery(req, res) {
  if (req.method === "GET") {
    return res.status(405).json({ message: "Method is not accepted" });
  } else if (req.method === "POST") {
    let search = req.body.search;
    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: search.toLowerCase(),
            key: process.env.GOOGLE_API_KEY,
          },
        }
      );

      return res.status(200).json({
        message: data.items.map(book => {
          return {
            id: book.id,
            imageLink:
              book.volumeInfo.imageLinks?.thumbnail ??
              "https://via.placeholder.com/128x193",
            title: book.volumeInfo.title,
          };
        }),
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }
}
