import { AxiosResponse } from "axios";
import Link from "next/link";
import Router from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDepartment } from "../../api/departments/DepartmentService";
import { IDepartment } from "../../api/departments/IDepartment";

export const TableDepartments: React.FC = () => {

  const service = useDepartment();
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    service.list().then((response: AxiosResponse) => {
      setDepartments(response.data);
    });
  }, []);

  const updateSelect = (department: IDepartment) => {
    const url = `/departments/add?id=${department.id}`;
    Router.push(url);
  }

  const deleteSelect = (department: IDepartment) => {
    if (!confirm('Você tem certeza que deseja excluir o item selecionado?')) {
      null;
    } else {
      service.deleteOne(department.id);
      const changeTable = departments.filter(d => d.id !== department.id);
      setDepartments(changeTable);
    }
  }

  /**
   * filter configuration
   */
  const filterDepartments = (department: IDepartment) => {
    const lowerFilter = filter.toLowerCase();
    return (
      department.description?.toString().toLowerCase().includes(lowerFilter)
    );
  }

  const onFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }

  const departmentsFiltered = departments.filter(filterDepartments);

  return (
    <>
      <div className="row justify-content-center">
        <Link href={'/departments/add'}>
          <button className="mt-2 col-md-3 col-sm-4 col-xs-12 btn btn-primary">
            Novo Departamento <i className="bi bi-plus-circle"></i>
          </button>
        </Link>
        <div className="mt-2 col-md-6 col-sm-8 col-xs-12">
          <input type="text" className="form-control" placeholder="Pesquise por descrição"
            value={filter} onChange={onFilterChange} />
        </div>
      </div>
      <div className="mt-2 overflow-auto" style={{ height: '20em' }}>
        <table className="mt-2 table table-hover">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              departmentsFiltered.map((department: IDepartment) => (
                <tr key={department.id}>
                  <td>{department.id}</td>
                  <td>{department.description}</td>
                  <td>
                    <button className="ms-1 btn btn-primary" onClick={e => updateSelect(department)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="ms-1 btn btn-danger" onClick={e => deleteSelect(department)}>
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