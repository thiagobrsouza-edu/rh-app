import { NextPage } from "next";
import { TableEmployees } from "../../components/employees/TableEmployees";
import { Layout } from "../../components/layout/Layout";

const Employees: NextPage = () => {
  return (
    <Layout title="Controle de Funcionários">
      <TableEmployees />
    </Layout>
  )
}

export default Employees;