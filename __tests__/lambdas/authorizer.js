const mockClientId = 'birdperson';
const mockClientSecret = 'molting'
process.env.CLIENT_ID = mockClientId;
process.env.CLIENT_SECRET = mockClientSecret;

import { handler } from '../../awslambda/authorizer'

const mockMethodArn = 'Teleport'

const mockValidToken = 'ricksanchez'
const mockInvalidToken = 'mortysmith'

jest.mock('axios', () => {
  return {
    errored: true,
    get: function (url, opts) {
      console.log(url)
      const valid = (url ===
        `https://api.github.com/applications/${mockClientId}/tokens/${mockValidToken}`)
      if (valid) {
        this.errored = false
      }
      return this
    },
    then: function(callback) {
      if(!this.errored) {
        callback()
      }
      return this;
    },
    catch: function(callback) {
      if(this.errored) {
        callback()
      }
    }
  }
})
jest.mock('aws-sdk')

describe('handler', () => {
  it('should create a policy if a valid token is passed', () => {
    const mockEvent = {
      methodArn: mockMethodArn,
      authorizationToken: mockValidToken
    }
    const expected = {
      principalId: 'user',
      policyDocument: expect.objectContaining({
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: mockMethodArn
        }]
      })
    }
    const mockCallback = (error, policy) => {
      expect(error).toBe(null);
      expect(policy).toEqual(expected);
    }
    handler(mockEvent, null, mockCallback)
  })
  it('should return "Unauthorized" if token is not valid', () => {
    const mockEvent = {
      methodArn: mockMethodArn,
      authorizationToken: mockInvalidToken
    }
    const expected = "Unauthorized"
    const mockCallback = (error, policy) => {
      expect(error).toEqual(expected);
    }
  })
})
