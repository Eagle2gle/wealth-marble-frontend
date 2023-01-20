interface PropsType {
  id: string;
  placeholder: string;
  required: boolean;
}
const TextArea = ({ id, placeholder, required }: PropsType) => {
  return (
    <textarea
      id={id}
      rows={4}
      className="outline-main block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-black/20"
      placeholder={placeholder}
      required={required}
    ></textarea>
  );
};

export default TextArea;
