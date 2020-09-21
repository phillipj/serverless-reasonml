# serverless-reasonml

This is a [serverless framework](https://serverless.com/framework/) plugin that has been
written for personal exploration while learning ReasonML and being curious about its
plausible usage writing serverless functions.

It has been intentionally made to be compatible with the [serverless-offline](https://github.com/dherault/serverless-offline) plugin.

Compared to great plugins like [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack) and [serverless-offline](https://github.com/dherault/serverless-offline), this plugin is
extremely trivial. Therefore assume there lots of edge cases that isn't covered yet,
although it has been valuable for personal use to get builds triggered at the right time.

## Usage

```
$ npm install --save serverless-reasonml bs-platform
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

## Known challenges

[bs-platform]() is required in production because it contains helper functions used by the
code [bucklescript]() generates. At the time of writing this, there's lots of development tools
included in bs-platform which results in a huge .zip file being created by the serverless framework.

The initial experiements I've done so far, results in archives near 50MB for extremely simple functions.

There are ongoing efforts in bs-platform splitting those development tools from the production utilities,
until then, the archives created with this setup will be big in filesize. That's quickly a showstopper
for Lamda@Edge functions which has a lot lower limit in regards to function archive filesize.

## Deprecation notice

Although this was a really interesting approach to serverless apps, I have personally not been using
serverless for a while now.

That's why this repository has been archived and read-only. I don't have any motivation working on this
going forward, so developers stumbling upon this project, should not be expecting new cool updates.

If this project could serve as a starting point for other cool projects and ideas, that would be really
cool!

Most importantly; just have fun folks!

## Related resources

- [@ahrefs/bs-aws-lambda](https://github.com/ahrefs/bs-aws-lambda) for extensible AWS Lambda typings
- [serverless-offline](https://github.com/dherault/serverless-offline) to run functions trigger by HTTP requests locally
