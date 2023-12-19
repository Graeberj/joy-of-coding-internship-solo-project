import DeleteBlock from "./DeleteBlock";
import Link from "next/link";

const TaskCard = ({ task }) => {
  function formatTimestamp(timestamp) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  const createdDateTime = formatTimestamp(task.createdAt);

  return (
    <div className="flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <input type="checkbox" />
        <div className="ml-auto">
          <DeleteBlock id={task._id} />
        </div>
      </div>
      <Link href={`/TaskPage/${task._id}`} style={{ display: "contents" }}>
        <h4 className="mb-1">{task.title}</h4>
        <hr className="h-px  border-0 bg-page mb-2 "></hr>
        <p className="whitespace-pre-wrap">{task.description}</p>

        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs  my-1">{createdDateTime}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TaskCard;
