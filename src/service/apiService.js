import axios from "axios";
import authHeader from "./auth-header";

const apiClient = {
  async readLecture() {
    const response = await axios.get("/lecture", { headers: authHeader() });
    return response.data;
  },
  async createLecture(reqData) {
    const response = await axios.post("/lecture", reqData, {
      headers: authHeader(),
    });
    return response.data;
  },
  async readStudent() {
    const response = await axios.get("/student", { headers: authHeader() });
    return response.data;
  },
  async createStudent(reqData) {
    const response = await axios.post("/student", reqData, {
      headers: authHeader(),
    });
    return response.data;
  },
  async readRooms() {
    const response = await axios.get("/room", { headers: authHeader() });
    return response.data;
  },
  async createRoom(reqData) {
    const response = await axios.post("/room", reqData, {
      headers: authHeader(),
    });
    return response.data;
  },
  async deleteRoom(roomId) {
    const response = await axios.delete("/room/" + roomId, {
      headers: authHeader(),
    });
    return response.data;
  },
  async deleteLecture(lectureId) {
    const response = await axios.delete("/lecture/" + lectureId, {
      headers: authHeader(),
    });
    return response.data;
  },
  async deleteStudent(studentId) {
    const response = await axios.delete("/student/" + studentId, {
      headers: authHeader(),
    });
    return response.data;
  },
  async deleteFee(feeId) {
    const response = await axios.delete("/room/fee/" + feeId, {
      headers: authHeader(),
    });
    return response.data;
  },
  async feeRoom(reqData) {
    const response = await axios.post("/room/fee", reqData, {
      headers: authHeader(),
    });
    return response.data;
  },
  async readRoom(roomId) {
    const response = await axios.get("/room/" + roomId, {
      headers: authHeader(),
    });
    return response.data;
  },
  async updateRoom(roomId, reqData) {
    const response = await axios.patch("/room/" + roomId, reqData, {
      headers: authHeader(),
    });
    return response.data;
  },
  async updateLecture(lectureId, reqData) {
    const response = await axios.patch("/lecture/" + lectureId, reqData, {
      headers: authHeader(),
    });
    return response.data;
  },
  async updateStudent(studentId, reqData) {
    const response = await axios.patch("/student/" + studentId, reqData, {
      headers: authHeader(),
    });
    return response.data;
  },
  async readFee() {
    const response = await axios.get("/fee", { headers: authHeader() });
    return response.data;
  },
};

export default apiClient;
