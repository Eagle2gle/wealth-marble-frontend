import { UseFormRegisterReturn } from 'react-hook-form';

interface PropsType {
  id: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
}

const TextArea = ({ id, placeholder, register }: PropsType) => {
  return (
    <textarea
      id={id}
      rows={4}
      className="text-gray-900 bg-gray-50 block w-full rounded-lg border border-black/20 p-2.5 text-sm outline-main"
      placeholder={placeholder}
      {...register}
    ></textarea>
  );
};

export default TextArea;
