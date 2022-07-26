import styles from "../styles/BookContainer.module.css";

export default function BookContainer({ info }) {
  return (
    <div className="text-white  flex justify-center relative z-0  ">
      <div className=" w-[50rem] h-[28rem] bg-[#ffffff36] mt-12 rounded-lg ">
        <ul className={styles.bookContainerScroll}>
          {info.map((book, index) => {
            return (
              <li
                key={index}
                className=" text-white text-lg p-4 border-b-[1px] cursor-pointer border-gray-700 flex  items-center hover:bg-[rgba(51,65,81,0.57)"
              >
                <img src={book.image} alt="book image" />
                <p>{book.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
