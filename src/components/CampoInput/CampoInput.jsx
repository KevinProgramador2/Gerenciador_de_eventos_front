import styles from "./CampoInput.module.css";

export default function CampoInput({ label, type = "text", placeholder, value, onChange }) {
  return (
    <label className={styles.campo}>
      <span className={styles.campoLabel}>{label}</span>
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
