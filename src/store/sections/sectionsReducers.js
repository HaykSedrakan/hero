import {
    SET_ABOUT_US,
    SET_CONTACT_US,
    SET_PRODUCTS,
    SET_PROJECTS
}
from './sectionsAction'

const initialState = {
    aboutUs: null,
    contactUs: null,
    products: null,
    projects: null
}

const sectionsReducer = (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case SET_ABOUT_US:
            return {
                ...state,
                aboutUs: payload
            }
            case SET_CONTACT_US:
                return {
                    ...state,
                    contactUs: payload
                }
                case SET_PRODUCTS:
                    return {
                        ...state,
                        products: payload
                    }
                    case SET_PROJECTS:
                        return {
                            ...state,
                            projects: payload
                        }

                        default:
                            return {
                                ...state
                            }
    }
}

export default sectionsReducer