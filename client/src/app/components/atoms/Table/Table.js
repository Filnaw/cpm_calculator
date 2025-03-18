"use client";
import React from "react";
import "./Table.css";

const Table = ()=> {
    const data = [
  { activity: "A", duration: 5, ES: 0, EF: 5, LS: 0, LF: 5, slack: 0, critical: "tak" },
  { activity: "B", duration: 7, ES: 0, EF: 7, LS: 5, LF: 12, slack: 5, critical: "nie" },
  { activity: "C", duration: 6, ES: 5, EF: 11, LS: 5, LF: 11, slack: 0, critical: "tak" },
  { activity: "D", duration: 8, ES: 5, EF: 13, LS: 7, LF: 15, slack: 2, critical: "nie" },
  { activity: "E", duration: 3, ES: 7, EF: 10, LS: 12, LF: 15, slack: 5, critical: "nie" },
  { activity: "F", duration: 4, ES: 11, EF: 15, LS: 11, LF: 15, slack: 0, critical: "tak" },
  { activity: "G", duration: 2, ES: 11, EF: 13, LS: 18, LF: 20, slack: 7, critical: "nie" },
  { activity: "H", duration: 5, ES: 15, EF: 20, LS: 15, LF: 20, slack: 0, critical: "tak" },
];

    return(
    <div className="tableContainer">
        <table className="table">
            <thead>
            <tr>
                <th>Czynność</th>
                <th>Czas trwania</th>
                <th>ES</th>
                <th>EF</th>
                <th>LS</th>
                <th>LF</th>
                <th>Rezerwa</th>
                <th>Czynność krytyczna</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr key={index} className={row.critical === "tak" ? "criticalRow" : ""}>
                    <td>{row.activity}</td>
                    <td>{row.duration}</td>
                    <td>{row.ES}</td>
                    <td>{row.EF}</td>
                    <td>{row.LS}</td>
                    <td>{row.LF}</td>
                    <td>{row.slack}</td>
                    <td>{row.critical}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
}

export default Table;