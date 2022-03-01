import { TextareaHTMLAttributes } from "react";

interface TextAreaFormProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
}

export const TextAreaForm: React.FC<TextAreaFormProps> = ({ label, id, xs, sm, md, lg, xl, xxl, ...props }) => {
  return (
    <>
      <div className={`col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg} col-xl-${xl} col-xxl-${xxl}`}>
      <label htmlFor={id} className="form-label">{label}</label>
        <textarea id={id} cols={30} rows={5} className="form-control" {...props}></textarea>
      </div>
    </>
  )
}