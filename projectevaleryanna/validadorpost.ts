import Ajv from 'ajv'; //Importem la llibreria Ajv
import * as schema from './post.json'; // Importem l'arxiu post.json que defineix com han de ser els objectes post

//Creem una instància d'Ajv
const ajv = new Ajv();
const validate = ajv.compile(schema); // Compilem l'esquema en la funció validate per validar

// Funció per validar un post
function validatePost(post: any): boolean {
  const valid = validate(post); //Validem el post
  if (!valid) { //sino es vàlid, retorna el missatge d'error i sino ho mostra
    console.error('Errors de validació:', validate.errors);
  }
  return valid;
}

// Funció addicional: compta les paraules d'un text
function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
  //trim elimina els espais tant al principi com al final, 
  // split(/\s+/) Divideix el text en paraules, separant per qualsevol espai (inclosos múltiples espais, tabuladors o salts de línia).
  //length compta quants elements (paraules) té l'array final
}

// Obtenim els posts
const response = await fetch('https://jsonplaceholder.typicode.com/posts'); //utilitzem fetch per obtenir els post desde l'API publica
const posts: Post[] = await response.json(); //les dades obtingudes en el format json es transformen en un array d'objectes de tipus post

// Filtrar només els posts vàlids
const validPosts = posts.filter(post => validatePost(post));

// Transformar els posts vàlids per mostrar títol, autor i nombre de paraules
const transformedPosts = validPosts.map(post => ({
  title: post.title,
  author: post.userId,
  wordCount: countWords(post.body),
}));

// Mostrem els posts transformats
transformedPosts.forEach(post => {
  console.log(`Títol: ${post.title} | Autor: ${post.author} | Paraules: ${post.wordCount}`);
});
