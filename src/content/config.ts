// 1. Import utilities from `astro:content`
import { z, defineCollection, reference } from 'astro:content';
// 2. Define your collection(s)
const postsCollection = defineCollection({ 
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string())
  })
 });

 const serieCcollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    nomeatleta: z.string(),
    ruolo: z.string(),
    numero: z.string(),
    immagine: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    stats: z.string(),
    puntitotali: z.string(),
    avversari: z.array(z.string()),
    media: z.string()
  })
 })
 const under17collection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    nomeatleta: z.string(),
    ruolo: z.string(),
    numero: z.string(),
    immagine: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    stats: z.string()
  })
})
const under13collection = defineCollection({
 type: 'content',
 schema: z.object({
   title: z.string(),
   pubDate: z.date(),
   nomeatleta: z.string(),
   ruolo: z.string(),
   numero: z.string(),
   immagine: z.object({
     url: z.string(),
     alt: z.string(),
   }),
   stats: z.string()
 })
})
const minibasketcollection = defineCollection({
 type: 'content',
 schema: z.object({
   title: z.string(),
   pubDate: z.date(),
   nomeatleta: z.string(),
   ruolo: z.string(),
   numero: z.string(),
   immagine: z.object({
     url: z.string(),
     alt: z.string(),
   }),
   stats: z.string()
 })
 })
 const onedivisionecollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    nomeatleta: z.string(),
    ruolo: z.string(),
    numero: z.string(),
    immagine: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    stats: z.string()
  })
  })
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'posts': postsCollection,
  'seriec': serieCcollection,
  'under17': under17collection,
  'under13': under13collection,
  'minibasket': minibasketcollection,
  'onedivisione': onedivisionecollection
};