import type { Comment } from "./comment";

const response = await fetch('https://jsonplaceholder.typicode.com/comments'); //api c:
const comments: Comment[] = await response.json();

console.log(comments.map(comment=> comment.email));