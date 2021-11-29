import * as Types from './type'

const initialState = {
    octokit: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case Types.AUTH_GITHUB :
            // console.log(action.payload);
            return {...state,  octokit: action.payload.octokit}
        default: return state
    }
}

export {reducer}