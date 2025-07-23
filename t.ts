import 'dotenv/config'

import { auth } from '@ipa/lib/auth'

async function main() {
  const user = await auth.api.signUpEmail({
    body: {
      name: 'Pedro Augusto Barbosa Aparecido',
      email: 'pedr.augustobarbosa.aparecido@gmail.com',
      password: 'peoo02jkx',
    },
  })

  console.log(user)
}

main().finally(() => {
  console.log('done')
  process.exit(0)
})
