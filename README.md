# LD-Explorer

Copyright 2024 [Crown Copyright](https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/)

LD-Explorer is a prototype user interface built upon the [Comunica graph querying framework](https://comunica.dev/) that can be used for exploring linked data resources directly in the browser. We have found that this tool helps to better demonstrate the value and purpose of linked data to newcomers, and increases the speed at which experiments/ideas can be created and tested. We are open sourcing this software to fill what we believe is a software gap in the linked data linked data space and to hopefully encourage its growth into a valuable community tool.

## Development

To run this project you will need a development environment which includes _NPM/NodeJS_ - at least version 18.15 but ideally the [latest Node LTS](https://nodejs.org/en).

```
# Start the dev server
npm i
npm run dev

# Run the tests
npm test

# Build for production (and test it locally)
npm run build
npm run preview
```

## Contributing

This software is inner-source and contributions are welcome. See [Contributing.md](./CONTRIBUTING.md) for details. In terms of required experience/knowledge, the main technologies used within this project are as follows.

- [Typescript](https://www.typescriptlang.org/)
- [Svelte](https://svelte.dev/) / [SvelteKit](https://kit.svelte.dev/)
- [Tailwind](https://tailwindcss.com/)
- [ICDS component library](https://design.sis.gov.uk/components)
- [Comunica](https://comunica.dev/)
- [N3](https://rdf.js.org/N3.js/)
- [RDFJS](https://rdf.js.org/)

## License

Unless stated otherwise, the codebase is released under the [Apache2 License](https://www.apache.org/licenses/LICENSE-2.0). This covers both the codebase and any sample code in the documentation. The documentation/wiki is and available under the terms of the [Open Government License v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

