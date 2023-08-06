import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";
import timestampData from "../../assets/timeStamps.json";

const List = ({ rows, currency,onSelect }) => {
  const findTimestampById = (id) => {
    const timestamp = timestampData.results.find((item) => item["&id"] === id);
    return timestamp ? timestamp.timestamps.orderSubmitted : "N/A";
  };
  const getCurrencyValue = (row) => {
    return row.bestExecutionData.orderVolume[currency] || "N/A";
  };
  const handleSelect=(index)=>{
    onSelect(index)
  }
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / USD</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row,index) => (
          <ListRow key={index} index={index} onSelect={handleSelect} row={row}>
          <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{findTimestampById(row["&id"])}</ListRowCell>
            <ListRowCell>{getCurrencyValue(row)}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
