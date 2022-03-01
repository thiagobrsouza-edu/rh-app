import { AxiosResponse } from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDepartment } from "../../api/departments/DepartmentService";
import { IDepartment } from "../../api/departments/IDepartment";

export const TableDepartments: React.FC = () => {

  const service = useDepartment();
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  useEffect(() => {
    service.list().then((response: AxiosResponse) => {
      setDepartments(response.data);
    });
  }, []);

  const updateSelect = (department: IDepartment) => {
    const url = `/departments/add?id=${department.id}`;
    Router.push(url);
  }

  return (
    <div className="mt-4 overflow-auto" style={{ height: "20em" }}>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            departments.map((department: IDepartment) => (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.description}</td>
                <td>
                  <button className="ms-1 btn btn-primary" onClick={e => updateSelect(department)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="ms-1 btn btn-danger">
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}