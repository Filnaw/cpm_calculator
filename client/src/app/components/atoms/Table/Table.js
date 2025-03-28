"use client";
import React, {useEffect, useState} from "react";
import "./Table.css";

const Table = ({ setTasks, tasks, refreshTable }) => {
    const [tableData, setTableData] = useState(null);

    const fetchTableData = () => {
        fetch("http://localhost:8000/gantt")
            .then(response => response.json())
            .then(data => {
                console.log("📡 Pobranie danych z serwera:", data);
                setTableData(data);
                if (data && data.tasks) {
                    setTasks(data.tasks);
                } else {
                    setTasks([]);
                }
            })
            .catch(error => console.error("Błąd pobierania danych:", error));
    };

    useEffect(() => {
        fetchTableData();
    }, []);

     useEffect(() => {
        refreshTable();
    }, []);

    useEffect(() => {
    setTableData({ tasks });
  }, [tasks]);


    if (!tableData) {
        return <p>Loading data...</p>;
    }

    return (
        <div className="tableContainer">
            <table className="table">
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Duration</th>
                        <th>ES</th>
                        <th>EF</th>
                        <th>LS</th>
                        <th>LF</th>
                        <th>Reserve</th>
                        <th>Critical activity</th>
                    </tr>
                </thead>

                <tbody>
               {tableData.tasks.length > 0 ? (
                        tableData.tasks.map((task, index) => (
                            <tr key={index} className={task.critical ? "criticalRow" : ""}>
                                <td>{task.id}</td>
                                <td>{task.duration}</td>
                                <td>{task.earliest_start}</td>
                                <td>{task.earliest_finish}</td>
                                <td>{task.latest_start}</td>
                                <td>{task.latest_finish}</td>
                                <td>{task.latest_start - task.earliest_start}</td>
                                <td>{task.critical ? "yes" : "no"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={{ textAlign: "center", fontStyle: "italic" }}>
                                Brak danych
                            </td>
                        </tr>
                    )}
                </tbody>


            </table>
        </div>
    );
};

export default Table;
