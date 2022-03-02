import { AxiosResponse } from "axios";
import Link from "next/link";
import Router from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useEmployee } from "../../api/employees/EmployeeService";
import { IEmployee } from "../../api/employees/IEmployee";

export const TableEmployees: React.FC = () => {

  const service = useEmployee();
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    service.list().then((response: AxiosResponse) => {
      setEmployees(response.data);
    });
  }, []);

  const updateSelect = (employee: IEmployee) => {
    const url = `/employees/add?id=${employee.id}`;
    Router.push(url);
  }

  const deleteSelect = (employee: IEmployee) => {
    if (!confirm('Você tem certeza que deseja excluir o item selecionado?')) {
      null;
    } else {
      service.deleteOne(employee.id);
      const changeTable = employees.filter(d => d.id !== employee.id);
      setEmployees(changeTable);
    }
  }

  /**
   * filter configuration
   */
  const filterEmployees = (employee: IEmployee) => {
    const lowerFilter = filter.toLowerCase();
    return (
      employee.name?.toString().toLowerCase().includes(lowerFilter) || 
      employee.cpf?.toString().toLowerCase().includes(lowerFilter) || 
      employee.role?.description?.toString().toLowerCase().includes(lowerFilter)
    );
  }

  const onFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }

  const employeesFiltered = employees.filter(filterEmployees);

  const formatSalary = (value: any) => {
    const salary = new Number(value);
    return salary.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  }

  return (
    <>
      <div className="row justify-content-center">
        <Link href={'/employees/add'}>
          <button className="mt-2 col-md-3 col-sm-4 col-xs-12 btn btn-primary">
            Novo Funcionário <i className="bi bi-plus-circle"></i>
          </button>
        </Link>
        <div className="mt-2 col-md-6 col-sm-8 col-xs-12">
          <input type="text" className="form-control" placeholder="Pesquise por nome, CPF ou cargo"
            value={filter} onChange={onFilterChange} />
        </div>
      </div>
      <div className="mt-2 overflow-auto" style={{ height: '20em' }}>
        <table className="mt-2 table table-hover">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Cargo</th>
              <th>Salário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              employeesFiltered.map((employee: IEmployee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.cpf}</td>
                  <td>{employee.role?.description}</td>
                  <td>{formatSalary(employee.salary)}</td>
                  <td>
                    <button className="ms-1 btn btn-primary" onClick={e => updateSelect(employee)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="ms-1 btn btn-danger" onClick={e => deleteSelect(employee)}>
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  )
}