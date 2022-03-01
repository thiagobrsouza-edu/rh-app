import { NextPage } from "next";
import { Layout } from "../../components/layout/Layout";
import { FormRole } from "../../components/roles/FormRole";

const Add: NextPage = () => {
  return (
    <Layout title="Adicionar/Atualizar Cargos e funções">
      <FormRole />
    </Layout>
  )
}

export default Add;