import styles from "./SelectInput.module.css"

const SelectInput = ({ input, setInput }: any) => (
  <div className={styles.boxOptions}>
    <button
      className={input == "form" ? styles.boxOptionActive : undefined}
      onClick={() => setInput("form")}
    >
      {"form"}
    </button>
    <button
      className={input == "json" ? styles.boxOptionActive : undefined}
      onClick={() => setInput("json")}
    >
      {"json"}
    </button>
  </div>
)

export default SelectInput
