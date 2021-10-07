import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Tests on authReducer.js', () => {

    test('sould return the default state', () => {
        const state = authReducer({logged:false}, {});
        expect( state ).toEqual( {logged:false} );
    });

    test('Should auth and put de username', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Jonathan'
            }
        }
        const state = authReducer({logged:false}, action);
        expect( state ).toEqual( {
            logged:true,
            name: 'Jonathan'
        });

    });

    test('should to delete de username and logged: false', () => {
        const action = { type: types.logout };
        const state = authReducer({logged:true, name:'Gabriel'}, action);
        expect( state ).toEqual( { logged:false });
    });

});