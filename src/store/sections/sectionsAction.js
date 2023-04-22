export const SET_ABOUT_US = '@@sections/SET_ABOUT_US'
export const SET_PRODUCTS = '@@sections/SET_PRODUCTS'
export const SET_PROJECTS = '@@sections/SET_PROJECTS'
export const SET_CONTACT_US = '@@sections/SET_CONTACT_US'


const setAboutUs = (value) => ({
    type: SET_ABOUT_US,
    payload: value
})
const setProducts = (value) => ({
    type: SET_PRODUCTS,
    payload: value
})
const setProjects = (value) => ({
    type: SET_PROJECTS,
    payload: value
})
const setContactUs = (value) => ({
    type: SET_CONTACT_US,
    payload: value
})

export {
    setAboutUs,
    setContactUs,
    setProducts,
    setProjects
}