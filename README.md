## React Questions & Answers

### 1. What is JSX, and why is it used in React?

= JSX is a syntax that lets us write HTML-like code inside JavaScript. It makes React UI code easier to read and write.

### 2. What is the difference between props and state?

= Props are used to pass data from a parent component to a child component. State stores data that can change inside a component.

### 3. What does the `useState` hook do, and where did you use it in this project?

= `useState` is used to manage changing data in a React component. In this project, it could be used to store the selected technologies in the stack.

### 4. What does the `useEffect` hook do, and why did you need it to load the JSON data?

= `useEffect` is used to handle side effects in React. It can be used to fetch and load the technology data from the JSON file when the page loads.

### 5. Why does every item in a `.map()` list need a unique `key` prop?

= A unique `key` helps React identify list items and efficiently update the UI when items change.

### 6. What is conditional rendering? Show one place you used it.

= Conditional rendering means showing different UI based on a condition. For example, showing an empty stack message when no technology is selected.

### 7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?

= A parent passes data to a child using props. The child can send data back by calling a function passed through props.