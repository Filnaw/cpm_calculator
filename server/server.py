from flask import Flask, jsonify, request
from flask_cors import CORS
import networkx as nx

app = Flask(__name__)
CORS(app, resources={r"/gantt": {"origins": "*"}})

tasks = []

def calculate_cpm(tasks):
    G = nx.DiGraph()

    for task in tasks:
        G.add_node(task["id"], duration=task["duration"])

    for task in tasks:
        for dep in task["dependencies"]:
            G.add_edge(dep, task["id"])

    earliest_start = {}
    earliest_finish = {}

    for node in nx.topological_sort(G):
        predecessors = list(G.predecessors(node))
        if not predecessors:
            earliest_start[node] = 0
        else:
            earliest_start[node] = max(earliest_finish[p] for p in predecessors)
        earliest_finish[node] = earliest_start[node] + G.nodes[node]["duration"]

    latest_finish = {node: max(earliest_finish.values()) for node in G.nodes}
    latest_start = {}

    for node in reversed(list(nx.topological_sort(G))):
        successors = list(G.successors(node))
        if not successors:
            latest_finish[node] = earliest_finish[node]
        else:
            latest_finish[node] = min(latest_start[s] for s in successors)
        latest_start[node] = latest_finish[node] - G.nodes[node]["duration"]


    critical_path = [node for node in G.nodes if earliest_start[node] == latest_start[node]]

    result = {
        "tasks": [
            {
                "id": node,
                "name": next(t["name"] for t in tasks if t["id"] == node),
                "duration": G.nodes[node]["duration"],
                "earliest_start": earliest_start[node],
                "earliest_finish": earliest_finish[node],
                "latest_start": latest_start[node],
                "latest_finish": latest_finish[node],
                "critical": node in critical_path
            }
            for node in G.nodes
        ],
        "dependencies": [{"from": u, "to": v} for u, v in G.edges]
    }

    return result

@app.route('/gantt', methods=['GET'])
def get_gantt_data():
    cpm_data = calculate_cpm(tasks)
    return jsonify(cpm_data)

@app.route('/gantt', methods=['POST'])
def update_tasks():
    global tasks
    data = request.get_json()

    if not data or "tasks" not in data:
        return jsonify({"error": "Brak listy tasks w żądaniu"}), 400

    tasks = data["tasks"]
    return jsonify({"message": "Tasks updated successfully", "tasks": tasks})

if __name__ == "__main__":
    app.run(debug=True, port=8000)