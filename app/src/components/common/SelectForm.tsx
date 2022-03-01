import { ReactNode, SelectHTMLAttributes } from "react";

interface SelectFormProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id?: string;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
  children?: ReactNode;
}

export const SelectForm: React.FC<SelectFormProps> = ({ label, id, xxl, xl, md, sm, xs, children, ...props }) => {
  return (
    <div className={`col-xl-${xl} col-md-${md} col-sm-${sm}`}>
      <div className="form-floating mb-3">
        <select className="form-select" id={id} aria-label="Floating label select example" {...props}>
          { children }
        </select>
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  )
}