/* eslint-disable no-console */
const models = require('../models')

const getAll = async (request, response) => {
  const villainData = await models.villains.findAll()

  const filteredVillainData = villainData.map(villain => {
    return { name: villain.name, movie: villain.movie, slug: villain.slug }
  })

  return response.send(filteredVillainData)
}

const getBySlug = async (request, response) => {
  const { slug } = request.params

  try { const findSlug = await models.villains.findOne({ where: { slug } })

    const villainData = { name: findSlug.name, movie: findSlug.movie, slug: findSlug.slug }

    return response.send(villainData)
  } catch (e) { console.log(e)
  }

  return response.sendStatus(404)
}

const createNew = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(404).send('Error')
  }

  const newTeam = await models.villains.create({ name, movie, slug })

  return response.status(201).send(newTeam)
}

module.exports = { getAll, getBySlug, createNew }
