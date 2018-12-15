# serverless-reasonml

This project [serverless framework](https://serverless.com/framework/) plugin has been
written for personal exploration while learning ReasonML and being curious about its
plausible usage writing serverless functions.

It has been intentionally made to be compatible with the [serverless-offline](https://github.com/dherault/serverless-offline) plugin.

Compared to great plugins like [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack) and [serverless-offline](https://github.com/dherault/serverless-offline), this plugin is
extremely trivial. Therefore assume there lots of edge cases that isn't covered yet,
although it has been valuable for personal use to get builds triggered at the right time.

## Usage

```
$ npm install --save serverless-reasonml
```

Create a `bsconfig.json` with bucklescript configuration. Somewhat sensible example:

```json
{
  "name": "using-serverless-reasonml",
  "version": "0.1.0",
  "sources": {
    "dir" : "src",
    "subdirs" : true
  },
  "package-specs": {
    "module": "commonjs",
    "in-source": true
  },
  "suffix": ".js",
  "warnings": {
    "error" : "+101"
  },
  "namespace": true,
  "refmt": 3
}
```

The example above expects source code to be put in the `src` directory.

Finishing it off, the serverless framework has to be told to use this plugin by putting
the following in `serverless.yml`:

```yaml
plugins:
  - serverless-reasonml
```

## Related resources

- [@ahrefs/bs-aws-lambda](https://github.com/ahrefs/bs-aws-lambda) for extensible AWS Lambda typings
- [serverless-offline](https://github.com/dherault/serverless-offline) to run functions trigger by HTTP requests locally
