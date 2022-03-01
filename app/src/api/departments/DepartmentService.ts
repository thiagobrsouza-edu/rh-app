import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { http } from "../http";
import { IDepartment } from "./IDepartment";

export const useDepartment = () => {

  let errorValidation = [];
  let statusError = null;

  const save = async (department: IDepartment) => {
    await http.post<IDepartment>('/departments', department).then((response: AxiosResponse) => {
      toast.success('Salvo com sucesso!');
    }).catch((error: any) => {
      statusError = error.response.status;
      errorValidation = error.response.data.errors;
      switch (statusError) {
        case 409:
          toast.error(error.response.data);
          break;
        case 400:
          errorValidation.map((message: any) => (
            toast.error(message.msg)
          ));
          break;
      }
    });
  }

  const list = async () => {
    const response = await http.get('/departments');
    return response;
  }

  return {
    save,
    list
  }
}