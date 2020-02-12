import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  margin: 0 1rem;
  width: 10rem;
`;

const Tag = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-area: asideRight;
  justify-content: space-around;
  margin-right: 1rem;
  max-height: 50vh;
  position: sticky;
  top: 1em;
  & p {
    cursor: pointer;
    margin: 0 5px 0 0;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  grid-area: main;
  align-items: center;
  position: relative;
  width: 100%;
  & .buttonHolder {
    display: flex;
    justify-content: center;
  }
`;

const Grid = styled.div`
  position: relative;
  /* display: grid;
    display: -ms-grid; */
  /* grid-template-columns: repeat(auto-fit, minmax(250px, auto)); */
  /* gap: 15px 15px; */
  columns: 3 10rem;
    -moz-columns: 3 10rem;
    -webkit-columns: 3 10rem;
  column-gap: 2rem;
    -moz-column-gap: 2rem;
    -webkit-column-gap: 2rem;
  column-fill: balance;
  & div {
    margin-bottom: 1rem;
    column-span: all;
      -webkit-column-span: all;
    display: inline-block;
    width: 100%;
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defRestList: [],
      restList: [],
      tagsList: [],
      defVal: 10,
      disabled: false
    }
  }

  componentDidMount = () => {
    // console.log(`this.state.restList.length = ${this.state.restList.length}`)
    // console.log(`this.state.defVal = ${this.state.defVal}`)
    this.updateRestList();
    // console.log(`this.state.restList.length after setState = ${this.state.restList.length}`)
    // console.log(`this.state.defVal after setState = ${this.state.defVal}`)
    console.log(`this.state.defVal after setState = ${ this.state.tagsList }`)
  }

  updateRestList = () => {
    let data = require('./data/restaurants.json');
    console.log(`this.state.defVal = ${ this.state.defVal }, this.state.restList.length = ${ this.state.restList.length }`);
    let tags = data.restaurants.reduce( (arr, element) => {
      return arr.concat(element.tags)
    }, []).map( (element) => {
      return `#${element}`
    })
    this.setState( (prevState) => {
      return {
        defRestList: data.restaurants,
        restList: data.restaurants.filter( (value, index) => {
          return index < prevState.defVal;
        }),
        defVal: prevState.defVal + 10,
        disabled: prevState.defVal === 50 ? true : false,
        tagsList: tags.filter( (value, index) => {
          return tags.indexOf(value) === index
        })
      }
    })
    console.log(this.state.restList)
    console.log(this.state.defRestList)

  }

  showMoreHandler = () => {
    this.updateRestList();
    console.log(`this.state.defVal after setState = ${ this.state.defVal }`)
  }

  filterHandler = (element) => {
    let tag = element.target.innerHTML.slice( -element.target.innerHTML.length + 1 )
    this.setState({
        restList: this.state.defRestList.filter( (element) => {
          return element.tags.indexOf(tag) !== -1
        } )
    })
  }

  sortHandler = (element) => {
    let newState = this.state.restList.sort( (a, b) => a.name > b.name ? 1 : -1);
    this.setState( () => {
      return {
        restList: newState
      }
    })
  }

  render() {
    let restList = this.state.restList.map( (rests) => {
        return (
          <div>
        {/*<article style = {{ backgroundImage: `url(${rests.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '20vh' }} key = { rests.id }>*/}
            <img src = { rests.image} alt = { rests.description } />
            <p> { rests.name } </p>
            {/*<p >{ rests.description }</p>*/}
          </div>
        );
    });
    let tagsList = this.state.tagsList.map( (tags) => {
        return (
          <p id = { tags } >{ tags }</p>
        );
    });
    return (
      <>
        <Button onClick = { this.sortHandler } style = {{ gridArea: 'asideLeft', height: '2rem', position: 'sticky', top: '1rem' }}>Sort</Button>
        <Tag onClick = { this.filterHandler }>
          { tagsList }
        </Tag>
        <Main>
          <Grid>
            { restList }
          </Grid>
          <div className = 'buttonHolder'>
            <Button onClick = { this.showMoreHandler } disabled = { this.state.disabled }>Show more</Button>
          </div>
        </Main>
      </>
    );
  }
}
