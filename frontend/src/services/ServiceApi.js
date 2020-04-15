import Api from "@/services/Api";
import MockAdapter from "axios-mock-adapter";
import Mock from "@/services/ServiceApi.mock";
const options = { baseURL: process.env.VUE_APP_API_URL };
const NormalApi = Api(options);

const makeRequest = ({
  url = null,
  mockResponse = null,
  apiMethod = null,
  apiPayload = null
}) => {
  const MockApi = Api(options);
  const mock = new MockAdapter(MockApi, { delayResponse: 1300 });
  const useMock = process.env.VUE_APP_MOCK === "true";
  const selectedApi = useMock && mockResponse ? MockApi : NormalApi;
  const mockMethods = {
    get: "onGet"
  };
  if (mockResponse) {
    const mockMethod = mockMethods[apiMethod];
    mock[mockMethod](url).reply(() => mockResponse);
  }
  return selectedApi[apiMethod](url, apiPayload);
};

export default {
  index() {
    return makeRequest({
      url: `/clients`,
      apiMethod: "get",
      apiPayload: {},
      mockResponse: Mock.index
    });
  }
};
