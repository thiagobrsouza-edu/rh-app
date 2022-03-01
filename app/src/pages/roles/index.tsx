import { NextPage } from "next";
import { Layout } from "../../components/layout/Layout";
import { TableRoles } from "../../components/roles/TableRoles";

const Roles: NextPage = () => {
  return (
    <Layout title="Controle de Cargos">
      <TableRoles />
    </Layout>
  )
}

export default Roles;