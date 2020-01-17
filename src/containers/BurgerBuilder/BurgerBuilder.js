import React, { Component } from 'react';
import Aux from '../../hoc/auxt.js';
import Burger from '../../components/Burger/Burger';
import IngredientContraols from '../../components/Burger/IngredientControls/IngredientControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSammary/OrderSammary';
import axios from '../../axios.orders.js';
import Spinner from '../../components/UI/Spinners/Spinners';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
       /*  ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        }, */
        ingredients:null,
        totalPrice:4,
        purchaseble:false,
        purchasing:false,
        loading:false,
    }

    componentDidMount(){
        axios.get('https://my-burger-project-d8bac.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data})
        })
        .catch(error=>{
            console.log(error)
        });
    }

    updatePurchasebleState = (ingredients)=>{
        const sum = Object.keys(ingredients)
               .map(igKey=>{
                   return ingredients[igKey];
               })
               .reduce((sum,el)=>{
                   return sum +el;
               },0);
        this.setState({
            purchaseble:sum > 0
        });

    }
    addIngredientHandler =(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] =updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice:newPrice,ingredients:updatedIngredients
        })
        this.updatePurchasebleState(updatedIngredients)
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] =updatedCount;
        const priceDedection = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDedection;
        this.setState({
            totalPrice:newPrice,ingredients:updatedIngredients
        })
        this.updatePurchasebleState(updatedIngredients)

    }

    purchaseHandel = () =>{
        this.setState({purchasing:true})
    }

    purchasingCancelHandel = () =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandel = () =>{
        const postData = {
            ingredients:this.state.ingredients,
            totalPrice:this.state.totalPrice,
            userData:{
                name:'Sunil',
                email:'sunil@gmail.com',
                phone:'790342344',
            },
            address:{
                street:'Abhishek Circle Mysore',
                city:'Mysore',
                zipcode:'570016',
            },
            deliveryMetod:'fastest',
        }
         this.setState({loading:true});
        axios.post('/order.json',postData)
        .then(response=>{
            this.setState({loading:false, purchasing:false})
        })
        .catch(error=>{
            this.setState({loading:false, purchasing:false})
        });
    }
   
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
           disabledInfo[key] = disabledInfo[key]<=0
           console.log(disabledInfo[key]);
        }
        let orderSummary = null;
        let burger = <Spinner />;
        if(this.state.ingredients){
            burger = (
                        <Aux>
                            <Burger ingredients={this.state.ingredients} />
                            <IngredientContraols 
                                ingredientAdded={this.addIngredientHandler} 
                                ingredientRemoved={this.removeIngredientHandler}
                                disable={disabledInfo}
                                price={this.state.totalPrice}
                                purchaseble={this.state.purchaseble}
                                ordered={this.purchaseHandel}
                            />
                        </Aux>
                    );
                    orderSummary= <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchasingCancelHandel}
                        purchaseContinue={this.purchaseContinueHandel}
                        />;
            }
        if(this.state.loading){
            orderSummary= <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>    
        );
    }
}

export default BurgerBuilder;