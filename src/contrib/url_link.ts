import {
  log,
  UrlLink as WechatyUrlLink,
  UrlLinkPayload,
}                 from 'wechaty'
import {
  Vorpal,
  CommandInstance,
  Args,
}                           from 'wechaty-vorpal'

function UrlLink () {
  log.verbose('WechatyVorpalContrib', 'UrlLink()')

  return function UrlLinkExtension (vorpal: Vorpal) {
    log.verbose('WechatyVorpalContrib', 'UrlLinkExtension(vorpal)')

    vorpal
      .command('url_link <url>', 'create a UrlLink message card')
      .option('-d --description <description>', 'the card description')
      .option('-i --image <thumbnailUrl>', 'the card thumbnail image url')
      .option('-t --title <title>', 'the card title')
      .action(urlLinkAction as any)
  }
}

type UrlLinkOptions = Partial<UrlLinkPayload>

async function urlLinkAction (
  this: CommandInstance,
  args: Args
): Promise<number> {
  log.verbose('WechatyVorpalContrib', 'urlLinkAction("%s")', JSON.stringify(args))

  const url: string = Array.isArray(args.url)
    ? args.url[0]
    : args.url
  const options: UrlLinkOptions = args.options

  const urlLink = await WechatyUrlLink.create(url)

  if (options.description) {
    urlLink.payload.description = options.description
  }
  if (options.thumbnailUrl) {
    urlLink.payload.thumbnailUrl = options.thumbnailUrl
  }
  if (options.title) {
    urlLink.payload.title = options.title
  }

  this.stdout.next(urlLink)
  return 0
}

export { UrlLink }
