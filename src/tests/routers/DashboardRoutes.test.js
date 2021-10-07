import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe('Tests on DashboardRoutes.js', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Jonathan'
        }
    }

    test('Should show ok', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>     
        );

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find('span').text().trim() ).toBe('Jonathan');

    });

});