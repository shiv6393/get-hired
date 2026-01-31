import axios from "axios";

const API_URL = "http://localhost:8080/api/recruiter";

export const recruiterApi = {
  getMyJobs: async () => {
    const res = await axios.get(`${API_URL}/jobs`);
    return res.data;
  },
};
