import React from "react";
import TaskCard from "./(components)/TaskCard";

const getTasks = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tasks", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

async function toggleComplete(id, isCompleted) {
  try {
    const res = await fetch(`http://localhost:3000/api/Tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted: !isCompleted }),
    });

    if (!res.ok) {
      throw new Error("Failed to update task");
    }

    return res.json();
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

const Dashboard = async () => {
  const data = await getTasks();

  // Make sure we have tasks needed for production build.
  if (!data?.tasks) {
    return <p>No tasks.</p>;
  }

  const tasks = data.tasks;

  const uniqueCategories = [...new Set(tasks?.map(({ category }) => category))];

  return (
    <div className="p-5">
      <div>
        {tasks &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
                {tasks
                  .filter((task) => task.category === uniqueCategory)
                  .map((filteredTask, _index) => (
                    <TaskCard id={_index} key={_index} task={filteredTask} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
