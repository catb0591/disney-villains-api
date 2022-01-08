const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chai = require('chai')
const { describe, it, before, afterEach } = require('mocha')
const models = require('../../models')
const { getAll, getBySlug, createNew } = require('../../controllers/villains')
const { villainsList, singleVillain, villainSubmitted, incompleteVillain } = require('./mocks')

chai.use(sinonChai)
const { expect } = chai

describe('controllers - villains', () => {
  let stubbedFindOne

  before(() => {
    stubbedFindOne = sinon.stub(models.villains, 'findOne')
  })

  afterEach(() => {
    stubbedFindOne.resetBehavior()
  })

  describe('getAll', () => {
    it('retrieves a list of villains from the database and call response.send() with that list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAll({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })

  describe('getBySlug', () => {
    it('retrieves the villain associated with the provided slug from the database and calls response.send with it',
      async () => {
        stubbedFindOne.returns(singleVillain)
        const request = { params: { slug: 'Gaston' } }
        const stubbedSend = sinon.stub()
        const response = { send: stubbedSend }

        await getBySlug(request, response)

        expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'Gaston' } })
        expect(stubbedSend).to.have.been.calledWith(singleVillain)
      })

    it('return a 404 status when no villain is found', async () => {
      const request = { params: { slug: 'not-found' } }
      const stubbedSendStatus = sinon.stub()
      const response = { sendStatus: stubbedSendStatus }

      stubbedFindOne.returns(null)

      await getBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
  })

  describe('createNew', () => {
    it('saves a new villain to our database and returns the saved record with a 201 status', async () => {
      const request = { body: villainSubmitted }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      const stubbedCreate = sinon.stub(models.villains, 'create').returns(singleVillain)

      await createNew(request, response)

      expect(stubbedCreate).to.have.been.calledWith(villainSubmitted)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })

    it('return a 404 status when villain can not be added', async () => {
      const request = { body: incompleteVillain }
      const stubbedSend = sinon.stub().returns('Error')
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }

      await createNew(request, response)

      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedSend).to.have.been.calledWith('Error')
    })
  })
})
