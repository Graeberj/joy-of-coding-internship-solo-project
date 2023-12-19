import EditTaskForm from "@/app/(components)/TaskForm";

const getTaskById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tasks/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

let updateTaskData = {};
const TaskPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;

  if (EDITMODE) {
    updateTaskData = await getTaskById(params.id);
    updateTaskData = updateTaskData.foundTask;
  } else {
    updateTaskData = {
      _id: "new",
    };
  }

  return <EditTaskForm task={updateTaskData} />;
};

export default TaskPage;
