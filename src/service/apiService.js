import axios from "axios"

const apiClient = {
    async readLecture(){
        const response = await axios.get("/lecture");
        return response.data;
    },
    async createLecture(reqData){
        const response = await axios.post("/lecture", reqData);
        return response.data;
    },
    async readStudent(){
        const response = await axios.get("/student");
        return response.data;
    },
    async createStudent(reqData){
        const response = await axios.post("/student", reqData);
        return response.data;
    },
    async readRooms(){
        const response = await axios.get("/room");
        return response.data;
    },
    async createRoom(reqData){
        const response = await axios.post("/room" , reqData)
        return response.data;
    },
    async deleteRoom(roomId){
        const response = await axios.delete("/room/" + roomId)
        return response.data;
    },
    async deleteLecture(lectureId){
        const response = await axios.delete("/lecture/" + lectureId)
        return response.data;
    },
    async deleteStudent(studentId){
        const response = await axios.delete("/student/" + studentId)
        return response.data;
    },
    async deleteFee(feeId){
        const response = await axios.delete("/room/fee/" + feeId)
        return response.data;
    },
    async feeRoom(reqData){
        const response = await axios.post("/room/fee", reqData)
        return response.data;
    },
    async readRoom(roomId){
        const response = await axios.get("/room/"+roomId)
        return response.data;
    },
    async updateRoom(roomId, reqData){
        const response = await axios.patch("/room/"+roomId, reqData)
        return response.data;
    },
    async updateLecture(lectureId, reqData){
        const response = await axios.patch("/lecture/"+lectureId, reqData)
        return response.data;
    },
    async updateStudent(studentId, reqData){
        const response = await axios.patch("/student/" +studentId, reqData)
        return response.data;
    },
    async readFee(){
        const response = await axios.get("/fee");
        return response.data;
    }
}

export default apiClient;