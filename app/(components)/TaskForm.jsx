"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditTaskForm = ({ task }) => {
  const EDITMODE = task._id === "new" ? false : true;
  const router = useRouter();
  const startingTaskData = {
    title: "",
    description: "",
    isCompleted: false,
  };

  if (EDITMODE) {
    startingTaskData["title"] = task.title;
    startingTaskData["description"] = task.description;
    startingTaskData["status"] = task.status;
    startingTaskData["category"] = task.category;
    startingTaskData["isDone"] = task.isDone;
  }

  const [formData, setFormData] = useState(startingTaskData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
    } else {
      const res = await fetch("/api/Tasks", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create task");
      }
    }
    router.refresh();
    router.push("/");
  };

  const categories = ["Urgent", "Long Term", "Daily Task"];

  return (
    <div className=" flex justify-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h3>{EDITMODE ? "Update Your Task" : "Create New Task"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories?.map((category, _index) => (
            <option key={_index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Update Task" : "Create Task"}
        />
      </form>
    </div>
  );
};

export default EditTaskForm;
