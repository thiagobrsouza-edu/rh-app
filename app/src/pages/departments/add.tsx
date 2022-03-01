import { NextPage } from "next";
import { FormDepartment } from "../../components/departments/FormDepartment";
import { Layout } from "../../components/layout/Layout";

const Add: NextPage = () => {
  return (
    <Layout title="Adicionar/Atualizar Departamento">
      <FormDepartment />
    </Layout>
  )
}

export default Add;