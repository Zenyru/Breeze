import axios from "axios";

export default async function searchQuery(req, res) {
  // handling the get request
  if (req.method === "GET") {
    return res.status(405).json({ message: "Method is not accepted" });
  } else if (req.method === "POST") {
    // handling the post request
    let search = req.body.search;
    try {
      // getting the data from the API
      const { data } = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: search.toLowerCase(),
            key: process.env.GOOGLE_API_KEY,
          },
        }
      );
        // returning the data to the client
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
  }else{
    res.status(400).json({
      status: "error",
      message: "Invalid request",
    });
  }
}
