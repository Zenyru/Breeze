import axios from "axios";

const handler = async (req, res) => {
  const { data } = await axios.get("http://ip-api.com/json");
  res.json({
    message: "Motherfucker, your here",
    data: data,
  });
};

export default handler;
