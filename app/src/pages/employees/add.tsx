import { NextPage } from "next";
import { FormEmployee } from "../../components/employees/FormEmployee";
import { Layout } from "../../components/layout/Layout";

const Add: NextPage = () => {
  return (
    <Layout title="Adicionar/Atualizar Funcionários">
      <FormEmployee />
    </Layout>
  )
}

export default Add;