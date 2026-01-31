import axios from "axios";

const API_URL = "http://localhost:8080/api/applications";

export const applicationsApi = {
  apply: async (payload: FormData): Promise<any> => {
    const res = await axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },
};