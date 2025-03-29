interface ToggleSwitchProps {
  id: string;
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleSwitch = ({ id, label, defaultChecked = false, onChange }: ToggleSwitchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <div className="relative">
        <input 
          id={id}
          type="checkbox" 
          className="sr-only" 
          defaultChecked={defaultChecked}
          onChange={handleChange}
          aria-label={label}
        />
        <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner"></div>
        <div className={`dot absolute w-5 h-5 bg-white rounded-full shadow -left-1 -top-0 transition ${defaultChecked ? 'transform translate-x-full bg-red-500' : ''}`}></div>
      </div>
    </label>
  );
};

export default ToggleSwitch; 