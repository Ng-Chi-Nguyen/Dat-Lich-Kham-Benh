import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
   // console.log("Email: ", userEmail)
   // console.log("\nPass: ", userPassword)
   return axios.post(`http://localhost:8080/api/login?email=${userEmail}&password=${userPassword}`)
}

const getAllUsers = async (inputId) => {
   // console.log("Calling API with id: ", inputId); // Log xem hàm được gọi
   return axios.get(`http://localhost:8080/api/get-all-user?id=${inputId}`);
}
export { handleLoginApi, getAllUsers }