import { NextPage } from "next";
import Link from "next/link";
import { TableDepartments } from "../../components/departments/TableDepartments";
import { Layout } from "../../components/layout/Layout";

const Departments: NextPage = () => {
  return (
    <Layout title="Controle de Departamentos">
      <Link href={'/departments/add'}>
        <button className="mt-3 btn btn-primary">Novo Departamento</button>
      </Link>
      <TableDepartments />
    </Layout>
  )
}

export default Departments;