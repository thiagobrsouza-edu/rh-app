import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { http } from "../http";
import { IRole } from "./IRole";

export const useRole = () => {

  let errorValidation = [];
  let statusError = null;

  const save = async (role: IRole) => {
    await http.post<IRole>('/roles', role).then((response: AxiosResponse) => {
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
    const response = await http.get('/roles');
    return response;
  }

  const getOne = async (id: any) => {
    const response = await http.get(`/roles/${id}`);
    return response.data;
  }

  const update = async (role: IRole) => {
    await http.patch(`/roles/${role.id}`, role).then((response: AxiosResponse) => {
      toast.success('Atualizado com sucesso!');
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

  const deleteOne = async (id: any) => {
    await http.delete(`/roles/${id}`).then((response: AxiosResponse) => {
      toast.success('Removido com sucesso!');
    }).catch((error: any) => {
      toast.error(error.response.data);
    });
  }

  return {
    save,
    list,
    getOne,
    update,
    deleteOne
  }
  
}