import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe('Tests on PrivateRoute.js', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    } 

    Storage.prototype.setItem = jest.fn();

    test('Should to show if isAuthenticated and save localStorage', () => {
        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={true}
                    component={() => <span>Ok!</span>}
                    { ...props }
                /> 
            </MemoryRouter>
        )
        expect( wrapper.find('span').exists() ).toBe(true);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
    });

    test('should blocked a component if it is not authenticated', () => {
        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={false}
                    component={() => <span>Ok!</span>}
                    { ...props }
                /> 
            </MemoryRouter>
        )
        expect( wrapper.find('span').exists() ).toBe(false);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
    });

});