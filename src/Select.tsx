import { useEffect, useState } from "react";
import styles from "./select.module.css";

type SelectionOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  value?: SelectionOption;
  onChange: (value: SelectionOption | undefined) => void;
  options: SelectionOption[];
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  const clearOptions = () => {
    onChange(undefined);
  };

  const selectOption = (option: SelectionOption) => {
    if (option !== value) onChange(option);
  };

  const isOptionSelected = (option: SelectionOption) => {
    return option === value;
  };

  return (
    <div
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider} />
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            } ${index === highlightedIndex ? styles.highlighted : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
