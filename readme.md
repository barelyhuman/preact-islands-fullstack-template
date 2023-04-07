# preact-islands-fullstack-template

> Starter Template for fullstack apps with preact islands

A tiny base to start your full stack projects with, it's built with the DIY
philosophy so you are free to modify and build upon whatever is here in the
template. There are no opinions since it's just JS and no magic, other than
maybe the preact-island-plugin.


## Reason 
<small>more like, justification of its existence</small>

The template is built as a more controlled replacement for something like [Astro](http://astro.build), not to compete but to be able to fix things yourself when needed instead. OSS devs work on various things and sometimes it's hard for them to take your issues on priority but then that doesn't mean that your project needs to be on halt either. 

- You can either fix, then raise a PR for whatever you think needs to be fixed. Which might not get merged, so you can maintain a fork a continue
- Or, you can have a setup whose parts can be replaced as necessary and things are right there. 

I'm not against the 1st approach, I'm just more towards the 2nd one. 

The template tries not to be opinionated but there are some additional utilities I've added for myself. To be fair, I'm probably the only one going to use this. 

## Stack

- Express - HTTP Server
- Preact + [esbuild version of preact-island-plugins](https://github.com/barelyhuman/preact-island-plugins) 
- Partial Hydration / Island Hydration Setup
- Knex - Database Query Builder
- TailwindCSS + PostCSS - Self Explanatory

## Usage

- Clone the repo and then make it your own. 
```
git clone git@github.com:barelyhuman/preact-islands-fullstack-template my-app
cd my-app 
rm -rf .git 

# or do it all in one go 
$ npx degit barelyhuman/preact-islands-fullstack-template my-app
```

- The repo comes with `pnpm` as the package manager, if you wish to use `yarn` or `npm` 
just get rid of the `lock` file 

```sh
rm pnpm-lock.yaml 

# then 
npm i 
# or 
yarn install
```

- The `build.mjs` is responsible for combining and running all the moving parts, to better understand what's going on you can go through a [bare minimum setup](https://github.com/barelyhuman/preact-island-plugins/tree/main/examples/esbuild-express-web) 


## Directory Structure

The whole thing is divided into the following 
- `components`
- `lib`
- `pages`
- `server` 

The directories not mentioned here, `functions`, `database`, `migrations`, and `models` are all custom folders that I've added which I honestly don't use in a project, I'd move everything into an `src` directory but the template has it all on the root as to show all the parts out in the open

Either way, you should be able to make sense of each of them by the name but just to be sure, the `server` and `lib` are what take care of the logic both for the rendering of the elements and `render-html.js` and serving the files.

Everything is modifiable as mentioned in the [Reason](#reason) section, if the template is too opinionated, you can always start with one of the examples from [https://github.com/barelyhuman/preact-island-plugins](https://github.com/barelyhuman/preact-island-plugins)

## License

reaper Open Licensed

Free to do whatever with it, there are no constraints, the `license` file is a
part of the template to have an MIT starter and not a mandatory MIT base.
