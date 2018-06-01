import React, {Component} from 'react';
import {NewsItemList} from "..";
import './style.css';
import {connect} from "react-redux";
import {fetchItemIds, setItemsToShow} from "../../actions";


const isArraysEqual = (arr1 = [], arr2 = []) => arr1.toString() === arr2.toString();

export class PageNewsList extends Component {

    componentDidMount() {
        this.props.fetchItemIds();
    }

    shouldComponentUpdate(nextProps) {
        const shouldUpdate = !isArraysEqual(this.props.ids, nextProps.ids);
        console.log('should update', shouldUpdate);
        return shouldUpdate
    }

    render() {
        const ids = this.props.ids;
        if (!ids) {
            return <div>Loading …</div>
        }
        return (
            <div>
                <NewsItemList ids={ids}/>
                <button onClick={this.props.fetchItemIds}>Refresh</button>
                items to show <input onChange={e =>
                this.props.setItemsToShow(e.target.value)
            }/>
            </div>
        );
    }
}

const firstN = (n, arr) => arr.slice(0, n);

const mapStateToProps = state => {
    const n = state.ui.itemsToShow;
    const ids = firstN(n, state.data.itemIds.ids);
    return {
        ids
    }
};

const mapDispatchToProps = {
    fetchItemIds,
    setItemsToShow
};

export default connect(mapStateToProps, mapDispatchToProps)(PageNewsList);