import prisma from "../../lib/prisma";
import axios from "axios";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function addedBooks(req, res) {
  // getting the session from the server
  const session = await unstable_getServerSession(req, res, authOptions);
  // prevent unauthorized users from accessing this page
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    return res.status(405).json({
      status: "error",
      message: "Invalid request",
    });
  } else if (req.method === "POST") {
    let bookId = req.body.bookId;

    try {
      // checking if the book is already in the database
      const dataExists = await prisma.books.findFirst({
        where: {
          bookId: bookId,
          userId: session.user.id,
        },
      });

      if (dataExists) {
        return res.status(400).json({ message: "Book already exists" });
      } else if (!dataExists) {
        const { data } = await axios.get(
          "https://www.googleapis.com/books/v1/volumes",
          {
            params: {
              q: bookId,
              key: process.env.GOOGLE_API_KEY,
            },
          }
        );
        const filtered = data.items.filter(book => book.id === bookId);
        const id = filtered[0].id;
        const title = filtered[0].volumeInfo.title;
        const image =
          filtered[0].volumeInfo.imageLinks?.thumbnail ??
          "https://via.placeholder.com/128x193";

        // creating a new book in the database
        const addingBook = await prisma.books.create({
          data: {
            bookId: id,
            title: title,
            image: image,

            user: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });

        return res.status(200).json(addingBook, { success: true });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({
      status: "error",
      message: "Invalid request",
    });
  }
}
