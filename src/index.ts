import { fastify } from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

const getUsers = async () => {
    let mark = Date.now()

    let users = await prisma.user.findMany({
        select: {
            name: true,
            posts: {
                select: {
                    title: true
                }
            }
        }
    })

    console.log('Take', Date.now() - mark, 'ms')

    return users
}

app.get('/', getUsers)

app.listen(8080, '0.0.0.0', (err, addr) => {
    if (err) return console.error(err)

    console.log(addr)
})
