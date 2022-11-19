import React, { Component } from 'react';
// import { json } from 'react-router-dom';
// import {movies} from './getMovies'

class Favouritte extends Component {
    constructor () {
        super();
        this.state = {
            genres: [],
            currgen: "All Genres",
            movies: [],
            currText: '',
            limit: 5,
            currPage : 1
        }
    }

    componentDidMount() {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        
        let data = JSON.parse(localStorage.getItem('movies') || "[]");
        let tempArr = []
        data.forEach((movieObj)=>{
            if(!tempArr.includes(genreids[movieObj.genre_ids[0]])){
                tempArr.push(genreids[movieObj.genre_ids[0]])
            }
        })
        tempArr.unshift('All Genres');
        this.setState({
            genres: [...tempArr],
            movies: [...data]
        })

    }

    handleGenreChange = (genre) =>{
        this.setState({
            currgen: genre
        })
    }

    sortPopularityDes = () => {
        let temArr = this.state.movies;
        temArr.sort(function(objA,objB){
            return objB.popularity-objA.popularity;
        })
        this.setState({
            movies: [...temArr]
        })
    }
    sortPopularityAes = () => {
        let temArr = this.state.movies;
        temArr.sort(function(objA,objB){
            return objA.popularity-objB.popularity;
        })
        this.setState({
            movies: [...temArr]
        })
    }
    sortRatingDes = () => {
        let temArr = this.state.movies;
        temArr.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average;
        })
        this.setState({
            movies: [...temArr]
        })
    }
    sortRatingAes = () => {
        let temArr = this.state.movies;
        temArr.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average;
        })
        this.setState({
            movies: [...temArr]
        })
    }

    handlePagesChange = (pages) => {
        this.setState({
            currPage : pages
        })
    }

    handleDelete = (id) => {
        let newArr =  [];
        newArr = this.state.movies.filter((movieObj)=>movieObj.id != id)
        this.setState({
            movies: [...newArr]
        })
        localStorage.setItem('movies',JSON.stringify(newArr))
    }

    render() {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        let filterArr = [];

        if(this.state.currText== '') {
            filterArr = this.state.movies
        }
        else{
            filterArr = this.state.movies.filter((movieObj)=>{
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())
            })
        }

        
        if(this.state.currgen !=="All Genres") {
            filterArr  = this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currgen)
        }

        let pages = Math.ceil(filterArr.length/this.state.limit);
        let pagesArr = [];
        for(let i = 1; i<=pages; i++){
            pagesArr.push(i);
        }
        let si = (this.state.currPage-1)*this.state.limit;
        let ei = si+this.state.limit;
        filterArr = filterArr.slice(si,ei)

        return (
            <div>
                <React.Fragment>
                    <div className="main">
                        <div className="row">
                            <div className="col-lg-3 col-sm-12">
                            <ul className="list-group favourites-genres">
                                {
                                    this.state.genres.map((genre)=>(
                                        this.state.currgen === genre ?
                                        <li className="list-group-item" style={{background: '#3f51b5',color: 'white',fontWeight: 'bold'}}>{genre}</li>:

                                        <li className="list-group-item" style={{background: 'white',color: '#3f51b5'}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>

                                    ))
                                }
                                
                            </ul>
                            </div>
                            <div className="col-lg-9 favourites-table col-sm-12">
                                <div className="row">
                                    <input type="text" className="input-group-text  col" placeholder='search' value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/>
                                    <input type="number" className="input-group-text col" placeholder='Rows count'value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                                </div>
                                <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i className="fas fa-caret-up" onClick={this.sortPopularityDes}> </i> Popularity <i className="fas fa-caret-down" onClick={this.sortPopularityAes}></i></th>
                                        <th scope="col"> <i className="fas fa-caret-up" onClick={this.sortRatingDes}>Rating </i><i className="fas fa-caret-down" onClick={this.sortRatingAes}></i></th>
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterArr.map((movieObj)=>(
                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width: '5rem'}}/>{movieObj.original_title}</td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" className="btn btn-danger" onClick={() =>this.handleDelete(movieObj.id)}>Delete</button>
</td>
                                                </tr>
                                            ))
                                        }
                                        
                                        
                                        
                                    </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {
                                        pagesArr.map((pages)=>(

                                            <li className="page-item"><a className="page-link" onClick={() =>this.handlePagesChange(pages)}>{pages}</a></li>
                                        ))
                                    }
                                    
                                </ul>
                                </nav>
                            </div>
                        </div>

                    </div>
                </React.Fragment>
            </div>
        )
    }
}
export default Favouritte;