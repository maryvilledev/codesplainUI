import moxios from 'moxios'
const mockClientId = process.env.CLIENT_ID

import { handler } from '../../awslambda/Authorize'

const mockMethodArn = 'Teleport'

const mockToken = 'ricksanchez'

jest.mock('aws-sdk')

describe('handler', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should create a policy if a valid token is passed', async () => {
    const mockEvent = {
      methodArn: mockMethodArn,
      authorizationToken: mockToken
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
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {'status': '200'}
      })
    })
    const mockCallback = jest.fn((error, policy) => {
      expect(error).toBe(null);
      expect(policy).toEqual(expected);
    })
    await handler(mockEvent, null, mockCallback)
    expect(mockCallback).toHaveBeenCalled()
  })
  it('should return "Unauthorized" if token is not valid', async () => {
    const mockEvent = {
      methodArn: mockMethodArn,
      authorizationToken: mockToken
    }
    const expected = "Unauthorized"
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: {'status': '403'}
      })
    })
    const mockCallback = jest.fn((error, policy) => {
      expect(policy).toBe(undefined)
      expect(error).toEqual(expected);
    })
    await handler(mockEvent, null, mockCallback)
    expect(mockCallback).toHaveBeenCalled()
  })
})
