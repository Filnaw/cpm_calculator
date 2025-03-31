

function computeASAPSchedule(tasks, dependencies) {
  const tasksMap = {};
  for (const task of tasks) {
    tasksMap[task.id] = {
      ...task,
      earliest_start: 0,
      earliest_finish: 0,
    };
  }

  const adjacency = {};
  const inDegree = {};
  for (const task of tasks) {
    adjacency[task.id] = [];
    inDegree[task.id] = 0;
  }

  for (const dep of dependencies) {
    adjacency[dep.from].push(dep.to);
    inDegree[dep.to] = (inDegree[dep.to] || 0) + 1;
  }

  const queue = [];
  for (const task of tasks) {
    if (inDegree[task.id] === 0) {
      tasksMap[task.id].earliest_start = 0;
      tasksMap[task.id].earliest_finish = task.duration;
      queue.push(task.id);
    }
  }

  while (queue.length > 0) {
    const currentId = queue.shift();
    const currentTask = tasksMap[currentId];

    for (const neighborId of adjacency[currentId]) {
      const neighbor = tasksMap[neighborId];
      neighbor.earliest_start = Math.max(
        neighbor.earliest_start,
        currentTask.earliest_finish
      );
      neighbor.earliest_finish = neighbor.earliest_start + neighbor.duration;

      inDegree[neighborId]--;
      if (inDegree[neighborId] === 0) {
        queue.push(neighborId);
      }
    }
  }

  return Object.values(tasksMap);
}

export default computeASAPSchedule;