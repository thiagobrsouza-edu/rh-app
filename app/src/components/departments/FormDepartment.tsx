import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { useDepartment } from "../../api/departments/DepartmentService"
import { IDepartment } from "../../api/departments/IDepartment"
import { InputForm } from "../common/InputForm"
import { TextAreaForm } from "../common/TextAreaForm"

export const FormDepartment: React.FC = () => {

  const service = useDepartment();
  const [department, setDepartment] = useState<IDepartment>({
    description: '', notes: ''
  });
  const router = useRouter();
  const {id: queryId} = router.query;

  useEffect(() => {
    if (queryId) {
      service.getOne(queryId).then((data) => {
        setDepartment({...data});
      })
    }
  }, [queryId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {id, value} = event.target;
    setDepartment({...department, [id]: value});
  }

  const submit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (department.id) {
      service.update(department);
    } else {
      service.save(department);
      setDepartment({description: '', notes: ''});
    }
  }

  return (
    <form className="mt-4" onSubmit={submit}>
      <div className="row justify-content-center">
        <InputForm label="Descrição" placeholder="Descrição" xxl="8" xl="8" md="8" sm="12" xs="12" 
        id="description" value={department.description} onChange={handleInputChange} />
      </div>
      <div className="row justify-content-center">
        <TextAreaForm label="Observações" xxl="8" xl="8" md="8" sm="12" xs="12"
        id="notes" value={department.notes} onChange={handleInputChange} />
      </div>
      <div className="mt-4 row justify-content-center">
        <button type="submit" className="ms-1 mb-2 col-sm-4 col-sm-4 btn col-xs-12 btn-primary">
          {department.id ? "Atualizar" : "Salvar"}
        </button>
        <Link href={'/departments'}>
          <button className="ms-1 mb-2 col-sm-4 col-sm-4 col-xs-12 btn btn-info">Ir para departamentos</button>
        </Link>
      </div>
      <ToastContainer />
    </form>
  )
}