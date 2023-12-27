"use client";
import StatusDisplay from "./StatusDisplay";
import DeleteBlock from "./DeleteBlock";
import Link from "next/link";

const TaskCard = ({ task }) => {
  function formatTimestamp(timestamp) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  const createdDateTime = formatTimestamp(task.createdAt);
  const dueDateTime = task.dueDate
    ? formatTimestamp(task.dueDate)
    : "No Due Date";

  return (
    <div className="flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <StatusDisplay status={task.status} />
        <div className="ml-auto">
          <DeleteBlock id={task._id} />
        </div>
      </div>
      <Link href={`/TaskPage/${task._id}`} style={{ display: "contents" }}>
        <h4 className="mb-1">{task.title}</h4>
        <hr className="h-px  border-0 bg-page mb-2 "></hr>
        <p className="whitespace-pre-wrap">{task.description}</p>

        <div className="flex-grow"></div>

        <div className="flex flex-row justify-between">
          <p className="text-xs  my-1">Updated: {createdDateTime}</p>
          <p className="text-xs my-1">Due: {dueDateTime}</p>
        </div>
      </Link>
    </div>
  );
};

export default TaskCard;
