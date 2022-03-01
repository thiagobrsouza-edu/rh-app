import { http } from "../http";

export const useDepartment = () => {

  const list = async () => {
    const response = await http.get('/departments');
    return response;
  }

  return {
    list
  }
}