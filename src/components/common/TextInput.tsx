import { UseFormRegisterReturn } from 'react-hook-form';

interface PropsType {
  id: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
}

const TextInput = ({ id, placeholder, register }: PropsType) => {
  return (
    <input
      type="text"
      id={id}
      className="bg-gray-50 text-gray-900 w-full rounded-lg border border-black/20 py-2 px-3 text-sm outline-main focus:border-main focus:bg-none focus:ring-main"
      placeholder={placeholder}
      {...register}
    />
  );
};

TextInput.displayName = 'TextInput';

export default TextInput;
