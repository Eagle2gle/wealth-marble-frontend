import { UseFormRegisterReturn } from 'react-hook-form';

interface PropsType {
  id: string;
  placeholder: string;
  required: boolean;
  register?: UseFormRegisterReturn;
}

const TextArea = ({ id, placeholder, required, register }: PropsType) => {
  return (
    <textarea
      id={id}
      rows={4}
      className="outline-main block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-black/20"
      placeholder={placeholder}
      required={required}
      {...register}
    ></textarea>
  );
};

export default TextArea;
