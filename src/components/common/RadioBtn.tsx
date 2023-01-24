interface PropsType {
  id: string;
  name: string;
  option: { value: string; label: string }[];
}

const RadioBtn = ({ id, name, option }: PropsType) => {
  return (
    <div className="flex flex-wrap">
      {option.map((el, i) => {
        return (
          <div key={i} className="flex items-center mr-4">
            <input
              id={`${id}-${i}`}
              type="radio"
              value={el.value}
              name={name}
              className="radio checked:bg-main w-4 h-4"
              defaultChecked={i === 0}
            />
            <label
              htmlFor={`${id}-${i}`}
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
            >
              {el.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioBtn;
