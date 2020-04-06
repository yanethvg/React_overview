import React, { Component, Fragment } from 'react';

const Styles = {
    margin: '0.6em',
    borderRadius: '0.3em',
    border: '1px solid #d2d2d2',
    padding: '2em 0.4em',
    fontFamily: 'monospace',
    fontSize: '17px'
}

class Post extends Component {
    render() {
        const { post } = this.props
        return (
            <div style={Styles}>
                <h3>{post.id}  {post.title}</h3>
                <p >{post.body}</p>
            </div>
        )
    }

}

class Posts extends Component {
    render() {
        const { posts } = this.props
        return (
            <Fragment>
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </Fragment>
        )
    }
}

class Pagination extends Component {
    handleClick = (number) => {
        const { paginate } = this.props
            //event.preventDefault();
            paginate(number); 
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.currentPage !== this.props.currentPage){
            this.props.actualizacion()
        }
    }
    

    render() {
        const { postsPerPage, totalPosts } = this.props
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} >
                            <a onClick={() => this.handleClick(number)} href="!#">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}

class App extends Component {
    state = {
        posts: [],
        loading: false,
        currentPage: 1,
        postsPerPage: 10,
        currentPosts: []
    }

    componentDidMount() {
        this.setState({ loading: true })
        const URL = 'https://jsonplaceholder.typicode.com/posts';
        fetch(URL)
            .then(res => res.json())
            .then(posts => {this.setState({
                posts,
                loading: false
            }) 
            this.actualizacion()
        })
    }
    /*componentDidUpdate(prevProps, prevState){
        if(prevState.currentPage !== this.props.currentPage){
            alert('Ocurrio cambio')
            this.actualizacion()
        }
    }*/
   
    paginate = pageNumber => this.setState({
        currentPage: pageNumber
    });
    actualizacion = () => {
            const { posts, currentPage, postsPerPage } = this.state
          // Get current posts
          const indexOfLastPost = postsPerPage * currentPage
          const indexOfFirstPost = indexOfLastPost - postsPerPage;
          const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
          console.log(currentPosts)
          this.setState({
              currentPosts
          })
    }
    render() {
        const { posts, loading, postsPerPage, currentPosts, currentPage } = this.state
       
        return (
            <div>
                {loading && (
                    <p>Cargando</p>
                )}
                <Posts posts={currentPosts} />
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={this.paginate}
                    actualizacion ={this.actualizacion}
                    currentPage ={currentPage}
                />

            </div>
        );
    }
}

export default App;