import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { ListGroup, ListGroupItem, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FilteredList.css';
import { Button } from '@material-ui/core';

class FilteredList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products: this.props.products,
          sortMode: "unsorted",
          filterSeason: "unfiltered",
          filterSize: "unfiltered",
          items: {},
        };
    }
      
    /*addToCart - This method takes a product and adds a new 
    key, value pair to the items dictionary with the product name
    as the key and the product as the value. This occurs if the key doesn't
    already exist in the items dictionary. This method also calls this.setState
    to update the state of the items dictionary. */
    addToCart = product => {
        product.count = product.count + 1;
        const items = this.state.items;
        items[product.name] = product;
        this.setState({ items });
    };

    /* removeFromCart - This method takes a key and deletes the key-value
    pair that has the same key (if it exists in the items dictionary). This 
    method also calls this.setState to update the state of the items 
    dictionary. */
    removeFromCart = key => {
      const items = this.state.items;
      items[key].count = 0;
      if (items[key]) {
        delete items[key]
      }
      this.setState({ items });
    }

    
    /* deleteOneItem - This method takes a product and first 
    checks whether there is more than one item of that product. If
    there is, the method only decrements the count of the product by 1. 
    If there is less than 1 item of that product, the method removes the key-value
    pair that corresponds to the product from the items dictionary. This 
    method then calls this.setState to update the state of the items 
    dictionary.  */ 
    deleteOneItem = product => {
      const items = this.state.items;
      if (product.count > 1) {
        //quantity is 1 or more in shopping cart
        product.count = product.count -1;
      } else {
        product.count = 0;
        delete items[product.name];
      }
      this.setState({ items });
    }

    
    /* findTotalCost - This method sums up the total cost in the 
    shopping cart by looping through an array that contains all the products 
    in the shopping cart. */ 
    findTotalCost = items => {
      const productArray = Object.values(items);
      var i;
      var totalPrice = 0;

      for (i=0; i < productArray.length; i++) {
        totalPrice = totalPrice + productArray[i].count * productArray[i].price;
      }

      return Math.floor(totalPrice * 100) / 100;

    }
    
    
    /* sortByPrice - This method takes all the products and returns 
    a function that indicates how the item prices should be 
    sorted based on the sortMode. */ 
    sortByPrice = products => {
      if (this.state.sortMode === "lowtohigh") {
        return (a,b) => (a.cost > b.cost) ? 1:-1;
      } else if (this.state.sortMode === "hightolow") {
        return (a,b) => (a.cost < b.cost) ? 1:-1;
      } else {
        return ()=> 0;
      }
    }

    
    /* filterProduct - This method takes all the products and returns
    a function that indicates how the items should be filtered based on 
    their filterSeason and filterSize. */ 
    filterProduct = products => {
      if (this.state.filterSeason === "filterSpring") {
        if (this.state.filterSize === "filterSmall") {
          return (item => (item.season === "Spring" 
            && item.size === "Small"));
        }
        if (this.state.filterSize === "filterMedium") {
          return (item => (item.season === "Spring" 
            && item.size === "Medium"));
        }
        if (this.state.filterSize === "filterLarge") {
          return (item => (item.season === "Spring" 
            && item.size === "Large"));
        }
        return (item => item.season === "Spring");
      } else if (this.state.filterSeason === "filterSummer") {
        if (this.state.filterSize === "filterSmall") {
          return (item => (item.season === "Summer" 
            && item.size === "Small"));
        }
        if (this.state.filterSize === "filterMedium") {
          return (item => (item.season === "Summer" 
            && item.size === "Medium"));
        }
        if (this.state.filterSize === "filterLarge") {
          return (item => (item.season === "Summer" 
            && item.size === "Large"));
        }
        return (item => item.season === "Summer");
      } else if (this.state.filterSeason === "filterFall"){
        if (this.state.filterSize === "filterSmall") {
          return (item => (item.season === "Fall" 
            && item.size === "Small"));
        }
        if (this.state.filterSize === "filterMedium") {
          return (item => (item.season === "Fall"
            && item.size === "Medium"));
        }
        if (this.state.filterSize === "filterLarge") {
          return (item => (item.season === "Fall"
            && item.size === "Large"));
        }
        return (item => item.season === "Fall");
      } else if (this.state.filterSeason === "filterWinter") {
        if (this.state.filterSize === "filterSmall") {
          return (item => (item.season === "Winter" 
            && item.size === "Small"));
        }
        if (this.state.filterSize === "filterMedium") {
          return (item => (item.season === "Winter"
            && item.size === "Medium"));
        }
        if (this.state.filterSize === "filterLarge") {
          return (item => (item.season === "Winter"
            && item.size === "Large"));
        }
        return (item => item.season === "Winter");
      } else if (this.state.filterSize === "filterSmall") {
        if (this.state.filterSeason === "filterSpring") {
          return (item => (item.size === "Small" && item.season === "Spring"));
        }
        if (this.state.filterSeason === "filterSummer") {
          return (item => (item.size === "Small" && item.season === "Summer"));
        }
        if (this.state.filterSeason === "filterFall") {
          return (item => (item.size === "Small" && item.season === "Fall"));
        }
        if (this.state.filterSeason === "filterWinter") {
          return (item => (item.size === "Small" && item.season === "Winter"));
        }
        return (item => item.size === "Small");
      } else if (this.state.filterSize === "filterMedium") {
        if (this.state.filterSeason === "filterSpring") {
          return (item => (item.size === "Medium" && item.season === "Spring"));
        }
        if (this.state.filterSeason === "filterSummer") {
          return (item => (item.size === "Medium" && item.season === "Summer"));
        }
        if (this.state.filterSeason === "filterFall") {
          return (item => (item.size === "Medium" && item.season === "Fall"));
        }
        if (this.state.filterSeason === "filterWinter") {
          return (item => (item.size === "Medium" && item.season === "Winter"));
        }
        return (item => item.size === "Medium");
      } else if (this.state.filterSize === "filterLarge") {
        if (this.state.filterSeason === "filterSpring") {
          return (item => (item.size === "Large" && item.season === "Spring"));
        }
        if (this.state.filterSeason === "filterSummer") {
          return (item => (item.size === "Large" && item.season === "Summer"));
        }
        if (this.state.filterSeason === "filterFall") {
          return (item => (item.size === "Large" && item.season === "Fall"));
        }
        if (this.state.filterSeason === "filterWinter") {
          return (item => (item.size === "Large" && item.season === "Winter"));
        }
        return (item => item.size === "Large");
      } else {
        return () => this.props.products;
      }
    }

    isActiveFilter = name => {
      return (name === this.state.filterSeason || name === this.state.filterSize);
    }

    render() {
        return (
            <div>
            <div className="list">
            <Card style={{ width: '18rem' }}>
            <Card.Header>Filter by Season:</Card.Header>
            <ListGroup variant="flush">
              {/*These ListGroupItems are filter buttons (filter on either season or size)
              that change the state's filterSize/filterSeason depending on what button the user clicks*/}
            <ListGroupItem action onClick={()=> 
              this.setState({filterSeason: "filterSpring"})} active={this.isActiveFilter("filterSpring")}>Spring Season</ListGroupItem>
            <ListGroupItem action onClick={()=> 
              this.setState({filterSeason: "filterSummer"})} active={this.isActiveFilter("filterSummer")}>Summer Season</ListGroupItem>
            <ListGroupItem action onClick={()=> 
              this.setState({filterSeason: "filterFall"})} active={this.isActiveFilter("filterFall")}>Fall Season</ListGroupItem>
            <ListGroupItem action onClick={()=> 
              this.setState({filterSeason: "filterWinter"})} active={this.isActiveFilter("filterWinter")}>Winter Season</ListGroupItem>
            <ListGroupItem action onClick={()=> 
              this.setState({filterSeason: "unfiltered", filterSize: "unfiltered", sortMode:"unsorted"})}>All</ListGroupItem>
            </ListGroup>
            </Card>
            </div>
            <div className="list-2">
            <Card style={{ width: '18rem' }}>
            <Card.Header>Filter by Size:</Card.Header>
            <ListGroup variant="flush">
              {/*These ListGroupItems are filter buttons (filter on either season or size)
              that change the state's filterSize/filterSeason depending on what button the user clicks*/}
            <ListGroupItem action onClick={()=> 
              this.setState({filterSize: "filterSmall"})} active={this.isActiveFilter("filterSmall")}>Small Size</ListGroupItem>
            <ListGroupItem action onClick={()=> 
              this.setState({filterSize: "filterMedium"})} active={this.isActiveFilter("filterMedium")}>Medium Size </ListGroupItem>
            <ListGroupItem action onClick={()=> 
              this.setState({filterSize: "filterLarge"})} active={this.isActiveFilter("filterLarge")}>Large Size</ListGroupItem>
            <ListGroupItem action onClick={()=> 
              this.setState({filterSeason: "unfiltered", filterSize: "unfiltered", sortMode:"unsorted"})}>All</ListGroupItem>
            </ListGroup>
            </Card>
            </div>
            <div className="dropdown">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Sort by
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    {/*This is a sort button that changes the state's sortMode to lowtohigh 
                    which essentially sorts the products by prices from low to high*/}
                    <div onClick={()=> 
                      this.setState({sortMode: "lowtohigh"})}>Price: Low to High</div>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {/*This is a sort button that changes the state's sortMode to hightolow 
                    which essentially sorts the products by prices from high to low*/}
                    <div onClick={()=> 
                      this.setState({sortMode: "hightolow"})}>Price: High to Low</div>
                  </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
            <div className="products">
              {/*Apply all the filtering and sorting before calling map to 
              display all the products on the website*/}
              {this.state.products.filter(this.filterProduct(this.state.products)).sort(this.sortByPrice(this.state.products)).map((product) => (
            <div className="item">
                <Card border="warning" style={{ width: '18rem' }}>
                <div className="item-img">
                <Card.Img variant="top" src={product.image} width="286" height="180" />
                </div>
                <Card.Body>
                  <Card.Title>{product.name} </Card.Title>
                  <Card.Text>
                  {product.cost}
                  </Card.Text>
                  <Card.Text>
                  Season: {product.season}
                  </Card.Text>
                  <Card.Text>
                  Size: {product.size}
                  </Card.Text>
                  <Button color="primary" variant="contained" type="submit" 
                    onClick={()=>this.addToCart(product)}>Add to Cart</Button>
                </Card.Body>
                </Card>
            </div>
            ))}
          </div>
          {/*This is the aggregator section of the website (the shopping cart!) */}
          <h1>Shopping Cart </h1>
          {/*The aggregator section aggergates the total cost of the items in
          the shopping cart */}
          <h2>Total: ${this.findTotalCost(this.state.items)}</h2>
          <div className="shopping-cart">
          {Object.values(this.state.items).map((item) => (
            <div className="item">
            <Card border="warning" style={{ width: '18rem' }}>
            <div className="item-img">
            <Card.Img variant="top" src={item.image} width="286" height="180" />
            </div>
            <Card.Body>
              <Card.Title>{item.name} </Card.Title>
              <Card.Text>
              {item.cost}
              </Card.Text>
              <Card.Text>
              Season: {item.season}
              </Card.Text>
              <Card.Text>
              Size: {item.size}
              </Card.Text>
                <ButtonGroup aria-label="Basic example">
                  {/*These buttons allow users to remove a product (lower the quantity by 1), 
                  see the quantity of each product, and add a product (increase the quantity by 1)
                  to the shopping cart*/}
                  <Button variant="secondary" onClick={()=>this.deleteOneItem(item)}>-</Button>
                  <Button variant="secondary">{item.count}</Button>
                  <Button variant="secondary" onClick={()=>this.addToCart(item)}>+</Button>
                </ButtonGroup>
                <div className="buttons">
                {/*This button removes the product altogether from the shopping cart
                regardless of the quantity of the product in the cart */} 
                <Button color="primary" variant="contained" type="submit"
                  onClick={()=>this.removeFromCart(item.name)}>Remove</Button>
                </div>
            </Card.Body>
            </Card>
            </div>
            ))}
          </div>
          </div>
        )
    }
  
}

export default FilteredList;