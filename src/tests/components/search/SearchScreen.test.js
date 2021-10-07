import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe('Tests on SearchScreen', () => {

    test('should to show correctly with default values', () => {
       
        const wrapper = mount( 
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a hero');
    });

    test('Should to show batman and input with the query string value', () => {
        const wrapper = mount( 
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        ); 
        expect(wrapper.find('input').prop('value')).toBe('batman');
    });

    test('should to show an error if the hero doesnt exists', () => {

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/search?q=batman1234']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        ); 

        expect(wrapper.find('.alert-danger').exists()).toBe(true);
    });

    test('Should call push history', () => {
        const history = {
            push: jest.fn()
        };
        const wrapper = mount( 
            <MemoryRouter initialEntries={['/search?q=batman']}> 
                <Route path="/search" component={ () => <SearchScreen history={history}  /> }/>
            </MemoryRouter>
        ); 

        wrapper.find('input').simulate('change', {
            target:{
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect( history.push ).toHaveBeenCalledWith( `?q=batman` );


    });

});
