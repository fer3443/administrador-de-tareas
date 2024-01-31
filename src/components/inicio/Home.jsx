import React from "react";
import "../inicio/Home.css";
import { NavbarTask } from "../navbar/NavbarTask";
import { CreateTask } from "../createTask/CreateTask";
import { TaskList } from "../taskList/TaskList";
export const Home = () => {
  return (
   <main>
    <NavbarTask/>
    <CreateTask/>
    <TaskList/>
   </main>
  );
};
