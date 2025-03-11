import Ajv from 'ajv';  // Importem la llibreria Ajv
import * as schema from './post.json';  // Importem l'arxiu post.json que defineix com han de ser els objectes post

// Creem una instància d'Ajv
const ajv = new Ajv();
const validate = ajv.compile(schema);  // Compilem l'esquema en la funció validate per validar

// Funció per validar un post
function validatePost(post: any): boolean {
  const valid = validate(post);  // Validem el post
  if (!valid) { //no es valid, retorna el missatge d'error i sino ho mostra
    console.error('Errors de validació:', validate.errors);
  }
  return valid;
}

// Exemple de validació amb un post obtingut d'una API
const response = await fetch('https://jsonplaceholder.typicode.com/posts'); //utilitzem fetch per obtenir els post desde l'API publica
const posts: Post[] = await response.json(); //les dades obtingudes en el format json es transformen en un array d'objectes de tipus post

// Validem tots els posts, si es valid mostrem el titol, sino el mostrem com invañid
posts.forEach(post => {
  if (validatePost(post)) {
    console.log('Post vàlid:', post.title); 
  } else {
    console.log('Post invàlid:', post);
  }
});
