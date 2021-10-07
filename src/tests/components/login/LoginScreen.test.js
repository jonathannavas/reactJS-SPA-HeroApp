import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

describe('Tests on LoginScreen.js', () => {

    const history = {
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn()
    }

    const wrapper = mount( 
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={ history } /> 
        </AuthContext.Provider>
    );

    test('Should show correctly with snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should use dispatch and navigation', () => {
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();
        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name:'Jonathan'
            }
        });

        expect( history.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');
        handleClick();

        expect( history.replace ).toHaveBeenCalledWith('/dc');

    });



});