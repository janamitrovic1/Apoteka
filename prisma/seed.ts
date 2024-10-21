import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

async function main() {
    const medicine1 = await prisma.medicines.create({data: {
        name: 'Vitamin C',
        cost: 100,
    }})
    const medicine2 = await prisma.medicines.create({data: {
        name: 'Brufen',
        cost: 1000,
    }})
    const medicine3 = await prisma.medicines.create({data: {
        name: 'Aspirin',
        cost: 600,
    }})
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
