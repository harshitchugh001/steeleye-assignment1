import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("USD");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const target = mockData.header.returnedHits;
  const secondary = target +" orders";

  const filterRows = (rows, searchText) => {
    if (!searchText) {
      return rows;
    }
  
    return rows.filter((row) => row["&id"].toLowerCase().includes(searchText.toLowerCase()));
  };
  const showOrders=(index)=>{
    setSelectedOrderDetails(mockData.results[index].executionDetails)
    setSelectedOrderTimeStamps(timestamps.results[index].timestamps)
  }
  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={secondary}  />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","SEK","SGD","THB","TRY","USD","ZAR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>  
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
          
          key="selectedOrderDetails" 
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
          key="selectedOrderTimeStamps" 
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filterRows(mockData.results, searchText)} currency={currency} onSelect={showOrders}  />
      </div>
    </div>
  );
};

export default Dashboard;
