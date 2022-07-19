import axios from "axios";

export default async function searchQuery(req, res) {
  if (req.method === "GET") {
    res.status(405).json({ message: "Method is not accepted" });
  } else if (req.method === "POST") {
    let search = req.body.search;
    const {data} = await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.GOOGLE_API_KEY}&maxResults=10`
      )
     res.json({ message: data.items });
  }
}