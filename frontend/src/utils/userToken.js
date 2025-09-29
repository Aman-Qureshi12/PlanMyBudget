import axios from "axios";

export const checkUserToken = async () => {
  try {
    const res = await axios.get("http://localhost:8000/auth/userCheck", {
      withCredentials: true,
    });
    return { user: res.data.user, authenticated: res.data.authenticated }; // always return object
  } catch (err) {
    return { user: null }; // instead of false
  }
};
