import styles from "./ListRow.module.css";

const ListCell = ({ children, onSelect, row,index }) => {
  return (
    <tr onClick={() => onSelect(index)} className={styles.cell}>
      {children}
    </tr>
  );
};

export default ListCell;