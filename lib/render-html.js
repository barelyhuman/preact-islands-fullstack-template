import { h } from 'preact'
import preactRenderToString from 'preact-render-to-string'

export const renderMiddleware = (req, res, next) => {
  res.render = (component, data) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).write(
      withManifestBundles({
        body: preactRenderToString(h(component, data)),
      })
    )
    return res.end()
  }
  next()
}

export const withManifestBundles = ({ body }) => {
  return `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/public/server.css" />
    </head>

    <body>
      ${body}
    </body>
  </html>`
}
