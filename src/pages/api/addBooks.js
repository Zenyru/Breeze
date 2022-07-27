import prisma from "../../lib/prisma";
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
    try {
      const books = await prisma.books.findMany({
        where: {
          userId: session.user.id,
        },
      });
      return res.status(200).json(books,{success:true});
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  } else if (req.method === "POST") {
    let bookId = req.body.bookId;
    let title = req.body.title;
    let image = req.body.image;

    try {
      // checking if the book is already in the database
      const dataExists = await prisma.books.findUnique({
        where: {
          bookId: bookId,
        },
      });

      if (dataExists) {
        return res.status(400).json({ message: "Book already exists" });
      } else if (!dataExists) {
        // creating a new book in the database
        const addingBook = await prisma.books.create({
          data: {
            bookId: bookId,
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
  }else{
    res.status(400).json({
      status: "error",
      message: "Invalid request",
    });
  }
}
