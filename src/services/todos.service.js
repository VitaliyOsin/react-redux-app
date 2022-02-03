import httpService from "./http.service";

const todosEndpoint = "todos/";

const todosService = {
    fetch: async () => {
        const { data } = await httpService.get(todosEndpoint, {
            params: {
                _page: 1,
                _limit: 10
            }
        });
        return data;
    },
    add: async (lim) => {
        const { data } = await httpService.get(todosEndpoint, {
            params: {
                _page: 1,
                _limit: lim
            }
        });
        return data;
    }
}

export default todosService;
