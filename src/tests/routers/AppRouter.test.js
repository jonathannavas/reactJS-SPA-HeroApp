import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe('Tests on AppRouter.js', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('Should show the login page if is not authenticated', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                 <AppRouter />
            </AuthContext.Provider>     
        );

        expect( wrapper ).toMatchSnapshot();

    });

    test('Should to show marvel componente if the user is authenticated', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Jonathan'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                 <AppRouter />
            </AuthContext.Provider>     
        );
        
        expect( wrapper.find('.navbar').exists() ).toBe(true);
    });

});