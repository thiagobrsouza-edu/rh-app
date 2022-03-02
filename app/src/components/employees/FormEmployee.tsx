import { AxiosResponse } from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { useDepartment } from "../../api/departments/DepartmentService"
import { IDepartment } from "../../api/departments/IDepartment"
import { useEmployee } from "../../api/employees/EmployeeService"
import { IEmployee } from "../../api/employees/IEmployee"
import { IRole } from "../../api/roles/IRole"
import { useRole } from "../../api/roles/RoleService"
import { converterToDecimal, formatReal } from "../../utils/money"
import { InputForm } from "../common/InputForm"
import { SelectForm } from "../common/SelectForm"

export const FormEmployee: React.FC = () => {

  const service = useEmployee();
  const serviceListRoles = useRole();
  const serviceListDepartments = useDepartment();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [employee, setEmployee] = useState<IEmployee>({
    name: '', cpf: '', birthDate: '', admission: '', resignation: '', salary: '', role: {}, department: {}
  });
  const router = useRouter();
  const { id: queryId } = router.query;

  useEffect(() => {
    if (queryId) {
      service.getOne(queryId).then((data) => {
        setEmployee({ ...data });
      })
    }
  }, [queryId]);

  useEffect(() => {
    serviceListRoles.list().then((response: AxiosResponse) => {
      setRoles(response.data);
    });
  }, []);

  useEffect(() => {
    serviceListDepartments.list().then((response: AxiosResponse) => {
      setDepartments(response.data);
    });
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setEmployee({ ...employee, [id]: value });
  }

  const submit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (employee.id) {
      service.update({...employee, salary: converterToDecimal(employee.salary)});
    } else {
      service.save({...employee, salary: converterToDecimal(employee.salary)});
      setEmployee({ name: '', cpf: '', birthDate: '', admission: '', resignation: '', salary: '', role: {}, department: {} });
    }
  }

  return (
    <form className="mt-4" onSubmit={submit}>
      
      <div className="row justify-content-center">
        <InputForm label="Nome" type="text" placeholder="Nome" xxl="8" xl="8" md="8" sm="12" xs="12"
        id="name" value={employee.name} onChange={handleInputChange}/>
        <InputForm label="Data de Nascimento" type="date" xxl="4" xl="4" md="4" sm="12" xs="12"
        id="birthDate" value={employee.birthDate} onChange={handleInputChange} />
      </div>
      
      <div className="row justify-content-center">
        <InputForm label="CPF" placeholder="CPF" type="text" xxl="4" xl="4" md="4" sm="12" xs="12" 
        id="cpf" value={employee.cpf} onChange={handleInputChange} />
        <InputForm label="Admissão" type="date" xxl="4" xl="4" md="4" sm="12" xs="12" 
        id="admission" value={employee.admission} onChange={handleInputChange} />
        <InputForm label="Desligamento" type="date" xxl="4" xl="4" md="4" sm="12" xs="12" 
        id="resignation" value={employee.resignation} onChange={handleInputChange} />
      </div>
      
      <div className="row justify-content-center">
        <SelectForm label="Cargo" xxl="5" xl="5" md="5" sm="12" xs="12" id="role"
        value={employee.role?.id} onChange={handleInputChange}>
          <option value="">Selecione um cargo</option>
          {roles.map((role: IRole) => (
            <option key={role.id} value={role.id}>{role.description}</option>
          ))}
        </SelectForm>
        <SelectForm label="Departamento" xxl="4" xl="4" md="4" sm="12" xs="12" id="department"
        value={employee.department?.id} onChange={handleInputChange}>
          <option value="">Selecione um depto</option>
          {departments.map((department: IDepartment) => (
            <option key={department.id} value={department.id}>{department.description}</option>
          ))}
        </SelectForm>
        <InputForm label="Salário R$" xxl="3" xl="3" md="3" sm="12" xs="12" id="salary" 
        value={formatReal(employee.salary)} onChange={handleInputChange} />
      </div>
      
      <div className="mt-4 row justify-content-center">
        <button type="submit" className="ms-1 mb-2 col-sm-4 col-sm-4 btn col-xs-12 btn-primary">
          {employee.id ? "Atualizar" : "Salvar"}
        </button>
        <Link href={'/employees'}>
          <button className="ms-1 mb-2 col-sm-4 col-sm-4 col-xs-12 btn btn-info">Ir para cargos</button>
        </Link>
      </div>
      
      <ToastContainer />
    </form>
  )
}