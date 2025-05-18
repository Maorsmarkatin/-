import React, { useEffect, useState } from "react";
import axios from "axios";

import "../assets/styles/MainPage.css";
import Cardlist from "../external_comonets/cardlist/cardlist";
import SimpleBarChart from "../external_comonets/simpleBarChart/SimpleBarChart";
import SimplePieChart from "../external_comonets/simplePieChart/SimplePieChart";
import TableComponent from "../external_comonets/table/table";
import TaskComponent from "../external_comonets/task/task";

function MainPage({ username }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchtasksData();
    // fetchNameList(); // אם צריך, השאר. אם לא, הסר.
  }, []);

  const fetchtasksData = () => {
    axios
      .get(`dashboard_employee?name=${username}`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const toggleTaskStatus = (taskId) => {
    axios
      .post(`task/${taskId}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };

  const [criticalList, setcriticalList] = useState([]);

  // Removed unused candlesList state
  useEffect(() => {
    fetchcriticalData();
  }, []);

  const fetchcriticalData = () => {
    axios
      .get("Dashboard/critical")
      .then((res) => {
        setcriticalList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const [cardList, setcardList] = useState([]); // מוצרים שנבחרו להזמנה

  // Removed unused candlesList state
  useEffect(() => {
    fetchcardData();
  }, []);

  const fetchcardData = () => {
    axios
      .get("Dashboard/card")
      .then((res) => {
        setcardList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  // const card_list = [
  //   {
  //     tables: "order",
  //     total_objects: "5",
  //   },

  //   {
  //     tables: "users",
  //     total_objects: "2",
  //   },
  //   {
  //     tables: "task",
  //     total_objects: "5",
  //   },
  // ];

  const [candlesList, setcandlesList] = useState([]); // מוצרים שנבחרו להזמנה

  // Removed unused candlesList state
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("Dashboard/candles")
      .then((res) => {
        setcandlesList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  // const candlesList_toremove = [
  //   { month: "8-25", total_objects: 11 },
  //   { month: "8-25", total_objects: 11 },
  //   { month: "8-25", total_objects: 11 },
  //   { month: "8-25", total_objects: 11 },
  // ];

  const [taskCountList, setTaskCountList] = useState([]);

  useEffect(() => {
    fetchTaskData();
  }, []);

  const fetchTaskData = () => {
    axios
      .get("Dashboard/cake")
      .then((res) => {
        setTaskCountList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  };

  // const data1 = [
  //   { name: "משה", task_count: 5 },
  //   { name: "קובי", task_count: 99 },
  //   { name: "יובל", task_count: 7 },
  // ];

  return (
    <div>
      <Cardlist list={cardList} />
      <div
        className="simple-bar-chart-container"
        style={{ width: "98%", margin: "0 auto" }}
      >
        <h2 className="simple-bar-chart-title">מלאי קריטי</h2>
        <TableComponent data={criticalList} />
      </div>

      <div className="charts-row">
        <SimpleBarChart data={candlesList} />
        <SimplePieChart data={taskCountList} />
      </div>

      <div
        className="simple-bar-chart-container"
        style={{
          width: "98%",
          margin: "0 auto",
          marginTop: "20px",
          display: "block", // הוסף שורה זו
        }}
      >
        <h2 className="simple-bar-chart-title">משימות שלי</h2>
        <TaskComponent tasks={tasks} onToggleStatus={toggleTaskStatus} />
      </div>
    </div>
  );
}

export default MainPage;
