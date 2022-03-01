import { AxiosResponse } from "axios";
import Link from "next/link";
import Router from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { IRole } from "../../api/roles/IRole";
import { useRole } from "../../api/roles/RoleService";

export const TableRoles: React.FC = () => {

  const service = useRole();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    service.list().then((response: AxiosResponse) => {
      setRoles(response.data);
    });
  }, []);

  const updateSelect = (role: IRole) => {
    const url = `/roles/add?id=${role.id}`;
    Router.push(url);
  }

  const deleteSelect = (role: IRole) => {
    if (!confirm('Você tem certeza que deseja excluir o item selecionado?')) {
      null;
    } else {
      service.deleteOne(role.id);
      const changeTable = roles.filter(d => d.id !== role.id);
      setRoles(changeTable);
    }
  }

  /**
   * filter configuration
   */
  const filterRoles = (role: IRole) => {
    const lowerFilter = filter.toLowerCase();
    return (
      role.description?.toString().toLowerCase().includes(lowerFilter)
    );
  }

  const onFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }

  const rolesFiltered = roles.filter(filterRoles);

  return (
    <>
      <div className="row justify-content-center">
        <Link href={'/roles/add'}>
          <button className="mt-2 col-md-3 col-sm-4 col-xs-12 btn btn-primary">
            Novo Cargo <i className="bi bi-plus-circle"></i>
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
              rolesFiltered.map((role: IRole) => (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.description}</td>
                  <td>
                    <button className="ms-1 btn btn-primary" onClick={e => updateSelect(role)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="ms-1 btn btn-danger" onClick={e => deleteSelect(role)}>
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