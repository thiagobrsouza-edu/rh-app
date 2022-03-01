import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({title, children}) => {
  return (
    <>
      <Navbar />
      <aside className="mt-4 container">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-center">{title}</h4>
            {children}
          </div>
        </div>
      </aside>
    </>
  )
}