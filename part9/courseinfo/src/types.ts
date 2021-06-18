interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartWithDescription extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartOne extends CoursePartWithDescription {
    name: "Fundamentals";
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CoursePartWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }
  
  export interface CoursePartFour extends CoursePartBase {
    name: "Another course part";
    comment: string;
    description: string;
  }

  export interface CoursePartFive extends CoursePartBase {
    name: "Advanced";
    description: string;
    type: "normal"
  }
  
  export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour| CoursePartFive;