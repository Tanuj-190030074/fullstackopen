import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../util";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return <p key={part.name}> <b>{part.name} {part.exerciseCount}</b> <br/> {part.description}</p>
    case "Using props to pass data":
      return <p key={part.name}> <b>{part.name} {part.exerciseCount}</b> <br/> {part.groupProjectCount}</p>
    case "Deeper type usage":
      return <p key={part.name}> <b>{part.name} {part.exerciseCount}</b> <br/> {part.description} <br/> {part.exerciseSubmissionLink}</p>
    case "Another course part":
      return <p key={part.name}> <b>{part.name} {part.exerciseCount}</b> <br/> {part.comment}</p>
      case "Advanced":
        return <p key={part.name}> <b>{part.name} {part.exerciseCount}</b> <br/> {part.description}</p>
    default:
      return assertNever(part);
  }
};

export default Part;