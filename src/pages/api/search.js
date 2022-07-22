import axios from "axios";

export default async function searchQuery(req, res) {
  if (req.method === "GET") {
    res.status(405).json({ message: "Method is not accepted" });
  } else if (req.method === "POST") {
    let search = req.body.search;
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search.toLowerCase()}&key=${process.env.GOOGLE_API_KEY}&maxResults=20`
    );

    res.status(200).json({
      message: data.items.map(book => {
        return {
          imageLink: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        };
      }),
    });
  }
}
