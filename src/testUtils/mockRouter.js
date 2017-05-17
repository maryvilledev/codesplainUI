const router = {
  push: jest.fn(),
  location: {
    pathname: '/',
  },
};

export const resetMockRouter = (routerObject) => {
  routerObject.push.mockClear();
};

export const generateMockRouter = (props) => {
  resetMockRouter(router);
  return {
    ...router,
    ...props,
  };
};

export default generateMockRouter;
