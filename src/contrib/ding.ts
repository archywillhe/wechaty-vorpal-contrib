import {
  Args,
  CommandInstance,
  Vorpal,
}                     from 'wechaty-vorpal'
import { log } from 'wechaty'

function Ding () {
  log.verbose('WechatyVorpalContrib', 'Ding()')

  return function DingExtension (vorpal: Vorpal) {
    log.verbose('WechatyVorpalContrib', 'DingExtension(vorpal)')

    vorpal
      .command('ding [data...]', 'ding will trigger a reply of dong')
      .action(dingAction)
  }
}

async function dingAction (
  this: CommandInstance,
  args: Args
): Promise<void> {
  log.verbose('WechatyVorpalContrib', 'Ding() dingAction("%s")', JSON.stringify(args))
  if (args.data && Array.isArray(args.data)) {
    this.log('dong ' + args.data.join(' '))
  }
}

export { Ding }
