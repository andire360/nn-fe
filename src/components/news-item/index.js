import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {distanceInWordsToNow} from 'date-fns';
import "./style.css";
import {connect} from 'react-redux';
import * as actions from '../../actions'


export class NewsItem extends Component {

    componentDidMount() {
        this.props.fetchItem(this.props.id);
    }

    render() {
        const item = this.props.item;
        if (item === undefined || Object.keys(item).length === 0) return <div>Loading ...</div>;
        const timeInMs = item.time * 1000;
        const age = distanceInWordsToNow(new Date(timeInMs));
        const comments = (item.descendants === 0) ? "discuss" : item.descendants + " comments";
        return (
            <div>
                <div className={"news_item"}>
                    <a href={item.url} className={"title"}>{item.title}</a>
                    <br/>
                    <Link to={`/item/${item.id}`}>{item.score}</Link>
                    {' by '}
                    <Link to={`/item/${item.id}`}>{item.by}</Link>
                    {' '}
                    <Link to={`/item/${item.id}`}>{age}</Link>
                    {'  | '}
                    <Link to={`/item/${item.id}`}>{comments}</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: (state.data.items[ownProps.id] || {}).item,
    }
};

const mapDispatchToProps = {
    fetchItem: actions.fetchItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);