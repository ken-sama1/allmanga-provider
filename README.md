# allmanga-provider

A type-safe SDK for AllManga GraphQL-API with projection-base response inference.

## Features

- Projection-based response inference
- Fully-type API SDK
- Custom schema field extension
- GQL-style field selection  

## Installation

> Currently not published on npm.

### Using npm

```bash
npm install https://github.com/Ken-Sama1/allmanga-provider#release/1.0.0
```

### Clone Repository

```bash
git clone https://github.com/Ken-Sama1/allmanga-provider#release/1.0.0
```

## Requirements

> I have not tested this on lower versions of node and typescript.

- Node >= v25.9.0
- Typescript >= 6.0.3

## Quick Start

```ts
import allmanga from "allmanga-provider";

const show = await allmanga
  .show({
    _id: "bNAbh8viz7n7dGtNM",
  })
  .get({
    name: 1,
    _id: 1,
    altNames: 1,
  } satisfies typeof allmanga.show.projection);

if (show.status === "success") {
  console.log(show.data.name);
  console.log(show.data._id);
  console.log(show.data.altNames);
}
```

## Core Concept

### Two-Stage Query Pipeline

Queries follow a two-stage execution pipeline.

```ts
// Stage 1: provide the required variable
const query = allmanga.mangas({
  search: {
    query: "Lord of the Mysteries"
  },
  translationType: "sub",
  "countryOrigin": "ALL"
});

// Stage 2: Select the returned data shape
const res = await query.get({
  name: 1,
  _id: 1,
});
```

### Projection Syntax

Selection stage `.get()` follows MongoDB projection-style.

- 1 include a field
- 0 exclude a field

```ts
.get({
  name: 1,
  _id: 1,
  __typename: 0
})
```

## Usage

### 1. Basic Query

Search an anime with title `"Lord of the Mysteries"`

```ts
import allmanga from "allmanga-provider";

const shows = await allmanga.shows({
  translationType: "sub",
  countryOrigin: "ALL",
  search: {
    query: "Lord of the Mysteries"
  }
}).get({
    edges: {
      _id: 1,
      name: 1,
      description: 1,
    }, 
    pageInfo: {
      hasNextPage: 1,
    }
  } satisfies typeof allmanga.shows.projection);


if (shows.status === "success" && shows.data.edges?.length) {
  console.log(shows.data.edges[0]?._id);
  console.log(shows.data.edges[0]?.description);

  // @ts-expect-error: undefined field 
  console.log(shows.data.edges[0].thumbnail);
}
```

If you are searching an anime or manga with their title and sure that it exist,
but return an empty array, try providing a `countryOrigin` and `translationType`.
If this still return an empty array or null, they may not have an entry for it.

### 2. Query Episode Sources  

```ts
const episode = await allmanga.episode({
  showId: "bNAbh8viz7n7dGtNM",
  episodeString: "1",
  translationType: "sub"
}).get({
    sourceUrls: 1,
    show: {
      name: 1,
      aniListId: 1, 
    }
  } satisfies typeof allmanga.episode.projection);

if (episode.status === "success") {
  console.log(episode.data.sourceUrls);
}
```

### Why Use `satisfies`?

Selection stage `.get()` is intentionally loosely constrained
to preserve projection-based response inference.

You can extract the projection type by doing `typeof allmanga.method.projection`.
Ensure that you are extracting the projection type from the same method as the query.
Otherwise you will not see the error at compile-time.

`allmanga.method.projection` is type only and undefined in the run time.

Example:

```ts
allmanga.manga({
  ...args
}).get({
    ...selections 
  } satisfies typeof allmanga.manga.projection);
```

Without it:

- Autocomplete still works.
- Hover definition may become `any`
but will get validated in compile-time which may become confusing.
- Typos will not be detected.

## Spread Selection Caveat

For some reason typescript does not validate properties inside the spread operator
on selection stage `.get()` even with `satisfies`.

This allows the invalid fields to bypass compile-time check.

```ts
const response = await allmanga.manga({
  ...args,
}).get({
    _id: 1,
    name: 1,

    ...{
      //  will not get detected
      pageStatus: {
        _id: 1,
        description: 1,
      }
    }
  })
```

The field `pageStatus` does not exist on the typed schema model of `.manga`,
but it exist in the AllManga GraphQL-API,
thus the request will not encounter an error.

However `pageStatus` will not appear on response inference,
because it is not in the schema model.

## Custom Field Extension

Fields that exist on the AllManga GraphQL-API
but are not yet included in the schema model
can be safely added through module augmentation.

Create a declaration file:  

```ts
// allmanga-provider.d.ts 

declare module "allmanga-provider" {
  interface SchemaModelManga {
    readonly pageStatus: {
      readonly _id: string;
      readonly description: string;
      readonly dislikesCount: number;
    }
  }
}
```

The new field will now appear in:

- Autocomplete
- Inferred response type

```ts
const manga = await allmanga
  .manga({
    _id: "8EzhvAL9dhSiqouuY",
  })
  .get({
    pageStatus: {
      _id: 1,
      description: 1,
      dislikesCount: 1,
    },
  } satisfies typeof allmanga.manga.projection);

if (manga.status === "success") {
  console.log(manga.data.pageStatus?.dislikesCount);
}
```

You will find `Schema Model X` when you hover over the methods,
just take the `X` and add `SchemaModel` at the beginning `SchemaModelX`.

## Response Status Type

Discriminated `status` union is used to safely handle API response.
Depending on the `status` different fields are guaranteed to be available at compile-time.

`AllMangaGQLError` fields:

```ts
{
 message: string;
 locations?: {
  line: number;
  column: number;
 }[];
 path?: string[];
 extensions?: {
  code?: string;
 };
}
```  

`errors: AllMangaGQLError[]`
`data: T` (Fully Inferred selection)

| status | Description | Available Properties |
| --------------- | --------------- | --------------- |
| `"success"` | Request completed | `{ data }` |
| `"partial"` | Request completed with non fatal error | `{ data, errors }` |
| `"gql-error"` | Error at the resolver level | `{ errors }` |
| `"error"` | HTTP error occured | `error: {status: number; message: string;}` |

## Utility

### Deobfuscate URL

When you query anime episodes some source url are obfuscated
`deobfuscateURL()` is the utility to decode them.

```ts
const episode = await allmanga.episode({
  showId: "bNAbh8viz7n7dGtNM",
  episodeString: "1",
  translationType: "sub"
}).get({
    sourceUrls: 1,
    show: {
      name: 1,
      aniListId: 1, 
    }
  } satisfies typeof allmanga.episode.projection);

type SourceUrl = {
  sourceUrl: string;
  priority: number;
  sourceName: string;
}

if (episode.status === "success") {
  // initial value of episode.data.sourceUrls is unknown
  const sourceUrls = episode.data?.sourceUrls as SourceUrl[];

  sourceUrls.forEach(source => {
    const deobfuscatedURL = allmanga.utils.deobfuscateURL(source.sourceUrl);
    console.log(source.sourceName, deobfuscatedURL);
  });
}
```

## Proxy

### YoutubeAnime Proxy

`youtubeAnimeProxy()` is an `AsyncGenerator` pipeline
designed to safely proxy and stream raw manga panel binaries from `YoutubeAnime`.

Example:

```ts
import allmanga from "allmanga-provider";

const chapters = await allmanga
 .chaptersForRead({
  mangaId: "8EzhvAL9dhSiqouuY",
  chapterString: "2",
  translationType: "sub",
 })
 .get({
  edges: {
   sourceName: 1,
   pictureUrls: 1,
  },
 } satisfies typeof allmanga.chaptersForRead.projection);

type MangaPanel = {
  num: number;
  url: string;
}

const fetchPanels = async () => {
  if(chapters.status !== "success" || !chapters.data.edges?.length) return;

  const panels = chapters.data.edges[0]?.pictureUrls as MangaPanel[];  
  const stream = allmanga.proxy.youtubeAnime(panels, {
    autoRetry: true,
  });

  for await (const chunk of stream) {
    console.log(chunk)
  }
}

fetchPanels();
```

You can find a detailed documentation and example on `proxy-demo.ts`.

## API

### Available Query Methods

- `allmanga.show();`
- `allmanga.shows();`
- `allmanga.showWithIds()`;
- `allmanga.episode();`
- `allmanga.manga();`
- `allmanga.mangas();`
- `allmanga.mangasWithIds();`
- `allmanga.chaptersForRead();`

Examples for each method are available on `sample.ts`

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
