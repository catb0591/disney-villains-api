const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chai = require('chai')
const { describe, it } = require('mocha')
const models = require('../../models')
const { getAll } = require('../../controllers/villains')
const { villainsList } = require('./mocks')

chai.use(sinonChai)
const { expect } = chai

describe('controllers - villains', () => {
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
})
