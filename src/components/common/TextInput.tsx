interface PropsType {
  id: string;
  placeholder: string;
  required: boolean;
}
const TextInput = ({ id, placeholder, required }: PropsType) => {
  return (
    <input
      type="text"
      id={id}
      className="outline-main bg-gray-50 border border-black/20 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
      placeholder={placeholder}
      required={required}
    />
  );
};

export default TextInput;
