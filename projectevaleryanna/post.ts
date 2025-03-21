export type Post = {
    userId: number
    id: number
    title: string
    body: string
}
//l'objecte Post és exportable, és a dir, es pot importar i reutilitzar en altres arxius Typescript on aquest objecte conté les propietats userId, id, title i body.
