type buttonProps = {
  label?: string;
  onSelect?: () => void;
  isSelected?: boolean;
};

export default function Button({ label, isSelected, onSelect }: buttonProps) {
  return (
    <>
      <button
        onClick={onSelect}
        className={`rounded-full text-sm font-semibold uppercase tracking-wide m-3 px-5 py-2 cursor-pointer border transition-all duration-100 
          ${
            isSelected
              ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/30"
              : "bg-transparent border-white/50 text-gray-400 hover:border-red-400/50 hover:text-white"
          }`}
      >
        {label}
      </button>
    </>
  );
}
