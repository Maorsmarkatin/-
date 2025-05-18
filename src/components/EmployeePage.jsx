import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskComponent from "../external_comonets/task/task";

function EmployeePage({ username }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
    // fetchNameList(); // אם צריך, השאר. אם לא, הסר.
  }, []);

  const fetchData = () => {
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

  return (
    <div>
      <div className="simple-bar-chart-container task-container"
      >
        <h2 className="simple-bar-chart-title">משימות שלי</h2>
        <div className="task-scroll-area">
          <TaskComponent tasks={tasks} onToggleStatus={toggleTaskStatus} />
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
