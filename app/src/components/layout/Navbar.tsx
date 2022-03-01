import Link from "next/link"

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href={'/'}>
          <a className="navbar-brand">RH - APP <i className="ms-3 bi bi-people-fill"></i></a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar"
        aria-controls="navbar" aria-expanded="false" aria-label="Toggle Navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto mb-3 mb-lg-0 p-3">
            <li className="nav-item ms-4">
              <Link href={'/departments'}>
                <a className="nav-link">Departamentos</a>
              </Link>
            </li>
            <li className="nav-item ms-4">
              <Link href={'/roles'}>
                <a className="nav-link">Cargos e funções</a>
              </Link>
            </li>
            <li className="nav-item ms-4">
              <Link href={'/employees'}>
                <a className="nav-link">Funcionários</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}