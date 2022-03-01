import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { IRole } from "../../api/roles/IRole"
import { useRole } from "../../api/roles/RoleService"
import { InputForm } from "../common/InputForm"
import { TextAreaForm } from "../common/TextAreaForm"

export const FormRole: React.FC = () => {

  const service = useRole();
  const [role, setRole] = useState<IRole>({
    description: '', notes: ''
  });
  const router = useRouter();
  const {id: queryId} = router.query;

  useEffect(() => {
    if (queryId) {
      service.getOne(queryId).then((data) => {
        setRole({...data});
      })
    }
  }, [queryId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {id, value} = event.target;
    setRole({...role, [id]: value});
  }

  const submit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (role.id) {
      service.update(role);
    } else {
      service.save(role);
      setRole({description: '', notes: ''});
    }
  }

  return (
    <form className="mt-4" onSubmit={submit}>
      <div className="row justify-content-center">
        <InputForm label="Descrição" placeholder="Descrição" xxl="8" xl="8" md="8" sm="12" xs="12" 
        id="description" value={role.description} onChange={handleInputChange} />
      </div>
      <div className="row justify-content-center">
        <TextAreaForm label="Observações" xxl="8" xl="8" md="8" sm="12" xs="12"
        id="notes" value={role.notes} onChange={handleInputChange} />
      </div>
      <div className="mt-4 row justify-content-center">
        <button type="submit" className="ms-1 mb-2 col-sm-4 col-sm-4 btn col-xs-12 btn-primary">
          {role.id ? "Atualizar" : "Salvar"}
        </button>
        <Link href={'/roles'}>
          <button className="ms-1 mb-2 col-sm-4 col-sm-4 col-xs-12 btn btn-info">Ir para cargos</button>
        </Link>
      </div>
      <ToastContainer />
    </form>
  )
}