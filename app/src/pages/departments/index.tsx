import { NextPage } from "next";
import { TableDepartments } from "../../components/departments/TableDepartments";
import { Layout } from "../../components/layout/Layout";

const Departments: NextPage = () => {
  return (
    <Layout title="Controle de Departamentos">
      <TableDepartments />
    </Layout>
  )
}

export default Departments;