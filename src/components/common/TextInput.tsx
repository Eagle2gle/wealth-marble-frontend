import { UseFormRegisterReturn } from 'react-hook-form';

interface PropsType {
  id: string;
  placeholder: string;
  required: boolean;
  register?: UseFormRegisterReturn;
}

const TextInput = ({ id, placeholder, required, register }: PropsType) => {
  return (
    <input
      type="text"
      id={id}
      className="outline-main bg-gray-50 border border-black/20 text-gray-900 text-sm rounded-lg w-full py-2 px-3 focus:ring-main focus:border-main focus:bg-none"
      placeholder={placeholder}
      required={required}
      {...register}
    />
  );
};

TextInput.displayName = 'TextInput';

export default TextInput;
