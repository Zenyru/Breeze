import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function deleteBook(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // deleting the book from the database
  if (req.method === "DELETE") {
    try {
      const {bookId} = req.query;

      const deletingBook = await prisma.books.delete({
        where: {
          id: bookId,
        },
      
      });
      return res.status(200).json(deletingBook, { success: true });

    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }else{
    res.status(405).json({
      status: "error",
      message: "Invalid request",
    });
  }
}
