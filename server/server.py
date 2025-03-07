from flask import Flask, jsonify
from flask_cors import CORS
import networkx as nx

app = Flask(__name__)
CORS(app)

tasks = [
    {"id": "A", "name": "A", "duration": 3, "dependencies": []},
    {"id": "B", "name": "B", "duration": 5, "dependencies": []},
    {"id": "C", "name": "C", "duration": 2, "dependencies": ["A"]},
    {"id": "D", "name": "D", "duration": 4, "dependencies": ["B"]},
    {"id": "E", "name": "E", "duration": 3, "dependencies": ["B"]},
    {"id": "F", "name": "F", "duration": 2, "dependencies": ["C", "D"]},
    {"id": "G", "name": "G", "duration": 4, "dependencies": ["E"]},
    {"id": "H", "name": "H", "duration": 3, "dependencies": ["F", "G"]},
    {"id": "I", "name": "I", "duration": 2, "dependencies": ["H"]}

]

def calculate_cpm(tasks):
    G = nx.DiGraph()
    
    # Dodaj zadania do grafu
    for task in tasks:
        G.add_node(task["id"], duration=task["duration"])
    
    # Dodaj zależności
    for task in tasks:
        for dep in task["dependencies"]:
            G.add_edge(dep, task["id"])
    
    # Obliczanie najwcześniejszych czasów rozpoczęcia i zakończenia (Forward Pass)
    earliest_start = {}
    earliest_finish = {}
    
    for node in nx.topological_sort(G):
        predecessors = list(G.predecessors(node))
        if not predecessors:
            earliest_start[node] = 0
        else:
            earliest_start[node] = max(earliest_finish[p] for p in predecessors)
        earliest_finish[node] = earliest_start[node] + G.nodes[node]["duration"]

    # Obliczanie najpóźniejszych czasów rozpoczęcia i zakończenia (Backward Pass)
    latest_finish = {node: max(earliest_finish.values()) for node in G.nodes}
    latest_start = {}

    for node in reversed(list(nx.topological_sort(G))):
        successors = list(G.successors(node))
        if not successors:
            latest_finish[node] = earliest_finish[node]  # Dla ostatnich zadań LF = EF
        else:
            latest_finish[node] = min(latest_start[s] for s in successors)
        latest_start[node] = latest_finish[node] - G.nodes[node]["duration"]

    # Identyfikacja ścieżki krytycznej
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

@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "Hello world!"
    })

@app.route('/gantt', methods=['GET'])
def get_gantt_data():
    cpm_data = calculate_cpm(tasks)
    return jsonify(cpm_data)

if __name__ == "__main__":
    app.run(debug=True, port=8080)
