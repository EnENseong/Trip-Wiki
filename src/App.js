import Header from "./components/Header.js";
import RegionList from "./components/RegionList.js";
import CityList from "./components/Citylist.js";
import Citydetail from "./components/Citydetail.js";
import { request } from "./components/api.js";

export default function App ($app){
    this.state={
        startIdx: 0,
        sortBy:'',
        searchWord:'',
        region:'',
        cities:'',
    };

    const header = new Header();
    const regionList = new RegionList();
    const cityList = new CityList({$app, initialState: this.state.cities,
        handleLoadMore:async()=>{
            const newStartIdx = this.state.startIdx + 40;
            const newCities = await request(newStartIdx,
            this.state.region, 
            this.state.sortBy, 
            );
            this.setState({
                ...this.state,
                startIdx: newStartIdx,
                cities:{
                    cities:[...this.state.cities.cities, ...newCities.cities],
                    isEnd: newCities.isEnd,
                }
            })
        }
    });
    const cityDetail = new Citydetail();

    this.setState = (newState)=>{
        this.state = newState;
        cityList.setState(this.state.cities);
    } 
const init = async()=>{
    const cities = await request(

    );
    
    this.setState({
        ...this.State,
        cities: cities,
    });
};
init();
}



