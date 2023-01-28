import { ReactNode } from 'react';

interface PropsType {
  children: ReactNode;
  id: string;
  label: string;
  required: boolean;
}

const FormItem = ({ children, id, label, required }: PropsType) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-base font-semibold text-black">
        {required && <span className="text-red">* </span>}
        <span>{label}</span>
      </label>
      <div className="px-2">{children}</div>
    </div>
  );
};

export default FormItem;
