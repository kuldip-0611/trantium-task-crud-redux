export const validation = {
    login:{
        success:'login successfull',
        error:'email or password is invalid'
    },
    editPost:{
        success:'data edited successfully',
        error:'error to fetch the data'
    },
    deletePost:{
        success:'data deleted successfully',
        error:'can not delete data try after some time'
    },
    addPost:{
        success:'data added successfully',
        error:'error to post the data'
    },
    logout:{
        success:'logout success'
    }


}

export const apiUrl = {
    loginUrl:'https://jsonplaceholder.typicode.com/users',
    postsUrl:'https://jsonplaceholder.typicode.com/posts'
}