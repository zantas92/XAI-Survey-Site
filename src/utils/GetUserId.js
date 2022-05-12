import { useSelector } from "react-redux";

const GetUserId = () => { 
  const userId = useSelector((state) => state.auth.value);
  return userId;
}

export default GetUserId;