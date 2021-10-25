import { useSelector } from "react-redux";
import APIBitrix from "./APIBitrix";
import { userIdSelector } from "../redux/slices/user";

class APIAuth {

  reg = (phone) => APIBitrix.post("user/registration/", {
    phone
  }).then(res => res.data);

  confirm = (userData, verification) => {
    const { user_id, phone } = userData;
    const { code } = verification;
    const fuser_id = localStorage.getItem('fuser_id');
    return APIBitrix.post("user/verification/", {
      user_id,
      phone,
      code,
      fuser_id
    }).then(res => res.data);
  }


  auth = (typeOfOperation) => {
    APIBitrix.post("/user/registration/");
  };
}

export default new APIAuth();