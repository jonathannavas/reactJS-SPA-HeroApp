import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/heroes/HeroScreen";

describe('Tests on HeroScreen.js', () => {
   
    const history = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn()
    };
    
    test('Should show redirect component if dont get params in the url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={history} />
            </MemoryRouter>
        );
        expect( wrapper.find('Redirect').exists() ).toBe(true);
    })

    test('should show a hero is the param exists', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe(true);

    });

    test('Should to return to the last screen using PUSH', () => {
        const history = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={() => <HeroScreen history={history} /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalledWith();

    });

    test('should return to the last screen', () => {
 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={() => <HeroScreen history={history} /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledTimes(0);
        expect( history.goBack ).toHaveBeenCalled();
    });

    test('Should call redirect if the hero doesnt exists', ()=> {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider3123123']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={() => <HeroScreen history={history} /> } 
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');
    })
    
});
