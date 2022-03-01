import { InputHTMLAttributes } from "react";

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
  type?: string;
}

export const InputForm: React.FC<InputFormProps> = ({ label, id, xs, sm, md, lg, xl, xxl, type, ...props }) => {
  return (
    <div className={`col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg} 
    col-xl-${xl} col-xxl-${xxl}`}>
      <div className="form-floating mb-3">
        <input className="form-control" type={type}  id={id} {...props} />
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  )
}